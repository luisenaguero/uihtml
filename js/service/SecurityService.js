app.service('SecurityService', function ($http) {

    this.login = function (user, password) {
        Security.user = user;
        Security.password = password;
        return new getStore($http, URL.LOGIN, null, true);
    };

    this.mudul = function(persona){
       
       return new moodleVerification($http, URL.MOODLE_INT,persona);
    }

    this.profileImage = function (peopleId) {
        return new getStore($http, URL.IMAGE_PEOPLE.format(peopleId));
    };

    this.changePassword = function (identification, newPassword, oldPassword) {
        var promise;
        var form = $.param({"identification": identification,
            "password": newPassword,
            "current_password": oldPassword});
        promise = $http.post(url + URL.CHANGE_PASSWORD, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': Security.user + ':' + Security.password
            }
        });
        return promise;
    };

    this.recoveryPassword = function (identification) {
        var promise;
        promise = $http.get(url + URL.RECOVERY_PASSWORD.format(identification), null, {});
        return promise;
    };

    this.logout = function () {
        var promise;
        promise = $http.post(url + URL.LOGOUT, null, {
            headers: {
                'Authorization': Security.user + ':' + Security.password
            }
        });
        return promise;
    };
});


