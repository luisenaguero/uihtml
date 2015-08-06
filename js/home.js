/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    //CAMBIO EL MARGEN DE LOS ELEMENTOS PARA DAR UN EFECTO RESPONSIVE

    var changeMargins = function () {

        //TAMAÑO DE LA PANTALLA
        var windowSize = $(window).width();
        //MARGEN IZQUIERDO DEL DIV DEL LOGO
        var logoMarginLeft = parseInt(($(logo).css('margin-left')).replace("px", ""));
        //ESPACIO TOTAL OCUPADO POR EL LOGO
        var espacioTotalLogo = $(logo).width() + logoMarginLeft;
        //MARGEN IZQUIERDO DE LA BARRA 
        var marginLeftNav = windowSize - $(myNavbar).width();

        // SI EL NAVBAR SE ACERCA LE REDUZCO EL MARGINLEFT AL LOGO
        while (marginLeftNav - espacioTotalLogo < 50) {

            if (logoMarginLeft > 5) {
                logoMarginLeft--;
            } else {
                break;
            }

            $(logo).css("margin-left", logoMarginLeft);
            espacioTotalLogo = $(logo).width() + logoMarginLeft;
        }

        // SI EL NAVBAR SE ALEJA LE AUMENTO EL MARGINLEFT AL LOGO
        while (marginLeftNav - espacioTotalLogo > 50) {

            logoMarginLeft++;

            $(logo).css("margin-left", logoMarginLeft);
            espacioTotalLogo = $(logo).width() + logoMarginLeft;
        }

        // MARGIN RIGHT DE LAS OPCIONES SUPERIORES

        var opcSupMarginRight = parseInt(($(opcSup).css('margin-right')).replace("px", ""));
        var sumaTopDiv = (opcSupMarginRight + $(opcSup).width() + $(login).width());

        while ((windowSize - 150 <= sumaTopDiv)
                || espacioTotalLogo >= windowSize - sumaTopDiv
                ) {
            opcSupMarginRight--;
            $(opcSup).css("margin-right", opcSupMarginRight);
            sumaTopDiv = (opcSupMarginRight + $(opcSup).width() + $(login).width());
        }

        while (($(login).width() + $(opcSup).width() + opcSupMarginRight) < $(myNavbar).width()) {
            opcSupMarginRight++;
            $(opcSup).css("margin-right", opcSupMarginRight);
        }
    };

    changeMargins();

    $(window).resize(function () {

        var windowSize = $(window).width();

        if (windowSize < 1050) {
            $("#logo").css("display", "none");
            $("#myNavbar").css("float", "none");

        } else {
            $("#logo").css("display", "inline-block");
            $("#myNavbar").css("float", "right");
        }
        changeMargins();
    });
});



