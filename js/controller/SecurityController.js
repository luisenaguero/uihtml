/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('SecurityController', function($scope, $http, SecurityService, AuthSession) {
    
    console.log("AuthSession: "+AuthSession.isLogged());
    $scope.profile = AuthSession.isLogged();
    
    $scope.image = "R0lGODlhAQABAAAAACw=";
    $scope.profileData = null;

    $scope.login = function() {
        if (!angular.isString($scope.user) || !angular.isString($scope.password)){
            //showMessage("Error al escribir usuario y/o contraseña");
                console.log("usuario :"+$scope.user);
                console.log("password :"+$scope.password);
              alert("Error al escribir la contraseña");
          }
        else {
            var result = SecurityService.login($scope.user, $scope.password);
            
            result.service().then(function(data) {
                $scope.profileData = data;
                Security.people = data;
                $scope.profile = AuthSession.isLogged();;
                 console.log("AuthSession: "+AuthSession.isLogged());
                $scope.activeDesactiveLink(true, data.profiles);
                console.log("AuthSessionUsuario :");
               
                $scope.loadImageProfile();
            });
        }
    };

    $scope.logout = function() {
        console.log("AuthSessionUsuario :"+AuthSession.getUser());
       // $.mobile.showPageLoadingMsg();
       Security.reset();
      /* 
        $scope.image = "R0lGODlhAQABAAAAACw=";
        $scope.profile = AuthSession.isLogged();;
        $scope.activeDesactiveLink(false);
        $scope.user = null;
        $scope.password = null;        
        $.mobile.hidePageLoadingMsg();*/
    };

    $scope.loadImageProfile = function() {
        SecurityService.profileImage(Security.people.id).service().then(function(data) {
            $scope.image = data;
        });
    };

    $scope.closePopupChangePassword = function() {
        $('#changePassword').popup('close');
        $('#changePassword input[type=password]').each(function(index) {
            $(this.parentElement).css('border', '');
            this.value = '';
        });
        $('#changePassword form .error-info').html('');
    }

    $scope.changePassword = function() {
        var inputs = $('#changePassword input[type=password]');
        var label = $('#changePassword .error-info');

        if (hex_sha1($(inputs[0]).val()) == Security.password) {

            if ($(inputs[1]).val() == $(inputs[2]).val() &&
                    $(inputs[1]).val() != '' && matchPassword($(inputs[1]).val())) {
                $('#changePassword').popup('close');
               // $.mobile.showPageLoadingMsg();
                SecurityService.changePassword(
                        Security.people.identification,
                        hex_sha1($(inputs[1]).val()),
                        hex_sha1($(inputs[0]).val())).
                        then(function(data) {
                            $.mobile.hidePageLoadingMsg();
                            showMessage("Contraseña cambiada con exito!");
                            Security.password = $(inputs[1]).val();

                        });
            }
        }
    };

    $scope.validate = function($event, name) {
        var label = $('#changePassword .error-info');
        var input = $('#changePassword input[name=' + name + ']');
        if (name == "oldpassword") {
            if (input.val() != Security.password) {
                input.parent().css('border', 'solid 2px red');
                label.html('La contraseña anterior es invalida');
                return;
            }
            input.parent().css('border', '');
            label.html('');
        } else {
            if (!matchPassword(input.val())) {
                input.parent().css('border', 'solid 2px red');
                label.html('La contraseña debe cumplir<br> \n\
             con las normas de seguridad:' +
                        '<ul style="text-align:justify;"><li>Al menos una letra may&uacute;sculas</li>\n\
             <li>Al menos un s&iacute;mbolo ( @#$&% ) </li>\n\
             <li>Entre 6 y 25 car&aacute;cteres</li><ul>');
                return;
            }
            input.parent().css('border', '');
            label.html('');
            $scope.validateForm();
        }
    }

    $scope.validateForm = function() {
        var inputs = $('#changePassword input[type=password]');
        var label = $('#changePassword .error-info');

        if ($(inputs[0]).val() == Security.password
                && $(inputs[1]).val() == $(inputs[2]).val()) {

            $($(inputs[1]).context.parentElement).css('border', '');
            $($(inputs[2]).context.parentElement).css('border', '');

            $('#changePassword a[name=change]').toggleClass("ui-disabled");
            return true;
        } else {
            $($(inputs[1]).context.parentElement).css('border', 'solid 2px red');
            $($(inputs[2]).context.parentElement).css('border', 'solid 2px red');
            label.html('La contraseña nueva no coincide');
        }
    }

    $scope.activeDesactiveLink = function(active, profiles) {
        if (active) {
            $('.security').each(function(index) {
                var roles = $(this).attr('data-security').split(',');
                for (var i in profiles) {
                    if (jQuery.inArray((profiles[i]), roles) != -1) {
                        $(this).attr('href', $(this).attr('id'));
                        $(this).css('opacity', 1);
                    }
                }
            });
        } else
            $('.security').each(function(index) {
                $(this).attr('href', '#');
                $(this).css('opacity', 0.3);
            });
    };

    $scope.recoveryPassword = function() {
        var user = $('#login-form input[name=user]');
        if (user.val() != '') {
           // $.mobile.showPageLoadingMsg();
            SecurityService.recoveryPassword(user.val()).
                    then(function(data) {
                        $.mobile.hidePageLoadingMsg();
                        showMessage("Para restablecer su contraseña ingrese a su correo: " +
                                data.data);
                    });
        }
    };
});
