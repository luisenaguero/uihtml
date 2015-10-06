/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * by Eddie Master
 */
app.controller('estadoRegistro', function ($scope,$mdDialog,$rootScope,$location){
      if(($rootScope.global.substring(($rootScope.global.length-7),$rootScope.global.length))==="existe."){
           $scope.mensaje= $rootScope.global;
       }else{
           if($rootScope.global==="Registrado con éxito"){
           $scope.mensaje ="Registrado con éxito";   
       }else{
           $scope.mensaje="Ha ocurrido un error, por favor intente de nuevo más tarde";
       }
   }
    $scope.cerrarDialog = function (){
       
        if($scope.mensaje === "Registrado con éxito"){
            $mdDialog.hide();
            $location.path("#/inicio");   
        }
        else{
          $mdDialog.hide();  
        }
    };
});

