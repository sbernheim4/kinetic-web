'use strict';

app.controller('SignupCtrl', function($scope, UserFactory, $state, AuthService) {
	$scope.signup = function(account) {

		UserFactory.createUser(account)
		.then(data => {
			return AuthService.login(account);
		})
		.then( () => {
			$state.go('home');
		})
		.catch(err => {
			$scope.error = err;
			console.log(err);
		});
	};
});