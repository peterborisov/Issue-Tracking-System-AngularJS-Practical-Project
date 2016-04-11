'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracking', [
    'ngRoute',
    'issueTracking.home',
    'issueTracking.userController'
]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');