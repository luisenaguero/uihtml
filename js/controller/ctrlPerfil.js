app.controller('ctrlPerfil', function (personaService, $window, $scope, AuthSession, $mdDialog, $http) {
    if (AuthSession.getUserToken() === null) {
        console.log("THERE'S NO USER LOGGED IN");
        $window.location.href = '#/inicio.html';
    } else {
        $scope.open = true;
        $scope.persona = AuthSession.getUser();
        console.log($scope.persona);

        var birthday = new Date($scope.persona.fechaNacimiento);
        $scope.persona.fechaNacimiento = birthday.format("yyyy-mm-dd");
        var registerD = new Date($scope.persona.fechaRegistro);
        $scope.persona.fechaRegistro = registerD.format("yyyy-mm-dd");
        var updateDate = new Date($scope.persona.fechaActualiza);
        $scope.persona.fechaActualiza = updateDate.format("yyyy-mm-dd");

        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'right'
        };

        $scope.dataShow = function () {
            //console.log($scope.open);
            if ($scope.open) {
                $scope.open = false;
                jQuery("#pContent").slideUp("slow");
                //console.log($scope.open);
            } else {
                $scope.open = true;
                jQuery("#pContent").slideDown("slow");
                //console.log($scope.open);
            }
        };

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


        $http({
            method: 'GET',
            url: dir.DATOS_PERSONALES,
            headers: {'entity': 'estado_civil', 'X-Authorization': AuthSession.getUserToken()}
        }).success(function (data) {
            console.log(data);
            $scope.estados = data;
        });

        //PopUp para modificar el perfil
        $scope.showEditP = function (ev) {
            $mdDialog.show({
                controller: 'ctrlPerfil',
                templateUrl: './templates/popup/modificar-perfil.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        //PopUp para cambiar contraseña
        $scope.showChangeP = function (ev) {
            $mdDialog.show({
                controller: 'ctrlPerfil',
                templateUrl: './templates/popup/cambiar-contrasena.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        //PopUp para cambiar foto
        $scope.showChangeF = function (ev) {
            $mdDialog.show({
                controller: 'ctrlPerfil',
                templateUrl: './templates/popup/cambiar-foto.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        $scope.uploadPhoto = function (files) {

            var val = $("#user_profile_pic").val();
            switch (val.substring(val.lastIndexOf('.') + 1).toLowerCase()) {
                case 'gif':
                case 'jpg':
                case 'png':
                    var fd = new FormData();
                    fd.append("file", files[0]);
                    personaService.cambiarFoto((fd, $scope.persona.id), function (response) {
                        console.log(response);
                        $window.location.reload();
                    });
                    //            $http.post(uploadUrl, {fd, $scope.persona.id}, {
                    //            withCredentials: true,
                    //                    headers: {'Content-Type': undefined },
                    //                    transformRequest: angular.identity
                    //            });
                    break;
                default:
                    $(this).val('');
                    // error message here
                    alert("Esto no es una imagen");
                    break;
            }
        };

        $scope.update = function () {
            personaService.modificarPerfil(JSON.stringify($scope.persona), function (response) {
                console.log(response);
                AuthSession.update("TOKENUSER", window.btoa(JSON.stringify($scope.persona)));
                $window.location.reload();
            }, function (error) {
                console.log("ERROR");
                console.log(error);
            }
            );
        };
    }
});