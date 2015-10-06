//  urbe  2014
//  grondon
// andres.mendez 06/11/2014
//  unidad servicios web

var security = angular.module('security.authorization', ['ui.router', 'ngCookies'])
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notLocalAuthenticated: 'auth-not-local-authenticated',
            notAuthorized: 'auth-not-authorized',
            debStudent: 'auth-deb-student',
            serviceUnAvailable: 'service-unavailable',
            serviceError: 'service-error',
            generalError: 'generalerror',
            startResquest: 'start-request',
            endRequest: 'end-request'
        })
        .constant('AUTH_HEADERS', {
            TOKEN: 'X-Authorization',
            USER: 'TOKENUSER'
        })
        .factory('AuthSession', function ($cookies, AUTH_HEADERS) {
            var supportStorage = window.localStorage || (window.globalStorage ? globalStorage[location.hostname] : null);

            //var token = AUTH_HEADERS.TOKEN;

            function storeToken(tokenKey, tokenValue) {
                if (supportStorage) {
                    localStorage.setItem(tokenKey, tokenValue);
                    return true;
                }
                else {
                    return false;
                }
            }

            function getToken(tokenKey)
            {
                if (supportStorage) {
                    return localStorage.getItem(tokenKey);
                }
            }

            function clearStorage() {
                localStorage.clear();
            }

            function getUser()
            {
                //    console.log(JSON.parse(atob(String(getToken(AUTH_HEADERS.USER)).replace(/\s/g, ''))));
                return JSON.parse(atob(String(getToken(AUTH_HEADERS.USER)).replace(/\s/g, '')));
            }

            function getUserToken()
            {
                return getToken(AUTH_HEADERS.TOKEN);
            }

            function clearToken()
            {
                if (supportStorage) {
                    return localStorage.clear();
                }
            }

            function isLogged()
            {
                var tokenizer = getToken(AUTH_HEADERS.TOKEN);
                return !(typeof tokenizer === 'undefined' || tokenizer === null);
//                return !!$cookies.TICKET;
            }

            function getPeopleInfo() {
                //console.log("la info  es :");
            }

            return {
                get: getToken,
                update: storeToken,
                create: storeToken,
                remove: clearToken,
                isLogged: isLogged,
                getUser: getUser,
                clearStorage: clearStorage,
                getUserToken: getUserToken
            };

        })
        .factory('AuthInterceptor', function ($rootScope, $q, AuthSession, AUTH_EVENTS, AUTH_HEADERS) {
            return {
                request: function (config) {
                    $rootScope.$broadcast(AUTH_EVENTS.startResquest);
                    // delete config.headers['X-Requested-With'];
                    //console.log("reques");
                    if (AuthSession.isLogged() === true)
                    {
                        config.headers[AUTH_HEADERS.TOKEN] = AuthSession.get(AUTH_HEADERS.TOKEN);
                        config.headers[AUTH_HEADERS.USER] = AuthSession.get(AUTH_HEADERS.USER);
                    }
                    return config;
                },
                response: function (response) {
                    $rootScope.$broadcast(AUTH_EVENTS.endRequest);
                    // console.log(response.headers(AUTH_HEADERS.TOKEN));
                    if (response.headers(AUTH_HEADERS.TOKEN) !== null && response.headers(AUTH_HEADERS.USER) !== null) {
                        AuthSession.update(AUTH_HEADERS.USER, response.headers(AUTH_HEADERS.USER));
                        AuthSession.update(AUTH_HEADERS.TOKEN, response.headers(AUTH_HEADERS.TOKEN));
                    }
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    $rootScope.$broadcast(AUTH_EVENTS.endRequest);
                    // console.log("error");
                    // console.log(response)
                    switch (response.status) {
                        case 401, 404:
                            $rootScope.$broadcast(AUTH_EVENTS.serviceUnAvailable);
                            break;
                        case 403:
                            switch (response.data) {
                                case 'Session expired!.':
                                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                                    break;
                                case 'Session id not found!.':
                                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                                    break;
                                case 'Security-risk-info':
                                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                                    break;
                                case 'Authenticate information invalid.':
                                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                    break;
                                default :
                                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                                    break;
                            }
                            break;
                        case 500:
                            $rootScope.$broadcast(AUTH_EVENTS.serviceError);
                            break;
                        default :
                            $rootScope.$broadcast(AUTH_EVENTS.generalError);
                            break;
                    }
                    /*
                     $rootScope.$broadcast({
                     401: AUTH_EVENTS.notAuthenticated,
                     403: AUTH_EVENTS.notAuthorized,
                     404: AUTH_EVENTS.sessionTimeout,
                     }[response.status], resplsonse); */
                    return $q.reject(response);
                }
            };
        })
        .factory('AuthObserver', function ($state, $rootScope, AuthSession, AUTH_EVENTS) {
            var isLogged = !AuthSession.isLogged();
            var evalUserIsLogged = function ()
            {

                //  console.log("isLogged "+isLogged);
                //  console.log("isLogged "+AuthSession.isLogged());

                if (isLogged === true && AuthSession.isLogged() === false)
                {
                    // console.log("Logged false");
                    isLogged = false;
                    $state.go(AUTH_EVENTS.notLocalAuthenticated);

                }
                else if (isLogged === false && AuthSession.isLogged() === true)
                {
                    //console.log("Logged true");
                    isLogged = true;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess)
                } else if (AuthSession.isLogged() === true)
                {
                    if (AuthSession.getUserToken() === null
                            || !AuthSession.getUserToken()
                            || (AuthSession.getUserToken() + '').trim().length === 0)
                    {
                        $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                    }
                }
            }
            var isViewStatus = function ()
            {
                return isLogged;
            }
            return{
                isLogged: isViewStatus,
                evalUserIsLogged: evalUserIsLogged
            };

        })
        .config(function ($httpProvider, $stateProvider, AUTH_EVENTS) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.interceptors.push('AuthInterceptor');



            $stateProvider
                    .state(AUTH_EVENTS.notLocalAuthenticated, {
                        url: "/not-authenticated",
                        templateUrl: "templates/not-authenticated.html"

                    })
                    .state(AUTH_EVENTS.sessionTimeout, {
                        url: "/session-timeout",
                        templateUrl: "templates/session-timeout.html"
                    });


            /*$stateProvider
             .state(AUTH_EVENTS.notAuthenticated, {
             url: "/not-authenticated",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/not-authenticated.html"
             })
             .state(AUTH_EVENTS.notAuthorized, {
             url: "/not-authorized",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/not-authorized.html"
             })
             .state(AUTH_EVENTS.debStudent, {
             url: "/student-deb",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/deb.html"
             })
             .state(AUTH_EVENTS.sessionTimeout, {
             url: "/session-timeout",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/session-timeout.html"
             })
             .state(AUTH_EVENTS.loginFailed, {
             url: "/login-failed",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/login-failed.html"
             })
             .state(AUTH_EVENTS.serviceError, {
             url: "/service-error",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/service-error.html"
             })
             .state(AUTH_EVENTS.generalError, {
             url: "/general-error",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/general-error.html"
             })
             .state(AUTH_EVENTS.serviceUnAvailable, {
             url: "/service-unavailable",
             templateUrl: "https://www.urbe.edu/portal-urbe/templates/service-unavailable.html"
             })
             ; */
            //  loginFailed serviceerror generalerror serviceunavailable
        })
        .run(function ($rootScope, $state, $interval, AUTH_EVENTS, AuthObserver) {


            $rootScope.$on(AUTH_EVENTS.notLocalAuthenticated, function () {
                $state.go(AUTH_EVENTS.notLocalAuthenticated);
            });

            $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
                $state.go(AUTH_EVENTS.sessionTimeout);
            });

            $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {

                if ((window.location.href.search("not-authenticated") !== -1)
                        || (window.location.href.search("#")) === -1) {

                    $state.go(AUTH_EVENTS.loginSuccess);
                }
            });

            $rootScope.$on(AUTH_EVENTS.startResquest, function () {
                //   console.log("Start request");
            });


            $rootScope.$on(AUTH_EVENTS.endRequest, function () {
                //  console.log("End request");
            });

            /* $rootScope.$on(AUTH_EVENTS.notLocalAuthenticated, function () {
             $state.go(AUTH_EVENTS.notLocalAuthenticated);
             });
             $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
             $state.go(AUTH_EVENTS.notAuthorized);
             });
             $rootScope.$on(AUTH_EVENTS.debStudent, function () {
             $state.go(AUTH_EVENTS.debStudent);
             });
             $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
             $state.go(AUTH_EVENTS.loginSuccess);
             });
             $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
             $state.go(AUTH_EVENTS.sessionTimeout);
             });
             $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
             $state.go(AUTH_EVENTS.loginFailed);
             });
             $rootScope.$on(AUTH_EVENTS.serviceError, function () {
             $state.go(AUTH_EVENTS.serviceError);
             });
             $rootScope.$on(AUTH_EVENTS.generalError, function () {
             $state.go(AUTH_EVENTS.generalError);
             });
             $rootScope.$on(AUTH_EVENTS.serviceUnAvailable, function () {
             $state.go(AUTH_EVENTS.serviceUnAvailable);
             });*/

            $interval(function () {
                AuthObserver.evalUserIsLogged();
            }, 1000);

        });

