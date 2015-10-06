app.controller('ctrlPagoEstudio_stp2', function ($scope, $http, Payments, $location, AuthSession) {
    //console.log(Payments.getObject());
    if (jQuery.isEmptyObject(Payments.getObject()) === false && AuthSession.isLogged() === true) {
        $scope.pago_estudio = Payments.getObject();
        Payments.setObject(null);
        $scope.TipoEstudio = $scope.pago_estudio.TipoEstudio;
        $scope.Pensum = $scope.pago_estudio.Pensum;
        $scope.Niveles = $scope.pago_estudio.Niveles;
        $scope.ValorUC = $scope.pago_estudio.ValorUC;
        $scope.Moneda = $scope.pago_estudio.Moneda;
        $scope.Persona = AuthSession.getUser();
        $scope.Estudio = $scope.pago_estudio.Estudio;
        $scope.Periodo = $scope.pago_estudio.Periodo;
        $scope.THEPlanFinanciamiento = $scope.pago_estudio.THEPlanFinanciamiento;
        $scope.THEPlanFinanciamientoUntouched = $scope.pago_estudio.THEPlanFinanciamiento;
        var detalles_planes_financiamientos = [];
        var secciones = [];
        var cantidadNiveles = 0;
        for (var i = 0; i < $scope.Niveles[1][0].planesEstudiosCollection.length; i++) {
            cantidadNiveles++;
            var PlanEstudio = $scope.Niveles[1][0].planesEstudiosCollection[i];
            for (var j = 0; j < PlanEstudio.materiasCollection.length; j++) {
                var Materia = PlanEstudio.materiasCollection[j];
                if (Materia.seleccionado === true) {
                    //console.lo
                    //g(Materia.materia);
                    secciones.push(Materia.idSeccionSeleccionado);
                }
            }
        }

        for (i = 0; i < $scope.THEPlanFinanciamientoUntouched.detallesPlanesFinanciamientosCollection.length; i++) {
            var Detalle = $scope.THEPlanFinanciamientoUntouched.detallesPlanesFinanciamientosCollection[i];
            detalles_planes_financiamientos.push(Detalle);
        }

        $scope.Estudio.cantidadNiveles = cantidadNiveles;

        $scope.final = {
            persona: $scope.Persona,
            pensum: $scope.Pensum,
            estudio: $scope.Estudio,
            periodo: $scope.Periodo,
            planes_financiamiento: $scope.THEPlanFinanciamientoUntouched,
            secciones: secciones
        };
    } else {
        $location.url("/inicio");
    }
    $scope.finish = function () {
        //console.log($scope.final);

        $http({
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/inscribir',
            data: JSON.stringify($scope.final),
        }).success(function (data) {
            alert('¡Estás inscrito!');
            //console.log(JSON.stringify(data));
            $location.url("/inicio");
        }).error(function (data) {
            alert('¡Ocurrió un error!');
            //console.log(JSON.stringify(data));
        });
    }
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.length; i++) {
            var Cuota = $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection[i];
            if (Cuota.seleccionado === true) {
                total += Cuota.montoCuota;
            } else {
                $scope.THEPlanFinanciamiento.detallesPlanesFinanciamientosCollection.splice(i, 1);
            }
        }

        return total;
    };
    $scope.continue = function () {
        $http({
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/inscribir',
            data: JSON.stringify($scope.final),
        }).success(function (data) {
            //console.log(data);
        }).error(function (data) {
            //console.log(data);
        });
    };
});