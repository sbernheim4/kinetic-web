app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $window, GoToSectionFactory) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',

		link: function (scope) {
			scope.goToSection = GoToSectionFactory.goToSection;
			scope.class = 'hide-menu';

			scope.displayWhatIs = true;
			scope.displayGetInvolved = true;
			scope.displayResources = true;
			scope.displayOurTeam = true;

			// This toggle menu is used for the hamburger icon and when to
			// display the titles of the dropdown menus
			scope.toggleMenu = function () {
				if (scope.class == 'hide-menu') {
					scope.class = 'show-menu';
				} else {
					scope.class='hide-menu';
				}
			}

			// This toggle function is used for the mobile nav-bar lists
			scope.toggle = function (val) {
				if (val == "displayWhatIs") {
					scope.displayWhatIs = !scope.displayWhatIs;
					scope.displayGetInvolved = true;
					scope.displayResources = true;
					scope.displayOurTeam = true;
				} else if (val == "displayGetInvolved") {
					scope.displayGetInvolved = !scope.displayGetInvolved;
					scope.displayWhatIs = true;
					scope.displayResources = true;
					scope.displayOurTeam = true;
				} else if (val == "displayResources") {
					scope.displayResources = !scope.displayResources;
					scope.displayWhatIs = true;
					scope.displayGetInvolved = true;
					scope.displayOurTeam = true;
				} else if (val == "displayOurTeam") {
					scope.displayOurTeam = !scope.displayOurTeam;
					scope.displayWhatIs = true;
					scope.displayGetInvolved = true;
					scope.displayResources = true;
				}
			}

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
