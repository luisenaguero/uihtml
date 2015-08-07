/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Mejia
 */


app.service('sessionState', function($http,$cookies){
    
     var supportStorage = window.localStorage || (window.globalStorage ? globalStorage[location.hostname] : null)
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

            function getUser()
            {
                console.log(String(getToken(AUTH_HEADERS.USER)).replace(/\s/g, ''))
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
                // var tokenizer = getToken(AUTH_HEADERS.TOKEN);
                //  return !(typeof tokenizer === 'undefined' || tokenizer === null)
                return !!$cookies.TICKET;
            }

            return {
                get: getToken,
                update: storeToken,
                create: storeToken,
                remove: clearToken,
                isLogged: isLogged,
                getUser: getUser,
                getUserToken: getUserToken
            };
    
    
});