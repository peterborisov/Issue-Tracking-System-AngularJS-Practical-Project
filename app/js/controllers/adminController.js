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

        $scope.searchChar = '';
        $scope.autoComplete = function () {
            projectsService.getLabels(
                function success(data) {
                    $scope.labelsList = [];
                    data.forEach(function (label) {
                        $scope.labelsList.push(label.Name)
                    });

                    $scope.labelsList = $scope.labelsList.filter(function (e) {
                        return e.indexOf($scope.searchChar) !== -1;
                    });
                },
                function error(err) {
                    notifyService.showError("labels loading failed", err);
                });
        };

        $scope.addProject = function (projectData, projectKey) {
            var labelsList = [];
            var prioritiesList = [];

            var stringLabels = projectData.Labels.split(', ');
            stringLabels.forEach(function (element) {
                labelsList.push({Name: element.trim()})
            });

            var stringPriorities = projectData.Priorities.split(', ');
            stringPriorities.forEach(function (element) {
                prioritiesList.push({Name: element.trim()})
            });

            projectData.ProjectKey = projectKey;
            projectData.Priorities = prioritiesList;
            projectData.Labels = labelsList;

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