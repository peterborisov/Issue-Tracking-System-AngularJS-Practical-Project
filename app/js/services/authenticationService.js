'use strict';

app.factory('authenticationService', function ($http, BASE_URL, $localStorage) {
    var authenticationService = {};

    authenticationService.setCredentials = function (serverData) {
        $localStorage.currentUser = serverData;
    };

    authenticationService.clearCredentials = function () {
        $localStorage.$reset();
    };

    authenticationService.isLoggedIn = function () {
        return $localStorage.currentUser != undefined;
    };

    authenticationService.isAdmin = function () {
        var currentUser = this.getCurrentUserData();
        return (currentUser != undefined) && (currentUser.isAdmin);
    };

    authenticationService.getHeaders = function () {
        return {
            Authorization: "Bearer " + $localStorage.currentUser.access_token
        };
    };
    authenticationService.isAuthenticated=function () {
        
        return sessionStorage['access_token'] != null;
    }
    authenticationService.getCurrentUserData = function () {
        return $http({
            method: 'GET',
            url: BASE_URL + 'Account/UserInfo',
            headers: this.getHeaders()
        })
    };
    
    authenticationService.getAllUsers = function () {
        return $http({
            method: 'GET',
            url: BASE_URL + 'users',
            headers: this.getHeaders()
        })
    };

    authenticationService.login = function (user) {
        return $http({
            method: 'POST',
            url: BASE_URL + 'Token',
            data: "userName=" + user.username + "&password=" + user.password +
            "&grant_type=password"
        })
    };

    authenticationService.register = function (userData) {
        return $http({
            method: 'POST',
            url: BASE_URL + 'Account/Register',
            data: userData
        })
    };

    authenticationService.logout = function () {
        return $http({
            method: 'POST',
            url: BASE_URL + 'Account/Logout',
            headers: this.getHeaders()
        });
    };

    authenticationService.changePassword = function (userData) {
        return $http({
            method: 'POST',
            url: BASE_URL + 'Account/ChangePassword',
            data: userData,
            headers: this.getHeaders()
        });
    };

   
    return authenticationService;
});
