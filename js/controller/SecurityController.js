/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('SecurityController', function ($scope, $http, SecurityService, AuthSession, $mdDialog, userLogin,$rootScope) {

    $scope.profile = AuthSession.isLogged();
    //console.log("AuthSession: " + $scope.profile);
    $scope.image = "R0lGODlhAQABAAAAACw=";

    $scope.moodleScope = function () {

        SecurityService.mudul(Security.people.id).service().then(function (data) {

            $scope.moodleData = data;

        });
    };

    $scope.profileData = $scope.profile ? AuthSession.getUser() : null;
    Security.people = $scope.profile ? AuthSession.getUser() : null;
    $scope.moodleData = $scope.profile ? $scope.moodleScope() : null;
//    console.log($scope.profileData);

    $scope.login = function () {

        if (!angular.isString($scope.user) || !angular.isString($scope.password)) {
            //showMessage("Error al escribir usuario y/o contraseña");
            //console.log("usuario :" + $scope.user); 
            //console.log("password :" + $scope.password);
            alert("Error al escribir la contraseña");
        }
        else {
            //by Eddie Master
            userLogin.servicio($scope.user, $scope.password).ejecutar(function (success) {
                
//                switch (success.correoVerificado) {
//                    case true:
//                        console.log("es verdadero");
                        Security.people = success;
                        $scope.profileData = success;
                        Security.session = AuthSession.isLogged();
                        $scope.profile = AuthSession.isLogged();
//                        break;
//                    case false:
//                        console.log("Correo no verificado");
//                        $rootScope.global = success;
//                        $scope.showMailVer();
//                        AuthSession.clearStorage();
//                        break;
//                }

            }, function (error) {
                //console.log(error);
                //console.log(error.data);
                switch (error.status) {
                    case 403:
                    {
                        switch (error.data) {
                            case 'Authenticate information invalid.':
                                $scope.showUserLogin();
                                break;
                            default:
                                alert("Acceso Denegado");
                                break;
                        }
                    }
                }
            });



            /*  var result = SecurityService.login($scope.user, $scope.password);
             
             result.service().then(function (data) {
             $scope.profileData = data;
             Security.people = data;
             $scope.profile = AuthSession.isLogged();
             
             //console.log("AuthSession: " + AuthSession.isLogged());
             
             $scope.moodleScope();
             });*/

        }
    };



    $scope.logout = function () {
        AuthSession.clearStorage();
        $scope.profileData = null;
        $scope.user = null;
        $scope.password = null;
        $scope.profile = AuthSession.isLogged();
        Security.reset();
    };

    $scope.loadImageProfile = function () {
        SecurityService.profileImage(Security.people.id).service().then(function (data) {
            $scope.image = data;
        });
    };

    $scope.closePopupChangePassword = function () {
        $('#changePassword').popup('close');
        $('#changePassword input[type=password]').each(function (index) {
            $(this.parentElement).css('border', '');
            this.value = '';
        });
        $('#changePassword form .error-info').html('');
    }

    $scope.changePassword = function () {
        var inputs = $('#changePassword input[type=password]');
        var label = $('#changePassword .error-info');

        if (hex_sha1($(inputs[0]).val()) == Security.password) {

            if ($(inputs[1]).val() == $(inputs[2]).val() &&
                    $(inputs[1]).val() != '' && matchPassword($(inputs[1]).val())) {
                $('#changePassword').popup('close');
                // $.mobile.showPageLoadingMsg();
                SecurityService.changePassword(
                        Security.people.identification,
                        hex_sha1($(inputs[1]).val()),
                        hex_sha1($(inputs[0]).val())).
                        then(function (data) {
                            $.mobile.hidePageLoadingMsg();
                            showMessage("Contraseña cambiada con exito!");
                            Security.password = $(inputs[1]).val();

                        });
            }
        }
    };

    $scope.validate = function ($event, name) {
        var label = $('#changePassword .error-info');
        var input = $('#changePassword input[name=' + name + ']');
        if (name == "oldpassword") {
            if (input.val() != Security.password) {
                input.parent().css('border', 'solid 2px red');
                label.html('La contraseña anterior es invalida');
                return;
            }
            input.parent().css('border', '');
            label.html('');
        } else {
            if (!matchPassword(input.val())) {
                input.parent().css('border', 'solid 2px red');
                label.html('La contraseña debe cumplir<br> \n\
             con las normas de seguridad:' +
                        '<ul style="text-align:justify;"><li>Al menos una letra may&uacute;sculas</li>\n\
             <li>Al menos un s&iacute;mbolo ( @#$&% ) </li>\n\
             <li>Entre 6 y 25 car&aacute;cteres</li><ul>');
                return;
            }
            input.parent().css('border', '');
            label.html('');
            $scope.validateForm();
        }
    }

    $scope.validateForm = function () {
        var inputs = $('#changePassword input[type=password]');
        var label = $('#changePassword .error-info');

        if ($(inputs[0]).val() == Security.password
                && $(inputs[1]).val() == $(inputs[2]).val()) {

            $($(inputs[1]).context.parentElement).css('border', '');
            $($(inputs[2]).context.parentElement).css('border', '');

            $('#changePassword a[name=change]').toggleClass("ui-disabled");
            return true;
        } else {
            $($(inputs[1]).context.parentElement).css('border', 'solid 2px red');
            $($(inputs[2]).context.parentElement).css('border', 'solid 2px red');
            label.html('La contraseña nueva no coincide');
        }
    }

    $scope.activeDesactiveLink = function (active, profiles) {
        if (active) {
            $('.security').each(function (index) {
                var roles = $(this).attr('data-security').split(',');
                for (var i in profiles) {
                    if (jQuery.inArray((profiles[i]), roles) != -1) {
                        $(this).attr('href', $(this).attr('id'));
                        $(this).css('opacity', 1);
                    }
                }
            });
        } else
            $('.security').each(function (index) {
                $(this).attr('href', '#');
                $(this).css('opacity', 0.3);
            });
    };

    $scope.recoveryPassword = function () {
        var user = $('#login-form input[name=user]');
        if (user.val() != '') {
            // $.mobile.showPageLoadingMsg();
            SecurityService.recoveryPassword(user.val()).
                    then(function (data) {
                        $.mobile.hidePageLoadingMsg();
                        showMessage("Para restablecer su contraseña ingrese a su correo: " +
                                data.data);
                    });
        }
    };

    //PopUp para recuperar contraseña
    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: 'RecoverPasswordController',
            templateUrl: './templates/popup/recuperar-contrasena.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    $scope.showUserLogin = function (ev) {
        $mdDialog.show({
            controller: 'userLoginController',
            templateUrl: './templates/popup/userlogin.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    $scope.showMailVer = function (ev) {
        $mdDialog.show({
            controller: 'verificarCorreo',
            templateUrl: 'templates/cuenta_no_verificada.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true //cambiar a false al poner el template 
        });
    };
//la locura de luisen
    $(document).ready(function () {

        //CAMBIO EL MARGEN DE LOS ELEMENTOS PARA DAR UN EFECTO RESPONSIVE



        !function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");

        var changeMargins = function () {

            //TAMAÑO DE LA PANTALLA
            var windowSize = $(window).width();
            //MARGEN IZQUIERDO DEL DIV DEL LOGO
            var logoMarginLeft = parseInt(($(logo).css('margin-left')).replace("px", ""));
            //ESPACIO TOTAL OCUPADO POR EL LOGO
            var espacioTotalLogo = $(logo).width() + logoMarginLeft;
            //MARGEN IZQUIERDO DE LA BARRA 
            var marginLeftNav = windowSize - $(myNavbar).width();

            // SI EL NAVBAR SE ACERCA LE REDUZCO EL MARGINLEFT AL LOGO
            while (marginLeftNav - espacioTotalLogo < 50) {

                if (logoMarginLeft > 5) {
                    logoMarginLeft--;
                } else {
                    break;
                }

                $(logo).css("margin-left", logoMarginLeft);
                espacioTotalLogo = $(logo).width() + logoMarginLeft;
            }

            // SI EL NAVBAR SE ALEJA LE AUMENTO EL MARGINLEFT AL LOGO
            while (marginLeftNav - espacioTotalLogo > 50) {

                logoMarginLeft++;

                $(logo).css("margin-left", logoMarginLeft);
                espacioTotalLogo = $(logo).width() + logoMarginLeft;
            }

            // MARGIN RIGHT DE LAS OPCIONES SUPERIORES

            var opcSupMarginRight = parseInt(($(opcSup).css('margin-right')).replace("px", ""));
            var sumaTopDiv = (opcSupMarginRight + $(opcSup).width() + $(login).width());

            while ((windowSize - 150 <= sumaTopDiv)
                    || espacioTotalLogo >= windowSize - sumaTopDiv
                    ) {
                opcSupMarginRight--;
                $(opcSup).css("margin-right", opcSupMarginRight);
                sumaTopDiv = (opcSupMarginRight + $(opcSup).width() + $(login).width());
            }

            while (($(login).width() + $(opcSup).width() + opcSupMarginRight) < $(myNavbar).width()) {
                opcSupMarginRight++;
                $(opcSup).css("margin-right", opcSupMarginRight);
            }
        };

        changeMargins();

        $(window).resize(function () {

            var windowSize = $(window).width();

            if (windowSize < 1050) {
                $("#logo").css("display", "none");
                $("#myNavbar").css("float", "none");

            } else {
                $("#logo").css("display", "inline-block");
                $("#myNavbar").css("float", "right");
            }
            changeMargins();
        });
    });


});




