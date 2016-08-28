'use strict'

app.controller('HandbookCtrl', function ($scope, FormFactory) {

	$scope.displayForm = true;

	$scope.submitGetHandbook = function (user) {
		if(typeof user === 'undefined') {
			return;
		}
		user.newsletter = !!user.newsletter;
		FormFactory.submitGetHandbookForm(user)
		.then ( () => {
			$scope.displayForm = false;
		})
		.catch (e => {
			console.error(e);
		});

	}
});
