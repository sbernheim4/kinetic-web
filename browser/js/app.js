'use strict';
window.app = angular.module('KineticApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

	console.log($state);

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

	// if the $stateNotFound event is broadcasted either as the result of either
	// a ui-sref call or $state.go from anywhere, then redirect the user to the
	// 404 page
	$rootScope.$on('$stateNotFound', function() {
		$state.go('404');
	});

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

	// on a successful state change, have the browser scroll to the top of the page
	$rootScope.$on('$stateChangeSuccess', function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});

});
