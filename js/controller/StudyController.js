var study = null;
var lastTitles = [];
var studyPath = [{title: 'HOME', path: '../homePage'},
    {title: 'OFERTA ACADEMICA', path: '../academicOffer'}];
app.controller('StudyController', function($rootScope, $scope, $location, $window, StudyService) {

    $scope.studies = [];
    $scope.title = null;
    $scope.eadstudies = [];
    $scope.titulo = null;

    $scope.init = function() {
        study = null;
        lastTitles = [];
        studyPath = [
            {title: 'HOME', path: '../homePage'},
            {title: 'OFERTA ACADEMICA', path: '../academicOffer'}
        ];
    };

    $scope.loadFaculties = function(studyType) {
        $scope.setTitle(studyType);
        $scope.studies = [];
        $scope.title.studyType = studyType;
        StudyService.getFacultyByStudyType(studyType).service().then(function(data) {
            var href = '../academicOffer/faculty/{0}/school/{1}';
            angular.forEach(data, function(value) {
                value.fullName = value.name;
                value.href = href.format(studyType, value.id);
                value.pos = 1;
            });
            $scope.studies = data;
            $scope.studyPath = studyPath;
        });
    };

    $scope.loadSchools = function(studyType, school) {
        $scope.setTitle(school);
        $scope.studies = [];
        StudyService.getSchoolByFaculty(school).service().then(function(data) {
            var href = '../academicOffer/faculty/{0}/school/{1}/study/{2}';
            angular.forEach(data, function(value) {
                value.fullName = value.name;
                value.href = href.format(studyType, school, value.id);
                value.pos = 2;
            });
            $scope.studies = data;
            $scope.studyPath = studyPath;
        });
    };

    $scope.loadStudies = function(studyType, school, study) {
        $scope.setTitle(study);
        StudyService.getStudyBySchool(study).service().then(function(data) {
            var href = '../academicOffer/faculty/{0}/school/{1}/study/{2}/detail/{3}';
            angular.forEach(data, function(value) {
                value.pos = 3;
                value.href = href.format(studyType, school, study, value.id);
            });
            $scope.studies = data;
            $scope.studyPath = studyPath;
        });
    };

    $scope.loadStudyDetail = function(studyType, school, st, detail) {
        $scope.studies.push(study);
        $scope.setTitle(detail);
        StudyService.findSubjectsByStudy(detail).service().then(function(data) {
            $scope.subjects = data;
        });
    };

    $scope.setTitle = function(param, click) {
        var t = null;
        if ($location.$$path.match('school')) {
            t = $scope.filterStudies('id', param);
            $scope.title = t ? t.name : '';
        } else if ($location.$$path.match('faculty')) {
            $scope.title = getStudyType(parseInt(param));
        }

        if ($scope.title === '')
            $scope.title = lastTitles.pop();

    };

    $scope.filterStudies = function(field, value) {
        for (var i = 0; i < $scope.studies.length; i++) {
            if ($scope.studies[i][field] == value)
                return $scope.studies[i];
        }
    };

    $scope.saveInContext = function(st, v) {
        if (v) {
            study = st;
            lastTitles.push($scope.title);
            studyPath[st.pos + 1] = ({
                title: $scope.title,
                path: '..' + $location.$$path
            });
        } else
            studyPath = [
                {title: 'HOME', path: '../homePage'},
                {title: 'OFERTA ACADEMICA', path: '../academicOffer'}
            ];
    };

    $scope.ajustPath = function(index) {
        studyPath.splice(index, studyPath.length - index);
    };

    $scope.ead = function() {
        if (Security.people)
            StudyService.findEaDStudyProfile(Security.people.id).service().then(function(data) {
                if (!data.isDebStudent) {
                    if (data.servers.length > 0) {
                        $scope.eadstudies = [];
                        for (var i = 0; i < data.servers.length; i++) {
                            $scope.eadstudies.push({
                                name: data.servers[i].description,
                                url: URL.EAD_LINK.format(Security.people.id, data.servers[i].serverId)
                            });
                        }
                       
                    } else
                        aler("Usted no posee estudios a distancia")
                } else {
                    alert("Usted esta moroso con sus estudios a distancia.")
                }
            });
    };

    $scope.collaborate = function() {
        if (Security.people)
            StudyService.findCollaborateStudyProfile(Security.people.id).service().then(function(data) {
                if (!data.isDebStudent) {
                    if (data.servers.length > 0) {
                        var ead = window.open(URL.EAD_LINK.format(Security.people.id, data.servers[0].serverId), 'EAD', 'scrollbars=1,toolbar=1,menubar=1,location=0,resizable=1,status=1');
                        if (window.focus) {
                            ead.focus()
                        }
                        //$window.open();
                    } else
                        showMessage("Usted no posee tareas virtuales.");
                } else {
                    showMessage("Usted esta moroso con sus estudios.");
                }
            });
    };
});

function btnStudiesBack() {
    studyPath.pop();
}
