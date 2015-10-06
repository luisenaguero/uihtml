/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('moodleController',
        function ($http, $scope) {

            $scope.server = "https://urbe-api.urbe.edu/urbe-api-ext/rest/1.0/internacional/" + Security.people.id;
            $scope.moodleserver = ""
            alert($scope.server);

            $http.get($scope.server).success(
                    function (response) {

                        $scope.moodle = response;

                    });

            


        });
