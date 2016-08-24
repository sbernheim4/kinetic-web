'use strict'

app.controller('HandbookCtrl', function ($scope, FormFactory) {

	$scope.show = true;

	$scope.submitGetHandbook = function (user) {
		if(typeof user === 'undefined') {
			return;
		}

		user.newsletter = !!user.newsletter;

		FormFactory.submitGetHandbookForm(user)
		.then ( () => {
			$scope.show = false;
		})
		.catch (e => {
			console.error(e);
		});

	}
});
