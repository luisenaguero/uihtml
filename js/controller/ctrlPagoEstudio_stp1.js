app.controller('ctrlPagoEstudio_stp1', function ($scope, $http, Payments, $location, AuthSession) {
    $scope.THEPlanFinanciamiento = {
        detallesPlanesFinanciamientosCollection: {}
    };

    if (jQuery.isEmptyObject(Payments.getObject()) === true || !AuthSession.isLogged()) {
        $location.url("/inicio");
    } else {
        $scope.TipoEstudio = Payments.getObject().TipoEstudio;
        $scope.Estudio = Payments.getObject().Estudio;
        $scope.Pensum = Payments.getObject().Pensum;
        $scope.Niveles = Payments.getObject().Niveles;
        $scope.ValorUC = Payments.getObject().ValorUC;
        $scope.Moneda = Payments.getObject().Moneda;
        $scope.Periodo = Payments.getObject().Periodo;
        $scope.PlanesFinanciamiento = Payments.getObject().PlanesFinanciamiento;
        $scope.THEPlanFinanciamiento = Payments.getObject().PlanesFinanciamiento[0];
    }

    $scope.continue = function () {
        var PlanesEstudio = $scope.Niveles[1][0].planesEstudiosCollection;
        for (var i = 0; i < PlanesEstudio.length; i++) {
            var PlanEstudio = $scope.Niveles[1][0].planesEstudiosCollection[i];
            var Materias = PlanEstudio.materiasCollection;
            for (var j = 0; j < Materias.length; j++) {
                var Materia = Materias[j];
                var Secciones = Materia.seccionesCollection;
                for (var k = 0; k < Secciones.length; k++) {
                    var Seccion = Secciones[k];
//                    console.log(Materia.materia + " - " + Materia.idSeccionSeleccionado + " - " + Seccion.idSeccion);
                    if (Materia.idSeccionSeleccionado === Seccion.idSeccion) {
                        $scope.Niveles[1][0].planesEstudiosCollection[i].materiasCollection[j].idSeccionSeleccionado = Seccion;
                    }
//                    console.log($scope.Niveles[1][0].planesEstudiosCollection[i].materiasCollection[j].idSeccionSeleccionado);
                }
            }
        }

        var pago_estudio = {
            TipoEstudio: $scope.TipoEstudio,
            Estudio: $scope.Estudio,
            Pensum: $scope.Pensum,
            Niveles: $scope.Niveles,
            ValorUC: $scope.ValorUC,
            Moneda: $scope.Moneda,
            Periodo: $scope.Periodo,
            THEPlanFinanciamiento: $scope.THEPlanFinanciamiento
        };

        Payments.setObject(pago_estudio);
        $location.url("/pago_estudio_stp2");
    };

    $scope.verSeccion = function (Materia, Seccion) {
        Materia.idSeccionSeleccionado = Seccion;
        //console.log(Seccion);
    };

    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.length; i++) {
            var Detalle = $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[i];
            total += Detalle.montoCuota;
        }

        return total;
    };

    $scope.getTotalToPay = function () {
        var total = 0;
        for (var i = 0; i < $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.length; i++) {
            var cuota = $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[i];
            if (cuota.seleccionado === true) {
                total += cuota.montoCuota;
            }
        }
        return total;
    };

    $scope.cambioCuota = function (index) {
        var cuota = $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[index];
        if (cuota.seleccionado === false) {
            for (var i = index; i < $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.length; i++) {
                $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[i].seleccionado = false;
                $("#cuota_" + (i + 1)).addClass("hide");
            }
            $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[(index + 1)]
        } else {
            $("#cuota_" + (index + 1)).removeClass("hide");
        }
    };

    $scope.cambioCuota = function (index) {
        var cuota = $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[index];
        if (cuota.seleccionado === false) {
            for (var i = index; i < $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.length; i++) {
                $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[i].seleccionado = false;
                $("#cuota_" + (i + 1)).addClass("hide");
            }
            $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[(index + 1)]
        } else {
            $("#cuota_" + (index + 1)).removeClass("hide");
        }
    };

    $scope.cambioMateria = function () {
        var Niveles = $scope.Niveles;
        var cantidad_uc = 0;
        for (var i = 1; i < Niveles.length; i++) {
            var Nivel = Niveles[i][0];
            var PlanesEstudios = Nivel.planesEstudiosCollection;
            for (var j = 0; j < PlanesEstudios.length; j++) {
                var Materias = PlanesEstudios[j].materiasCollection;
                for (var k = 0; k < Materias.length; k++) {
                    var Materia = Materias[k];
                    if (Materia.seleccionado === true) {
                        cantidad_uc += Materia.cantidadUc;
                    }
                }
            }
        }

        var PlanesFinanciamiento = $scope.PlanesFinanciamiento;
        var cont = 0;
        for (var l = 0; l < PlanesFinanciamiento.length; l++) {
            var PlanFinanciamiento = PlanesFinanciamiento[l];
            if (PlanFinanciamiento.unidadCredito === cantidad_uc) {
                var DetallesPlanFinanciamiento = PlanFinanciamiento.detallesPlanesFinanciamientosCollection;
                $scope.THEPlanFinanciamiento = PlanFinanciamiento;
                //console.log('Cuotas a pagar:');
                for (var m = 0; m < DetallesPlanFinanciamiento.length; m++) {
                    if (m === 0) {
                        $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[m].concepto = "Inicial";
                        $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[m].seleccionado = true;
                    } else {
                        $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[m].concepto = "Cuota " + m;
                        $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[m].seleccionado = false;
                    }
                    var DetallePlanFinanciamiento = DetallesPlanFinanciamiento[m];
                    //console.log(DetallePlanFinanciamiento.montoCuota + " - " + DetallePlanFinanciamiento.fechaCobroPlan);
                }
            } else {
                cont++;
            }
        }
        if (cont === PlanesFinanciamiento.length) {
            $scope.THEPlanFinanciamiento = [];
        } else {
            $scope.cambioCuota(1);
        }
        $scope.cantidadUc = cantidad_uc;
        //console.log($scope.cantidadUc);
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $scope.cambioCuota(1);
        $scope.cambioMateria();
    });
});