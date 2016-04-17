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
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'AuthenticationController'
        })
        .when('/dashboard-admin', {
            templateUrl: 'views/dashboard-admin.html',
            controller: 'AuthenticationController'
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
        .when('/users/me', {
            templateUrl: 'views/user/currentUser.html',
            controller: 'AuthenticationController'
        })
        .when('/users', {
            templateUrl: 'views/user/get-all-users.html',
            controller: 'AuthenticationController'
        })
        .when('/projects', {
            templateUrl: 'views/project/all-projects.html',
            controller: 'ProjectsController'
        })
        .when('/projects/add', {
            templateUrl: 'views/project/Add-new-project.html',
            controller: 'ProjectsController'
        })
        .when('/issues/add', {
            templateUrl: 'views/issue/Add-new-issue.html',
            controller: 'ProjectsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
