'use strict';
app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('forum');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
