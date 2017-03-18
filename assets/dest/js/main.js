"use strict";

var app = angular.module('WiskasPageApp', []);

app.controller('userCtrl', function ($scope, $http) {
    $scope.users = [];
    $http.get('https://api.myjson.com/bins/1c49zf').success(function (response) {
        $scope.users = response;
    });
});