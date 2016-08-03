app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $window) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',

		link: function (scope) {
			scope.goToSection = function(val, state) {
				Promise.resolve()
				.then( () => {
					if (!state) {
						state = 'home';
					}
					if($state.current.name === state) {
						return;
					} else {
					return $state.go(state);
					}
				})
				.then( () => {
					if(val !== 'null') {
						smoothScroll(document.querySelector(val));
					}
				})
				.catch( err => {
					if(typeof trackJs !== 'undefined') {
						trackJs.track(err);
					}
					console.error(err)
				});
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
