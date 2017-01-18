'use strict';

app.controller('SignupCtrl', function($scope, UserFactory, $state, AuthService) {
	$scope.signup = function(account) {

		/**
		Goes to the UserFactory, which makes a post request to the backend to create a user.
		If the promise resolves, it will attempt to log the user in using AuthService.
		If that resolves, then the app will go to the home state.
		If any part of this breaks, the error will be shown to the user
		**/
		UserFactory.createUser(account)
		.then(() => {
			return AuthService.login(account);
		})
		.then( () => {
			$state.go('home');
		})
		.catch(err => {
			$scope.error = err.data;
			console.log(err);
		});
	};
});
