/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('UrbeInternacional', [/*'security.authorization',*/ 'ngRoute']);

// uso de redireccionamiento con authorization comentar para pruebas

//app.config(function ($stateProvider, AUTH_EVENTS){
//   
//   $stateProvider.state(AUTH_EVENTS.loginsSucces,{
//      //url:'url del index'
//      //templateUrl:'direccion del template a usar'
//      //controller:'controlador a usar'
//        
//   });
//    
//});


//uso de redireccionamiento de prueba sin authorization
app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.
                when('/', {
                    templateUrl: 'templates/inicio.html',
                    controller: 'ctrlPortal'
                }).when('/certificacion',{
                    templateUrl:'templates/certificacion.html',
                    controller:'ctrlCertificacion'
                }).when('/nosotros',{
                    templateUrl:'templates/nosotros.html',
                    controller:'ctrlNosotros'
                }).when('/modelo-educativo',{
                    templateUrl:'templates/modelo-educativo.html',
                    controller:'ctrlMEducativo'
                }).when('/postgrado',{
                    templateUrl:'templates/postgrado.html',
                    controller:'ctrlPostgrado'
                }).when('/video-streaming',{
                    templateUrl:'templates/video-streaming.html',
                    controller:'ctrlVideoStreaming'
                });

    }
]);

