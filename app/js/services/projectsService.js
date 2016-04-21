'use strict';

app.factory('projectsService',['$http','BASE_URL','authenticationService',
    function ($http, BASE_URL,authenticationService) {

        var projectsService = {};

        projectsService.getAllProjects = function(){
            return $http({
                url :  "http://softuni-issue-tracker.azurewebsites.net/projects",
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        projectsService.getProjectById = function(id){
            return $http({
                url : BASE_URL + "/Project/"+ id,
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        projectsService.addProject = function(projectData){
            return $http({
                url : BASE_URL + "/Project",
                method : "POST",
                headers: authenticationService.getHeaders(),
                data: projectData
            });
        };

        projectsService.editProject = function(id , projectData){
            return $http({
                url : BASE_URL + "/Project/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : projectData
            });
        };

        return projectsService;
    }]);