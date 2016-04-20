'use strict';

app.controller('ProjectsController', function ($scope,
                                               $routeParams,
                                               $location,
                                               authenticationService,
                                               projectsService,
                                               notifyService,
                                               issuesService) {

    projectsService.getAllProjects(
        function success(data) {
            $scope.allProjects = data;
        }
        // function error(err) {
        //     notifyService.showError("Projects loading failed", err);
        // }
    );

    projectsService.getProjectById($routeParams.id,
        function success(data) {
            $scope.projectData = data;
        },
        function error(err) {
            notifyService.showError("Project loading failed", err);
        }
    );
    issuesService.addIssue = function (issueData) {
        issuesService.addNewIssue(issueData,
            function success() {
                notifyService.showInfo("Issue added successfully");
                $location.path("/");
            },
            function error(err) {
                notifyService.showError("Issue add failed", err);
            }
        )
    };
    projectsService.addNewProject = function (projectData) {
        projectsService.addNewProject(projectData,
            function success() {
                notifyService.showInfo("Project added successfully");
                $location.path("#/projects");
            },
            function error(err) {
                notifyService.showError("Project add failed", err);
            }
        )
    }
});
