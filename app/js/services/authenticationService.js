'use strict';

app.factory('authenticationService', function ($http, BASE_URL, $localStorage,$q) {
    var authenticationService = {};

    authenticationService.setCredentials = function (data) {
        $localStorage.currentUser = data;
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
    };

    authenticationService.getCurrentUserData = function () {
        return $http({
            method: 'GET',
            url: BASE_URL + 'users/me',
            headers: this.getHeaders()
        })

    };

    authenticationService.login = function (user) {
        return $http({
            method: 'POST',
            url: BASE_URL + 'api/Token',
            data: "userName=" + user.username + "&password=" + user.password +
            "&grant_type=password"
        })
    };

    authenticationService.register = function (user) {
        var deferred = $q.defer();

        $http.post(BASE_URL+'api/Account/Register',user)
            .then(function(success){
                deferred.resolve(success.data);
            }, function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    };

    authenticationService.logout = function () {
        return $http({
            method: 'POST',
            url: BASE_URL + 'api/Account/Logout',
            headers: this.getHeaders()
        });
    };

    authenticationService.changePassword = function (userData) {
        return $http({
            method: 'POST',
            url: BASE_URL + 'api/Account/ChangePassword',
            data: userData,
            headers: this.getHeaders()
        });
    };


    return authenticationService;
});