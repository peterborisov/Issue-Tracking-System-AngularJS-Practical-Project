app.controller('AuthenticationController',
    function ($scope, $location, $rootScope, authenticationService, notifyService, $localStorage) {
        $scope.isLogged = authenticationService.isLoggedIn();
        if ($scope.isLogged) {
            $scope.userData = function () {
                authenticationService.getCurrentUserData().then(
                    function (userData) {
                        $scope.userData = userData;
                    },
                    function (error) {
                        notifyService.showError('Unable to get current user data ' + error.data.message);
                    }
                );
            }
        }

        $scope.register = function (userData) {
            authenticationService.register(userData).then(
                function success(serverData) {
                    notifyService.showInfo('Successfully registered ');
                    authenticationService.setCredentials(serverData.data);
                    $location.path("/");
                },
                function error(error) {
                    notifyService.showError("Unable to register " + error.data.message);
                }
            );
        };

        $scope.login = function (userData) {
            authenticationService.login(userData).then(
                function success(serverData) {
                    authenticationService.setCredentials(serverData.data);
                    notifyService.showInfo("Hello, " + $localStorage.currentUser.userName);
                    $location.path("/home");
                },
                function error(error) {
                    notifyService.showError('Unsuccessful login ' + error.data.message);
                }
            );
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    notifyService.showInfo('Goodbye, ' + $localStorage.currentUser.userName);
                    authenticationService.clearCredentials(serverData.data);
                    $location.path('/');
                },
                function error(error) {
                    notifyService.showError("Unable to logout " + error.data.message);
                }
            );
        };

        $scope.changePassword = function (userData) {
            authenticationService.changePassword(userData).then(
                function success() {
                    notifyService.showInfo('Your password has been successfully changed');
                    $location.path('/dashboard');
                },
                function error(error) {
                    notifyService.showError('Unable to change password. ' + error.data.message);
                }
            )
        };

        $scope.getAllUsers=function () {
            if (authenticationService.isAuthenticated()) {
                usersService.getAllUsers()
                    .then(function(users) {
                        $scope.allUsers = users;
                    });
            }
        };

        $scope.getUserFullData = function getUserFullData() {
            authenticationService.getUserFullData($routeParams.username).then(
                function (userData) {
                    $scope.username=userData.username;
                    $scope.userFullData = userData.data;
                    $location.path('/');
                },
                function (error) {
                    notifyService.showError('Unable to show user data' + error.data.message);
                }
            )
        };

    });