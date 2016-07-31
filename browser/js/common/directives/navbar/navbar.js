app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $window) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',

		link: function (scope) {
			var temp = 0;
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
					// temp = $window.pageYOffset;
					// $window.pageYOffset -= 58;
					smoothScroll(document.querySelector(val));
				});
				// .then( () => {
					// setTimeout(function() {
						// $window.pageYOffset = window.scrollY;
					// } , 500);
				// });
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
