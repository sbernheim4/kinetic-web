app.directive('footer', function ($rootScope, AuthService, AUTH_EVENTS, $state, GoToSectionFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/footer/footer.html',

        link: function (scope) {
            scope.goToSection = GoToSectionFactory.goToSection;
            
            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                    $state.go('home');
                });
            };

            const setUser = function () {
                AuthService.getLoggedInUser()
                .then(function (user) {
                    scope.user = user;
                });
            };

            const removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
