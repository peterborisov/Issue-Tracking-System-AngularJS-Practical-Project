'use strict';

app.controller('ProjectsController', function ($scope,
                                               $routeParams,
                                               $location,
                                               authenticationService,
                                               projectsService,
                                               notifyService,
                                               usersService,
                                               issuesService) {
  
    projectsService.getAllProjects(
        function success(data) {
            $scope.allProjects = data;
        },
        function error(err) {
            notifyService.showError("Projects loading failed", err);
        }
    );

    projectsService.getProjectById($routeParams.id,
        function success(data) {
            $scope.projectData = data;
        },
        function error(err) {
            notifyService.showError("Project loading failed", err);
        }
    );

    usersService.getAllUsers(
        function success(data) {
            $scope.users = data;
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
    $scope.addIssue = function (issueData) {
        var labelsList = [];

        var stringLabels = issueData.Labels.split(', ');
        stringLabels.forEach(function (element) {
            labelsList.push({Name: element.trim()})
        });

        issueData.Labels = labelsList;
        issueData.PriorityId = parseInt(issueData.PriorityId);
        issueData.ProjectId = parseInt(issueData.ProjectId);

        issuesService.addNewIssue(issueData,
            function success() {
                notifyService.showInfo("Issue added successfully");
                $location.path("/");
            },
            function error(err) {
                notifyService.showError("Issue add failed", err);
            }
        )
    }
});