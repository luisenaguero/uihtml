app.controller('ctrlCuentaVerificada', function ($scope, $http, $location, $mdToast, cuentaService) {

    $scope.recover = {};

    if (typeof $location.search()['codigo'] === 'undefined' || $location.search()['codigo'].length === 0) {
        $location.url("/inicio");
    } else {
        $scope.codigo = $location.search()['codigo'];
        //console.log($scope.codigo);
        $scope.cargando = true;
        $scope.exito = true;

        //by Eddie Master

        cuentaService.verificarEmail($scope.codigo).ejecutar(function (success) {
            //console.log(success);
            if (success.content === "false") {
                $scope.cargando = false;
                $scope.exito = false;
            }
            else if (success.content === "Este correo ya fue verificado") {
                $scope.cargando = false;
                $scope.exito = true;
            } else {
                $scope.correo = success.content;
                $scope.cargando = false;
                $scope.exito = true;
            }
        }, function (error) {
            //console.log(error);
            $scope.cargando = false;
            $scope.exito = false;
        });

        $scope.resendCode = function () {
            //console.log($scope.recover.correoReenviar);
            cuentaService.reenviarCodigo($scope.recover.correoReenviar, 1).ejecutar(function (success) {

                $scope.showMessage();
                setTimeout(function () {
                    $mdDialog.hide();
                }, 4000);

            }, function (error) {
                alert("error inesperado");
            });
        };
    }

    //correo - accion
    //1 correo
    //2 contrasena

    $scope.isSuccessful = function () {
        var is = false;
        if ($scope.cargando === false && $scope.exito === true) {
            is = true;
        }
        return is;
    }

    $scope.isUnsuccessful = function () {
        var is = false;
        if ($scope.cargando === false && $scope.exito === false) {
            is = true;
        }
        return is;
    }

    $scope.isWaiting = function () {
        var is = false;
        if ($scope.cargando === true) {
            is = true;
        }
        return is;
    }

    function showToast(contenido) {
        $mdToast.show({
            template: '<md-toast>' + contenido + '</md-toast>',
            hideDelay: 2000,
            position: 'top right'
        });
    }

});