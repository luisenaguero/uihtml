app.controller('ctrlPagoEstudio_stp3', function ($scope, $http, Payments, $location, AuthSession, $localStorage) {
    //console.log(Payments.getObject());
    if (($localStorage.StudyToken) && (AuthSession.isLogged() === true) && (typeof $location.search()['token'] !== 'undefined' && $location.search()['token'].length !== 0) && (typeof $location.search()['PayerID'] !== 'undefined' && $location.search()['PayerID'].length !== 0)) {
        $scope.token = $location.search()['token'];
        $scope.PayerID = $location.search()['PayerID'];
        //console.log($scope.PayerID);
        //console.log($scope.token);
        $scope.pago_estudio = JSON.parse(atob(String($localStorage.StudyToken).replace(/\n/g, '')));
        delete $localStorage.StudyToken;
        //console.log($scope.pago_estudio);
        Payments.setObject(null);
        $scope.Pensum = $scope.pago_estudio.estudio.pensum;
        $scope.Niveles = $scope.pago_estudio.pensum.niveles;
        $scope.ValorUC = $scope.pago_estudio.valor_uc;
        $scope.Moneda = $scope.pago_estudio.Moneda;
        $scope.Persona = AuthSession.getUser();
        $scope.Estudio = $scope.pago_estudio.estudio;
        $scope.Periodo = $scope.pago_estudio.periodo;
        $scope.THEPlanFinanciamiento = $scope.pago_estudio.planes_financiamiento;
        $scope.THEPlanFinanciamientoUntouched = $scope.pago_estudio.planes_financiamientoUntouched;
        var detalles_planes_financiamientos = [];
        var secciones = [];
        var cantidadNiveles = 0;
        for (var i = 0; i < $scope.Niveles[1][0].planesEstudiosCollection.length; i++) {
            cantidadNiveles++;
            var PlanEstudio = $scope.Niveles[1][0].planesEstudiosCollection[i];
            for (var j = 0; j < PlanEstudio.materiasCollection.length; j++) {
                var Materia = PlanEstudio.materiasCollection[j];
                if (Materia.seleccionado === true) {
                    secciones.push(Materia.idSeccionSeleccionado);
                }
            }
        }

        $scope.Estudio.cantidadNiveles = cantidadNiveles;
        $scope.final = {
            persona: $scope.Persona,
            pensum: $scope.Pensum,
            estudio: $scope.Estudio,
            periodo: $scope.Periodo,
            planes_financiamiento: $scope.THEPlanFinanciamiento,
            planes_financiamientoUntouched: $scope.THEPlanFinanciamientoUntouched,
            secciones: secciones,
            token: $scope.token,
            PayerID: $scope.PayerID
        };
        //console.log($scope.final);
        $http({
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/dopayment',
            data: JSON.stringify($scope.final),
        }).success(function (data) {
            if (data.ACK === "Success") {
                $http({
                    method: 'POST',
                    url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/payment/inscribir',
                    data: JSON.stringify($scope.final),
                }).success(function (data) {
                    alert(data.message);
                    //console.log(JSON.stringify(data));
                    $location.url("/inicio");
                }).error(function (data) {
                    //console.log(JSON.stringify(data));
                });
            }
            //console.log(JSON.stringify(data));
        }).error(function (data) {
            //console.log(JSON.stringify(data));
        });
    } else {
        $location.url("/inicio");
    }
});