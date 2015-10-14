/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('UrbeInternacional', ['ngMdIcons', 'security.authorization', 'ngMaterial', 'ngRoute', 'ngMessages', 'ngAria', 'ngResource', 'ngLoadScript','ngStorage']);

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
app.run(function ($rootScope) {
    $rootScope.global = "";
    $rootScope.user = "";
    $rootScope.password = "";
});

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

//uso de redireccionamiento de prueba sin authorization
app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider
                .when('/', {
                    templateUrl: 'templates/inicio.html',
                    controller: ''
                })
                .when('/estudio', {
                    templateUrl: 'templates/estudio.html',
                    controller: 'ctrlEstudio'

                })
                .when('/certificacion', {
                    templateUrl: 'templates/certificacion.html',
                    controller: 'ctrlCertificacion'
                })
                .when('/nosotros', {
                    templateUrl: 'templates/nosotros.html',
                    controller: 'ctrlNosotros'
                })
                .when('/modelo-educativo', {
                    templateUrl: 'templates/modelo-educativo.html',
                    controller: 'ctrlMEducativo'
                })
                .when('/postgrado', {
                    templateUrl: 'templates/postgrado.html',
                    controller: 'ctrlPostgrado'
                })
                .when('/video-streaming', {
                    templateUrl: 'templates/video-streaming.html',
                    controller: 'ctrlVideoStreaming'
                })
                .when('/formacion-personal', {
                    templateUrl: 'templates/formacion-personal.html',
                    controller: 'ctrlDiplomado'
                })
                .when('/pago_estudio_stp1', {
                    templateUrl: 'templates/pago_estudio_stp1.html',
                    controller: 'ctrlPagoEstudio_stp1'
                })
                .when('/pago_estudio_stp2', {
                    templateUrl: 'templates/pago_estudio_stp2.html',
                    controller: 'ctrlPagoEstudio_stp2'
                })
                .when('/pago_estudio_stp3', {
                    templateUrl: 'templates/pago_estudio_stp3.html',
                    controller: 'ctrlPagoEstudio_stp3'
                })
                .when('/pago_estudio_cancelado', {
                    templateUrl: 'templates/inicio.html',
                    controller: 'ctrlPagoEstudio_cancelado'
                })
                .when('/estudios', {
                    templateUrl: 'templates/estudios.html',
                    controller: 'ctrlEstudios'
                })
                .when('/outsourcing', {
                    templateUrl: 'templates/outsourcing.html',
                    controller: 'ctrlOutsourcing'
                })
                .when('/soluciones', {
                    templateUrl: 'templates/soluciones.html',
                    controller: 'ctrlSolucionesC'
                })
                .when('/soporte', {
                    templateUrl: 'templates/soporte.html',
                    controller: 'ctrlSoporte'
                })
                .when('/universidad-corporativa', {
                    templateUrl: 'templates/universidad-corporativa.html',
                    controller: 'ctrlUniversidadC'
                })
                .when('/noticias-evento-virtual-educa-ecuador', {
                    templateUrl: 'templates/noticias-p.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-evento-citiced', {
                    templateUrl: 'templates/noticias-s.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-info-aiesad', {
                    templateUrl: 'templates/noticias-t.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-info-ried', {
                    templateUrl: 'templates/noticias-c.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-info-ried', {
                    templateUrl: 'templates/noticias-q.html',
                    controller: 'ctrlNoticias'
                })
                .when('/perfil', {
                    templateUrl: 'templates/perfil.html',
                    controller: 'ctrlPerfil'
                })
                .when('/registro', {
                    templateUrl: 'templates/registro.html',
                    controller: 'ctrlRegistro'
                })
                .when('/cuenta_verificada', {
                    templateUrl: 'templates/cuenta_verificada.html',
                    controller: 'ctrlCuentaVerificada'
                })
                .when('/cuenta_no_verificada', {
                    templateUrl: 'templates/cuenta_no_verificada.html',
                    controller: 'ctrlCuentaNoVerificada'
                })
                .when('/cuenta_sin_verificar', {
                    templateUrl: 'templates/cuenta_sin_verificar.html',
                    controller: ''
                })
                .when('/noticias-p', {
                    templateUrl: 'templates/noticias-p.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-s', {
                    templateUrl: 'templates/noticias-s.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-t', {
                    templateUrl: 'templates/noticias-t.html',
                    controller: 'ctrlNoticias'
                })
                .when('/noticias-c', {
                    templateUrl: 'templates/noticias-c.html',
                    controller: 'ctrlNoticias'
                })
                .when('/gerencia-operaciones-produccion', {
                    templateUrl: 'templates/diplomados/gerencia_opera.html',
                    controller: 'ctrlEstudio'
                })
                .when('/redes-area-local-cableado-estructurado', {
                    templateUrl: 'templates/diplomados/redes.html',
                    controller: 'ctrlEstudio'
                })
                .when('/criminalistica', {
                    templateUrl: 'templates/diplomados/crimi.html',
                    controller: 'ctrlEstudio'
                })
                .when('/liderazgo-gestion-directiva-educacion', {
                    templateUrl: 'templates/diplomados/liderazgo.html',
                    controller: 'ctrlEstudio'
                })
                .when('/planificacion-educativa', {
                    templateUrl: 'templates/diplomados/plani_edu.html',
                    controller: 'ctrlEstudio'
                })
                .when('/formulacion-evaluacion-plan-negocios', {
                    templateUrl: 'templates/diplomados/formu_nego.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gestion-talento-humano', {
                    templateUrl: 'templates/diplomados/talento-humano.html',
                    controller: 'ctrlEstudio'
                })
                .when('/negocio-maritimo', {
                    templateUrl: 'templates/diplomados/negocio-maritimo.html',
                    controller: 'ctrlEstudio'
                })
                .when('/mercadeo-ventas', {
                    templateUrl: 'templates/diplomados/mercadeo-ventas.html',
                    controller: 'ctrlEstudio'
                })
                .when('/negociacion-gestion-conflictos', {
                    templateUrl: 'templates/diplomados/nego-conflictos.html',
                    controller: 'ctrlEstudio'
                })
                .when('/administracion-tributaria', {
                    templateUrl: 'templates/diplomados/admi-tributaria.html',
                    controller: 'ctrlEstudio'
                })
                .when('/administracion-logistica-integral', {
                    templateUrl: 'templates/diplomados/logistica-integral.html',
                    controller: 'ctrlEstudio'
                })
                .when('/formacion-emprendedores-innovadores', {
                    templateUrl: 'templates/diplomados/form-emprendedores.html',
                    controller: 'ctrlEstudio'
                })
                .when('/seguridad-higiene-ambiente', {
                    templateUrl: 'templates/diplomados/sha.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-financiera', {
                    templateUrl: 'templates/diplomados/gerencia-financiera.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gestion-empresas-servicios', {
                    templateUrl: 'templates/diplomados/empresa-servicio.html',
                    controller: 'ctrlEstudio'
                })
                .when('/diseno-medios-web', {
                    templateUrl: 'templates/diplomados/medios-web.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-proyectos', {
                    templateUrl: 'templates/diplomados/gerencia-proyectos.html',
                    controller: 'ctrlEstudio'
                })
                .when('/prevencion-intervencion-integral-consumo-drogas', {
                    templateUrl: 'templates/diplomados/prev-inter-integ.html',
                    controller: 'ctrlEstudio'
                })
                .when('/instrumentacion-automatizacion-industrial', {
                    templateUrl: 'templates/diplomados/auto-control.html',
                    controller: 'ctrlEstudio'
                })
                .when('/mantenimiento-industrial', {
                    templateUrl: 'templates/diplomados/mant-industrial.html',
                    controller: 'ctrlEstudio'
                })
                .when('/sistemas-integrados-gestion', {
                    templateUrl: 'templates/diplomados/sist-integrados.html',
                    controller: 'ctrlEstudio'
                })
                .when('/formacion-desarrolladores-web', {
                    templateUrl: 'templates/diplomados/form-desarrolladores.html',
                    controller: 'ctrlEstudio'
                })
                .when('/derecho-empresa', {
                    templateUrl: 'templates/diplomados/derecho-empresa.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gestion-inclusiva-personas-discapacidad', {
                    templateUrl: 'templates/diplomados/gestion-inclusiva.html',
                    controller: 'ctrlEstudio'
                })
                .when('/lengua-senas', {
                    templateUrl: 'templates/diplomados/lengua-senas.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-servicios-salud', {
                    templateUrl: 'templates/diplomados/gerencia-servicios-salud.html',
                    controller: 'ctrlEstudio'
                })
                .when('/medicina-legal-ocupacional-seguridad', {
                    templateUrl: 'templates/diplomados/med-legal.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-estrategica-liderazgo', {
                    templateUrl: 'templates/diplomados/gerencia-estra.html',
                    controller: 'ctrlEstudio'
                })
                .when('/negocios-electronicos-redes-sociales', {
                    templateUrl: 'templates/diplomados/negocios-elec.html',
                    controller: 'ctrlEstudio'
                })
                .when('/diseno-animacion-video-digital', {
                    templateUrl: 'templates/diplomados/dis-animacion.html',
                    controller: 'ctrlEstudio'
                })
                .when('/diseno-medios-impresos', {
                    templateUrl: 'templates/diplomados/dis-medios-impre.html',
                    controller: 'ctrlEstudio'
                })
                .when('/produccion-audiovisual', {
                    templateUrl: 'templates/diplomados/produccion-audio.html',
                    controller: 'ctrlEstudio'
                })
                .when('/inspeccion-obras-construccion', {
                    templateUrl: 'templates/diplomados/inspecion-cons.html',
                    controller: 'ctrlEstudio'
                })
                .when('/normas-iso-rumbo-certificacion', {
                    templateUrl: 'templates/cursos/normas-iso.html',
                    controller: 'ctrlEstudio'
                })
                .when('/herrramientas-aseguramiento-calidad', {
                    templateUrl: 'templates/cursos/herrra-aseguramiento.html',
                    controller: 'ctrlEstudio'
                })
                .when('/administracion-inventarios', {
                    templateUrl: 'templates/cursos/admin-invent.html',
                    controller: 'ctrlEstudio'
                })
                .when('/petroleo-petroleros', {
                    templateUrl: 'templates/cursos/petroleo.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerenciando-empresa', {
                    templateUrl: 'templates/cursos/gerencia-empresa.html',
                    controller: 'ctrlEstudio'
                })
                .when('/edu-sira', {
                    templateUrl: 'templates/cursos/educ-sira.html',
                    controller: 'ctrlEstudio'
                })
                .when('/administracion-contratos-obras-publicas-bienes-servicios', {
                    templateUrl: 'templates/cursos/adm-contra.html',
                    controller: 'ctrlEstudio'
                })
                .when('/actualizacion-contratos-publicos', {
                    templateUrl: 'templates/cursos/act-contr-pub.html',
                    controller: 'ctrlEstudio'
                })
                .when('/como-elaborar-programa-salud-seguridad-laboral', {
                    templateUrl: 'templates/cursos/como-elab-prog.html',
                    controller: 'ctrlEstudio'
                })
                .when('/autoestima-motivacion-logro', {
                    templateUrl: 'templates/cursos/aut-motiv.html',
                    controller: 'ctrlEstudio'
                })
                .when('/manejo-estres-tiempo-crisis', {
                    templateUrl: 'templates/cursos/manj-estres.html',
                    controller: 'ctrlEstudio'
                })
                .when('/calidad-servicios-cliente', {
                    templateUrl: 'templates/cursos/calid-servic.html',
                    controller: 'ctrlEstudio'
                })
                .when('/desarrollo-habilidades-counseling-coaching', {
                    templateUrl: 'templates/cursos/desa-habil.html',
                    controller: 'ctrlEstudio'
                })
                .when('/finanzas-no-financieros', {
                    templateUrl: 'templates/cursos/fin-nofinancieros.html',
                    controller: 'ctrlEstudio'
                })
                .when('/pnl-negociaciones-efectivas', {
                    templateUrl: 'templates/cursos/pnl-neg-efec.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-eventos-especiales-protocolo', {
                    templateUrl: 'templates/cursos/gerenc-ev.html',
                    controller: 'ctrlEstudio'
                })
                .when('/presentaciones-orales-efectivas', {
                    templateUrl: 'templates/cursos/presen-oral.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-ciencia-tecnologia', {
                    templateUrl: 'templates/especializaciones/ciencia-tecnologia.html',
                    controller: 'ctrlEstudio'
                })
                .when('/docencia-educacion-basica', {
                    templateUrl: 'templates/especializaciones/doc-educacion-basica.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-organizaciones', {
                    templateUrl: 'templates/especializaciones/gerencia-organizaciones.html',
                    controller: 'ctrlEstudio'
                })
                .when('/informatica-educativa', {
                    templateUrl: 'templates/especializaciones/informatica-educativa.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-comunicacion', {
                    templateUrl: 'templates/maestrias/cien-comu.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-educacion-mencion-gerencia-educativa', {
                    templateUrl: 'templates/maestrias/cien-edu.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-empresarial', {
                    templateUrl: 'templates/maestrias/geren-empr.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-mercadeo', {
                    templateUrl: 'templates/maestrias/geren-merc.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-proyectos-investigacion-desarrollo', {
                    templateUrl: 'templates/maestrias/geren-proy-inves.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-proyectos-industriales', {
                    templateUrl: 'templates/maestrias/geren-proy.html',
                    controller: 'ctrlEstudio'
                })
                .when('/postgrado-informatica-educativa', {
                    templateUrl: 'templates/maestrias/inf-edu.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ingenieria-control-automatizacion-procesos', {
                    templateUrl: 'templates/maestrias/ing-con-aut.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-recursos-humanos', {
                    templateUrl: 'templates/maestrias/recursos-humanos.html',
                    controller: 'ctrlEstudio'
                })
                .when('/telematica', {
                    templateUrl: 'templates/maestrias/telematica.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-mencion-gerencia', {
                    templateUrl: 'templates/doctorados/doc-ciencia-gerencia.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-educacion', {
                    templateUrl: 'templates/doctorados/doc-ciencia-educacion.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-gerenciales', {
                    templateUrl: 'templates/doctorados/doc-ciencia-gerenciales.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ciencias-politicas', {
                    templateUrl: 'templates/doctorados/doc-ciencia-politica.html',
                    controller: 'ctrlEstudio'
                })
                .when('/estado-politicas-publicas-paz-social', {
                    templateUrl: 'templates/postdoctorados/post-politicas-publicas.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gestion-ciencia-tecnologia', {
                    templateUrl: 'templates/postdoctorados/post-ciencia-tecnologia.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-educacion-superior', {
                    templateUrl: 'templates/postdoctorados/post-educacion-superior.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-organizaciones', {
                    templateUrl: 'templates/postdoctorados/post-gerencia-organizaciones.html',
                    controller: 'ctrlEstudio'
                })
                .when('/gerencia-publica-gobierno', {
                    templateUrl: 'templates/postdoctorados/post-gerencia-publica.html',
                    controller: 'ctrlEstudio'
                })
                .when('/integracion-desarrollo-america-latina', {
                    templateUrl: 'templates/postdoctorados/post-integracion-desarrollo.html',
                    controller: 'ctrlEstudio'
                })
                .when('/docencia-educacion-universitaria', {
                    templateUrl: 'templates/programas/docen-edu-uni.html',
                    controller: 'ctrlEstudio'
                })
                .when('/formacion-investigadores', {
                    templateUrl: 'templates/programas/formacion-invest.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ccna-routing', {
                    templateUrl: 'templates/certificacion/ccna-routing.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ccna-security', {
                    templateUrl: 'templates/certificacion/ccna-security.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ccnp-switching', {
                    templateUrl: 'templates/certificacion/ccnp-switching.html',
                    controller: 'ctrlEstudio'
                })
                .when('/it-essentials', {
                    templateUrl: 'templates/certificacion/it-essentials.html',
                    controller: 'ctrlEstudio'
                })
                .when('/ndg', {
                    templateUrl: 'templates/certificacion/ndg.html',
                    controller: 'ctrlEstudio'

                })
                .otherwise({
                    templateUrl: 'templates/inicio.html',
                    controller: 'ctrlPortal'
                });
    }]);

//

