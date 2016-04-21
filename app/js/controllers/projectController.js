app.controller('ProjectsController', [
    '$scope',
    '$location',
    'authenticationService',
    'projectsService',
    'pageSize',
    function ($scope, $location, authenticationService, projectService,pageSize) {

        $scope.projectParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $scope.reloadProjects = function() {
            projectService.getAllProjects(
                $scope.projectParams,
                function success(data) {
                    console.log(data);
                    $scope.projects = data;
                },
                function error(err) {
                    notifyService.showError("Can't load projects" + err)
                }
            );
        };
        $scope.reloadProjects();
    }]);