/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Master  
 */
app.controller('verificarCorreo', function ($scope, $mdDialog, $rootScope, cuentaService) {
    //console.log("Eddie Master :" + JSON.stringify($rootScope.global));
    $scope.correo = $rootScope.global.correoPrimario;
    $scope.mensaje = "Se envio el correo con éxito";
    $scope.enviarCodigo = function () {
        cuentaService.reenviarCodigo($scope.correo, 1).ejecutar(function (success) {
            
            $scope.showMessage();
            setTimeout(function (){
                $mdDialog.hide();
            },4000);
            
        }, function (error) {
            alert("error inesperado");
        });
    };
    $scope.showMessage = function (ev) {
        $mdDialog.show({
            controller: '',
            templateUrl: './templates/popup/PopupEnviado.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false //cambiar a false al poner el template 
        });
    };
    
});

