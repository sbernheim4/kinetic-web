'use strict'

app.controller('BecomeMentorCtrl', function ($scope, FormFactory) {
	$scope.wasFormSubmitted = false;
	$scope.requiredForForm = true;

	$scope.submitForm = function (user) {
		FormFactory.submitBecomeAMentorForm(user)
		.then ( res => {
			$scope.wasFormSubmitted = true;
		})
		.catch ( err => {
			console.error(err);
		})
	}
});
