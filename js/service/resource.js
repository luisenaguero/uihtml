/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Master
 */


app.factory("userLogin", function ($resource) {
    return {
        servicio: function (user, pass) {
            return $resource(url, {}, {
                ejecutar: {
                    method: 'GET',
                    url: dir.LOG.IN,
                    headers: {'X-Authenticate': user + ':' + pass}
                }

            });
        }
    };
});

app.factory("personaService", function ($resource) {
    var user = $resource('https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/people', {}, {
        crearPrueba: {
            method: 'POST',
            url: dir.REGISTRO_PERSONA,
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'text/html'},
            transformResponse: function (data, headersGetter, status) {
                return {content: data};
            }
        },
        modificarPerfil: {
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/people/updatePeople'
        } 
    });
    return user;
});

//app.factory("perfilService", function ($resource) {
//    return {
//        editarPerfil: function (codigo) {
//            return $resource(dir.PERSONA, {}, {
//                ejecutar: {
//                    method: 'POST',
//                    url: dir.CUENTA.VERIFICAR,
//                    isArray:false,
//                    headers: {'codigo':codigo}
//                }
//            });
//        }
//    };
//});

app.factory("cuentaService", function ($resource) {
    return {
        verificarEmail: function (codigo) {
            return $resource(dir.PERSONA, {}, {
                ejecutar: {
                    method: 'GET',
                    url: dir.CUENTA.VERIFICAR,
                    isArray: false,
                    headers: {'codigo': codigo, 'Accept': 'text/html'},
                    transformResponse: function (data, headersGetter, status) {
                        return {content: data};
                    }
                }
            });

        },
        reenviarCodigo: function (correo, accion) {
            return $resource(dir.PERSONA, {}, {
                ejecutar: {
                    method: 'GET',
                    url: dir.CUENTA.REENVIARCODIGO,
                    headers: {'correo': correo, 'accion': accion}
                }
            });
        }
    };
});
