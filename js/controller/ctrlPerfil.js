app.controller('ctrlPerfil', function (personaService, $window, $scope, AuthSession, $mdDialog, $http) {
    if (AuthSession.getUserToken() === null) {
        console.log("THERE'S NO USER LOGGED IN");
        $window.location.href = '#/inicio.html';
    } else {
        $scope.open = true;
        $scope.persona = AuthSession.getUser();

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
        }

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
            })
        };

        //PopUp para cambiar contraseña
        $scope.showChangeP = function (ev) {
            $mdDialog.show({
                controller: 'ctrlPerfil',
                templateUrl: './templates/popup/cambiar-contrasena.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        };

        $scope.update = function () {
            personaService.modificarPerfil(JSON.stringify($scope.persona), function (response) {
                console.log(response);
                AuthSession.clearStorage();
//                AuthSession.updateProfile("TOKENUSER", window.btoa(JSON.stringify($scope.persona)));
//                $scope.persona = AuthSession.getUser();
//                console.log(JSON.stringify($scope.persona));
                $window.location.reload();
            }, function (error) {
                console.log("ERROR");
                console.log(error);
                
            }
            );
            
//            $http({
//                method: 'POST',
//                url: 'http://10.200.36.29:8080/urbe-api-intern/rest/1.0/people/updatePeople',
//                data: JSON.stringify($scope.persona)
//            }).success(function (data) {
//                console.log(JSON.stringify(data));
//                console.log($scope.persona);
//                $window.location.reload();
////            console.log("exito");
//            }).error(function (data) {
////            console.log(JSON.stringify(data));
//                console.log($scope.persona);
//            })
        };
    }
})