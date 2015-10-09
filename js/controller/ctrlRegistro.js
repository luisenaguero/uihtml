/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Master
 */
app.controller('ctrlRegistro', function ($scope, $http, $filter, personaService, $mdDialog, $rootScope) {

    $scope.user = {
    };

    $scope.dis = [
        "discapacidad 1",
        "discapacidad 2",
        "discapacidad 3",
        "discapacidad 4"
    ];


    //by Eddie Master lista de paises
    personaService.solicitudPais(function (success) {
        $scope.paises = success;
    }, function (error) {
        console.log("error al pedir los paises" + error);
    });

    $scope.sexos = [
        {
            valor: 'F',
            nombre: 'Femenino'
        },
        {
            valor: 'M',
            nombre: 'Masculino'
        }
    ];

    $scope.register2 = function () {
        var fecha = $filter('date')($scope.user.fechaNacimiento, 'yyyy-MM-dd');
        $scope.user.fechaNacimiento = fecha + " 00:00:00.000";
        alert($scope.user.fechaNacimiento);
        $http({
            method: 'POST',
            url: 'https://api.urbeinternacional.com:8181/urbe-int-api/rest/1.0/people/newPeopleInter',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'text/html'},
            data: $.param($scope.user)
        }).success(function (data) {
            //console.log(data);
            if (data === "true") {
                //console.log('Registro realizado satisfactoriamente. Por favo verifique su correo para poder verificar su cuenta.');
            }
        }).error(function (data) {
            //console.log("error");
            //console.log(data);
        });
    };
    $scope.register = function () {

        var fecha = $filter('date')($scope.user.fechaNacimiento, 'yyyy-MM-dd');
        $scope.user.fechaNacimiento = fecha + " 00:00:00.000";
        // alert($scope.user.fechaNacimiento);
        //post del servicio del resource

        personaService.crearPrueba($.param($scope.user), function (response) {
            //console.log("Respuesta_Registro:");
            //console.log(response.content);
            $rootScope.global = response.content;
            $scope.estadoResgistro();
        }, function (error) {
            //console.log("ERROR");
            //console.log(error);
        }
        );
    };

    $scope.isChecked = function () {
        return $scope.data.checked;
    };

    $scope.passwordMatch = function () {
        return $scope.user.contrasena === $scope.user.ccontrasena;
    };

    $scope.emailMatch = function () {
        return $scope.user.correo === $scope.user.ccorreo;
    };

    //PopUp para recuperar contraseña
    $scope.showTerminosCondiciones = function (ev) {
        $mdDialog.show({
            controller: '',
            templateUrl: './templates/popup/TerminosCondiciones.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    //popUp para verificar si se realizo con exito el registro
    $scope.estadoResgistro = function (ev) {
        $mdDialog.show({
            controller: 'estadoRegistro',
            templateUrl: './templates/popup/MensajeRegistro.html',
            targetEvent: ev,
            clickOutsideToClose: false
        });
    };
    //PINTAR LOS SELECTS DE SEXO Y PAIS
    $("#"+$("[name=pais] md-select-value").attr("id")).addClass("select-registro");
    $("#"+$("[name=sexo] md-select-value").attr("id")).addClass("select-registro");
});