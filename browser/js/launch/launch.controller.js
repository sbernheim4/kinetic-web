'use strict';

app.controller('LaunchCtrl', function($scope, FormFactory) {

	$scope.show = true;

	$scope.submitForm = function (user) {
		// Evaluates the truthfulness of user.newsletter
		user.newsletter = !!user.newsletter;

		// send all the data to our FormFactory and then log it in the console.
		FormFactory.submitLaunchAChapterForm(user)
		.then( () => {
			$scope.show = false;
		})
		.then( data => {
			console.log(data)
		})
		.catch( e => {
			console.log(e);
		});

	}
});