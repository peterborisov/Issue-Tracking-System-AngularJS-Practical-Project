angular.module('issueTracking.userController', [])
    .factory('userController', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {
        function registerUser(user) {
            var deferred = $q.defer();
            $http.post(BASE_URL + 'users/Register', user)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    console.log(error);
                });
            return deferred.promise;
        }

        function loginUser(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'users/Login', user)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function () {

                    });
                return deferred.promise;
        }

        function logout(user) {

        }

        return {
            registerUser: registerUser,
            loginUser: loginUser,
            logout: logout
        }
    }]);

