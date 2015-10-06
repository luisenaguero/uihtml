app.controller('RecoverPasswordController', function ($scope,$mdDialog) {
    $scope.recoverPassword = function(ev){
        $mdDialog.show({
           controller:'recuperarContrasena',
           templateUrl:'./templates/popup/recuperar-contrasena-stp2.html',
           parent:angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose:true
        });
    };
});