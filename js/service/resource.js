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

app.factory('Payments', function () {
    var obj = {};
    return {
        setObject: function (new_Object) {
            obj = new_Object;
        },
        getObject: function () {
            return obj;
        }
    }
});

app.factory("personaService", function ($resource, AuthSession) {
    var user = $resource('https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/', {}, {
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
        },
        cambiarFoto: {
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/people/storeImage',
        },
        solicitudPais: {
            method: 'GET',
            url: dir.DATOS_PERSONALES,
            headers: {'entity': 'pais'},
            isArray: true
        },
        registroAcademico: function () {
            return $resource(dir.ESTUDIO.PERSONA_REGISTRO_ACADEMICO, {}, {
                ejecutar: {
                    method: 'GET',
                    url: dir.ESTUDIO.PERSONA_REGISTRO_ACADEMICO + AuthSession.getUser()["id"],
                    isArray: true
                }
            });
        },
        estudioSeleccionado: function (idEstudio) {
            return $resource(dir.ESTUDIO.PERSONA_ESTUDIO_ELEGIDO, {}, {
                ejecutar: {
                    method: 'GET',
                    url: dir.ESTUDIO.PERSONA_ESTUDIO_ELEGIDO + idEstudio,
                    isArray: true
                }
            });
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

app.factory("estudioService", function ($resource) {
    return {
        estudioInfo: function (estudioID) {
            return $resource(dir.ESTUDIO.ESTUDIO_ALL, {studyID:estudioID}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            });
        },
        estudioSoloInfo: function (estudioID) {
            return $resource(dir.ESTUDIO.ESTUDIO_INFO, {studyID:estudioID}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            });
        }
    };
});

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
