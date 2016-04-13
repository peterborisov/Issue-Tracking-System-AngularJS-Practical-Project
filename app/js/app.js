'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('issueTracking', ['ngRoute', 'ngResource', 'naif.base64', 'ngStorage',
        'angularSpinner', 'rt.popup', 'infinite-scroll'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/user/dashboard.html',
            controller: 'HomeController'
        })
        .when('/', {
            templateUrl: 'views/home.html',

        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthenticationController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthenticationController'
        })
        .when('/logout', {
            templateUrl: 'views/home.html',
            controller: 'AuthenticationController'
        })
        .when('/profile/change-password', {
            templateUrl: 'views/user/change-password.html',
            controller: 'AuthenticationController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
