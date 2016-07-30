app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',

		link: function (scope) {

			scope.goToSection = function(val, state) {
				// go to the state passed in through ng-click and then wait 100ms and then scroll to the right section
				// using setTimeout to override Node's asynchronosity and ensure that smoothScroll is only called after we have changed states
				// setTimeout should be at least 10ms to ensure it works on all computers

				// TODO: remove when all pages are built and a tags have correct params
				// if no state is passed in, go to the home page. This is just for development purposes
				if (state === null) {
					state = 'home';
				}
				$state.go(state)
				setTimeout( function() { smoothScroll(document.querySelector(val)) }, 100);
			};

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
