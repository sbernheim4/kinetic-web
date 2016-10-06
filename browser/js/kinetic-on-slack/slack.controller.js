'use strict'

app.controller('SlackCtrl', function ($scope, FormFactory) {

	$scope.displayForm = true;

	$scope.submitJoinSlack = function (user) {
		if(typeof user === 'undefined') {
			return;
		}

		FormFactory.submitJoinSlackForm(user)
		.then ( () => {
			$scope.displayForm = false;
		})
		.catch (e => {
			console.error(e);
		});
	}
});
