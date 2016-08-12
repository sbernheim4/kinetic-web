'use strict';

app.controller('LaunchCtrl', function($scope, FormFactory) {

	$scope.submitForm = function (user) {
		user.newsletter = !!user.newsletter;

		FormFactory.submitLaunchAChapterForm(user)
		.then( data => {
			console.log(data)
		})
		.catch( e => {
			console.log(e);
		});

	}
});
