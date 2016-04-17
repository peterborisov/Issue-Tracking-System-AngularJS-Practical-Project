'use strict';

app.controller('AdminController',
    function ($scope,
              $routeParams,
              $location,
              authenticationService,
              projectsService,
              adminService,
              usersService,
              notifyService) {

        if (!authenticationService.isAdmin()) {
            $location.path("/");
        }

        usersService.getAllUsers(
            function success(data) {
                $scope.allUsers = data;
            },
            function error(err) {
                notifyService.showError("Project loading failed", err);
            }
        );

        $scope.addProject = function (projectData, projectKey) {
            projectData.ProjectKey = projectKey;
            adminService.addNewProject(projectData,
                function success() {
                    notifyService.showInfo("Project added successfully");
                    $location.path("/projects");
                },
                function error(err) {
                    notifyService.showError("Project add failed", err);
                }
            )
        };

        $scope.setProjectKey = function (projectName) {
            var tokens = projectName.split(' ');
            var result = "";
            tokens.forEach(function (element) {
                result += element.substring(0, 1)
            });

            $scope.projectKey = result;
        }

    });