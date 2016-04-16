'use strict';

app.factory('adminService', function ($http, baseServiceUrl, authenticationService) {
    return {
        addNewProject: function (projectData, success, error) {
            var addProjectsRequest = {
                method: 'POST',
                url: BASE_URL + 'projects',
                headers: authenticationService.getHeaders(),
                data: projectData
            };
            $http(addProjectsRequest).success(success).error(error);
        }
    }
});