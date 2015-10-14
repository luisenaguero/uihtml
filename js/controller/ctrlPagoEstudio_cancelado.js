app.controller('ctrlPagoEstudio_cancelado', function ($scope, $http, Payments, $location, AuthSession, $localStorage) {
    if (($localStorage.StudyToken) && (AuthSession.isLogged() === true)) {
        $scope.pago_estudio = JSON.parse(atob(String($localStorage.StudyToken).replace(/\n/g, '')));
        delete $localStorage.StudyToken;
        alert('¡El pago de la inscripción ha sido cancelado! No te inscribiste en ' + $scope.pago_estudio.estudio.estudio + '.');
        $location.url("/inicio");
    } else {
        $location.url("/inicio");
    }
});