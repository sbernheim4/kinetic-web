app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $window, GoToSectionFactory) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',

		link: function (scope) {
			scope.goToSection = GoToSectionFactory.goToSection;

			scope.displayWhatIs = true;
			scope.displayGetInvolved = true;
			scope.displayResources = true;
			scope.displayOurTeam = true;

			/* Toggle the menu button to display the nav bar headers
			*
			* When the hamburger icon is clicked, this function runs and the class 'active' is
			* added which contains the animation and display css
			*/
			scope.toggleMenu = function() {
				const menu = document.querySelector('.big-container');
				menu.classList.toggle('active');
			}

			// This toggle function is used for the mobile nav-bar lists
			scope.toggle = function (val) {
				const dropdownOne = document.querySelector('.what-is-kinetic');
				const dropdownTwo = document.querySelector('.get-involved');
				const dropdownThree = document.querySelector('.resources');
				const dropdownFour = document.querySelector('.our-team');

				const vals = [dropdownOne, dropdownTwo, dropdownThree, dropdownFour];

				const menu = document.querySelector('.big-container');

				if (val == "displayWhatIs") {
					dropdownTwo.classList.remove('display');
					dropdownThree.classList.remove('display');
					dropdownFour.classList.remove('display');
					dropdownOne.classList.toggle('display');
				} else if (val == "displayGetInvolved") {
					dropdownOne.classList.remove('display');
					dropdownThree.classList.remove('display');
					dropdownFour.classList.remove('display');
					dropdownTwo.classList.toggle('display');
				} else if (val == "displayResources") {
					dropdownOne.classList.remove('display');
					dropdownTwo.classList.remove('display');
					dropdownFour.classList.remove('display');
					dropdownThree.classList.toggle('display');
				} else if (val == "displayOurTeam") {
					dropdownOne.classList.remove('display');
					dropdownTwo.classList.remove('display');
					dropdownThree.classList.remove('display');
					dropdownFour.classList.toggle('display');
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
