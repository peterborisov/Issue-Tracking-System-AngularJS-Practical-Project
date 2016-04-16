app.controller('AuthenticationController',
    function ($scope, $location, $rootScope, authenticationService, notifyService, $localStorage, usSpinnerService) {
        $scope.isLogged = authenticationService.isLoggedIn();
        if ($scope.isLogged) {
            $scope.userData = function () {
                usSpinnerService.spin('spinner-1');
                authenticationService.getCurrentUserData().then(
                    function (userData) {
                        usSpinnerService.stop('spinner-1');
                        $scope.userData = userData;
                    },
                    function (error) {
                        notifyService.showError('Unable to get current user data ' + error.data.message);
                        usSpinnerService.stop('spinner-1');
                    }
                );
            }
        }

        $scope.register = function (userData) {
            usSpinnerService.spin('spinner-1');
            authenticationService.register(userData).then(
                function success(serverData) {
                    usSpinnerService.stop('spinner-1');
                    notifyService.showInfo('Successfully registered');
                    authenticationService.setCredentials(serverData.data);
                    $location.path("/");
                },
                function error(error) {
                    notifyService.showError("Unable to register " + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            );
        };

        $scope.login = function (userData) {
            usSpinnerService.spin('spinner-1');
            authenticationService.login(userData).then(
                function success(serverData) {
                    usSpinnerService.stop('spinner-1');
                    authenticationService.setCredentials(serverData.data);
                    notifyService.showInfo("Hello, " + $localStorage.currentUser.userName);
                    $location.path("/home");
                },
                function error(error) {
                    notifyService.showError('Unsuccessful login ' + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            );
        };

        $scope.logout = function () {
            usSpinnerService.spin('spinner-1');
            authenticationService.logout().then(
                function success(serverData) {
                    usSpinnerService.stop('spinner-1');
                    notifyService.showInfo('Goodbye, ' + $localStorage.currentUser.userName);
                    authenticationService.clearCredentials(serverData.data);
                    $location.path('/');
                },
                function error(error) {
                    notifyService.showError("Unable to logout " + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            );
        };

        $scope.changePassword = function (userData) {
            usSpinnerService.spin('spinner-1');
            authenticationService.changePassword(userData).then(
                function success() {
                    usSpinnerService.stop('spinner-1');
                    notifyService.showInfo('Your password has been successfully changed');
                    $location.path('/home');
                },
                function error(error) {
                    notifyService.showError('Unable to change password. ' + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            )
        };

        $scope.getAllUsers = function (userData) {
            usSpinnerService.spin('spinner-1');
            authenticationService.getAllUsers(userData).then(
                function success() {
                    usSpinnerService.stop('spinner-1');
                    notifyService.showInfo('All users');
                    $location.path('/');
                },
                function error(error) {
                    notifyService.showError('Unable to get all users ' + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            )
        };

        $scope.getUserFullData = function getUserFullData() {
            usSpinnerService.spin('spinner-1');
            authenticationService.getUserFullData($routeParams.username).then(
                function (userData) {
                    $scope.username=userData.username;
                    $scope.userFullData = userData.data;
                    usSpinnerService.stop('spinner-1');
                    $location.path('/');
                },
                function (error) {
                    notifyService.showError('Unable to show user data' + error.data.message);
                    usSpinnerService.stop('spinner-1');
                }
            )
        };

    });