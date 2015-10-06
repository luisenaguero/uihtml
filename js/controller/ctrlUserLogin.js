/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Master
 */

app.controller('userLoginController', function ($scope, $mdDialog, userLogin, AuthSession) {
    //console.log("UserLoginController");
    $scope.userlogin = function () {
        userLogin.servicio($scope.user, $scope.password).ejecutar(function (success) {
//            Security.people = success;
//            alert(AuthSession.isLogged());
//            Security.session = AuthSession.isLogged();
            //console.log("Funcion userLogin");          
            $mdDialog.hide();
            location.reload();
            
        }, function (error) {
            //console.log("error");
            //console.log(error);
        });


        
    };
});


