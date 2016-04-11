angular.module('issueTracking.home', ['issueTracking.userController'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', ['$scope', 'userController',
        function ($scope, userController) {
            $scope.login = function (user) {
                userController.loginUser(user)
            };
            $scope.register = function (user) {
                userController.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser)
                    })
            }
        }]);
