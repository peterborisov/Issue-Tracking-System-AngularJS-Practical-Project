'use strict';

app.factory('usersService', function ($http, BASE_URL, authenticationService) {
    return {
        getAllUsers: function (success, error) {
            var getAllUsersRequest = {
                method: 'GET',
                url: BASE_URL + 'users/',
                headers: authenticationService.getHeaders()
            };

            $http(getAllUsersRequest).success(success).error(error);
        }
    }
});