app.controller('ctrlEstudio', function ($scope, $http, AuthSession, Payments, $location, estudioService, personaService, $localStorage) {
    $scope.isLogged = AuthSession.isLogged();
    //console.log(JSON.parse(atob(String($localStorage.StudyToken).replace(/\n/g, ''))));

    //console.log($scope.isLogged);
    $scope.Inscripciones = {};
    $scope.idEstudio = $location.search()['id'];
    $scope.puedeInscribir = true;
    $scope.cargandoInscripciones = true;
    $scope.cargandoEstudio = false;
    $scope.cargandoInfo = false;

    $scope.getNumber = function (num) {
        $scope.numbers = new Array();
        for (i = 0; i < num; i++) {
            $scope.numbers.push(i);
        }
        return $scope.numbers;
    };

    if ($scope.isLogged === true) {
        $http({
            method: 'GET',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/inscripciones/persona/' + AuthSession.getUser()["id"],
            headers: {'codigo': $scope.codigo, 'X-Authorization': AuthSession.getUserToken()},
        }).success(function (data) {
            $scope.cargandoInscripciones = false;
            $scope.cargandoEstudio = true;
            //console.log(data);
            $scope.Inscripciones = data;
            for (var i = 0; i < $scope.Inscripciones.length; i++) {
//console.log($scope.idEstudio + " - " + $scope.Inscripciones[i].idEstudio);
                if (($scope.Inscripciones[i].idEstudio == $scope.idEstudio) && ($scope.Inscripciones[i].estadoEstudio == 1)) {
                    $scope.puedeInscribir = false;
                }
            }

            if ($scope.puedeInscribir === true) {
                estudioService.estudioInfo($scope.idEstudio).get(function (success) {
                    $scope.estudioInfo = success;
                    console.log($scope.estudioInfo);
                    $scope.cuotas = $scope.getNumber($scope.estudioInfo.tipo_estudio.estudio.valor_uc.planes_financiamiento[0].numeroCuotas);
                    $scope.cargandoInfo = true;
                });


                $http({
                    method: 'GET',
                    url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/study-all/' + $scope.idEstudio,
                    headers: {'codigo': $scope.codigo, 'X-Authorization': AuthSession.getUserToken()},
                }).success(function (data) {
//console.log(data);
                    var tipo_estudio = data.tipo_estudio;
                    //console.log(tipo_estudio);
                    var Pensum = tipo_estudio.estudio.pensum;
                    var Niveles = tipo_estudio.estudio.pensum.niveles;
                    for (var i = 1; i < Niveles.length; i++) {
                        var Nivel = Niveles[i][0];
                        //console.log("Periodo: " + Nivel.nivel);
                        var PlanesEstudios = Niveles[i][0].planesEstudiosCollection;
                        for (var j = 0; j < PlanesEstudios.length; j++) {
                            var PlanEstudio = PlanesEstudios[j];
                            var Materias = PlanesEstudios[j].materiasCollection;
                            for (var k = 0; k < Materias.length; k++) {
                                Niveles[i][0].planesEstudiosCollection[j].materiasCollection[k].idSeccionSeleccionado = Niveles[i][0].planesEstudiosCollection[j].materiasCollection[k].seccionesCollection[0];
                                var Materia = Materias[k];
                                //console.log(PlanesEstudios[j].obligatoria + ": " + Materia.materia);
                            }
                        }

                        var ValorUC = tipo_estudio.estudio.valor_uc;
                        var Moneda = ValorUC.moneda;
                        var PlanesFinanciamiento = ValorUC.planes_financiamiento;
//            console.log($scope.THEPlanFinanciamiento);
                        var Periodo = ValorUC.periodo;
                        $scope.PlanesFinanciamiento = PlanesFinanciamiento;
                        $scope.TipoEstudio = tipo_estudio;
                        $scope.Estudio = tipo_estudio.estudio;
                        $scope.Pensum = Pensum;
                        $scope.Niveles = Niveles;
                        $scope.ValorUC = ValorUC;
                        $scope.Moneda = Moneda;
                        $scope.Periodo = Periodo;
                    }
                    $scope.cargandoEstudio = false;
                }).error(function (data) {
                    estudioService.estudioSoloInfo($scope.idEstudio).get(function (success) {
                        $scope.estudioInfo = success;
                        console.log($scope.estudioInfo);
                        $scope.cargandoInfo = true;
                    });
                    $scope.cargandoEstudio = false;
                    $scope.PlanesFinanciamiento = [];
                    //console.log(data);
                });
            } else {
//console.log('No puede inscribir.');
                $scope.PlanesFinanciamiento = {};
            }
        }).error(function (data) {
            $scope.cargandoInscripciones = false;
            $scope.cargandoEstudio = false;
            $scope.Inscripciones = [];
            //console.log('Error');
            //console.log(data);
        });
    } else {
//console.log('Nope');
    }

    console.log($scope.Estudio);
    //by Eddiie Master
//    if ($scope.isLogged === true) {
//         personaService.registroAcademico().ejecutar(function (success) {
//        $scope.Inscripciones = success;
//
//        for (var i = 0; i < $scope.Inscripciones.length; i++) {
//            //console.log($scope.idEstudio + " - " + $scope.Inscripciones[i].idEstudio);
//            if (($scope.Inscripciones[i].idEstudio === $scope.idEstudio) && ($scope.Inscripciones[i].estadoEstudio === 1)) {
//                $scope.puedeInscribir = false;
//            }
//        }
//        if ($scope.puedeInscribir === true) {
//            personaService.estudioSeleccionado($scope.idEstudio).ejecutar(function (success) {
//                //console.log(data);
//                var tipo_estudio = success.tipo_estudio;
//                //console.log(tipo_estudio);
//                var Pensum = tipo_estudio.estudio.pensum;
//                var Niveles = tipo_estudio.estudio.pensum.niveles;
//                for (var i = 1; i < Niveles.length; i++) {
//                    var Nivel = Niveles[i][0];
//                    //console.log("Periodo: " + Nivel.nivel);
//                    var PlanesEstudios = Niveles[i][0].planesEstudiosCollection;
//                    for (var j = 0; j < PlanesEstudios.length; j++) {
//                        var PlanEstudio = PlanesEstudios[j];
//                        var Materias = PlanesEstudios[j].materiasCollection;
//                        for (var k = 0; k < Materias.length; k++) {
//                            Niveles[i][0].planesEstudiosCollection[j].materiasCollection[k].idSeccionSeleccionado = Niveles[i][0].planesEstudiosCollection[j].materiasCollection[k].seccionesCollection[0];
//                            var Materia = Materias[k];
//                            //console.log(PlanesEstudios[j].obligatoria + ": " + Materia.materia);
//                        }
//                    }
//
//                    var ValorUC = tipo_estudio.estudio.valor_uc;
//                    var Moneda = ValorUC.moneda;
//                    var PlanesFinanciamiento = ValorUC.planes_financiamiento;
////            console.log($scope.THEPlanFinanciamiento);
//                    var Periodo = ValorUC.periodo;
//                    $scope.PlanesFinanciamiento = PlanesFinanciamiento;
//                    $scope.TipoEstudio = tipo_estudio;
//                    $scope.Estudio = tipo_estudio.estudio;
//                    $scope.Pensum = Pensum;
//                    $scope.Niveles = Niveles;
//                    $scope.ValorUC = ValorUC;
//                    $scope.Moneda = Moneda;
//                    $scope.Periodo = Periodo;
//                }
//            }, function (error) {
//                console.log("error Request PersonaService estudioElegido\n"+error);
//            });
//        }
//
//    }, function (error) {
//        console.log("Error Request PersonaService registroAcademico\n"+error);
//    });
//    }


    $scope.goOn = function () {
        var pago_estudio = {
            TipoEstudio: $scope.TipoEstudio,
            Estudio: $scope.Estudio,
            Pensum: $scope.Pensum,
            Niveles: $scope.Niveles,
            ValorUC: $scope.ValorUC,
            Moneda: $scope.Moneda,
            Periodo: $scope.Periodo,
            PlanesFinanciamiento: $scope.PlanesFinanciamiento,
            THEPlanFinanciamiento: $scope.THEPlanFinanciamiento
        };
        //console.log(pago_estudio);
        Payments.setObject(pago_estudio);
        $location.url("/pago_estudio_stp1");
    };
});