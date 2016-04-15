'use strict';

app.factory('projectsService', function ($http, BASE_URL, authenticationService) {
    return {
        getAllProjects: function (success, error) {
            var getAllProjectsRequest = {
                method: 'GET',
                url: BASE_URL + 'projects',
                headers: authenticationService.getHeaders()
            };

            $http(getAllProjectsRequest).success(success).error(error);
        },

        getProjectById: function (id, success, error) {
            if (id) {
                var getProjectRequest = {
                    method: 'GET',
                    url: BASE_URL + 'projects/' + id,
                    headers: authenticationService.getHeaders()
                };
                $http(getProjectRequest).success(success).error(error);
            }
        },

        getLabels: function (success, error) {
            var getLabelsRequest = {
                method: 'GET',
                url: BASE_URL + 'labels/?filter=',
                headers: authenticationService.getHeaders()
            };
            $http(getLabelsRequest).success(success).error(error);
        },

        isAdmin: function () {
            var currentUser = authenticationService.getCurrentUserData();
            return (currentUser != undefined) && (currentUser.isAdmin);
        }

    }
});