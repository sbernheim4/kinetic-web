'use strict'

app.controller('HandbookCtrl', function ($scope, FormFactory) {

	$scope.show = true;

	$scope.submitGetHandbook = function (user) {
		user.newsletter = !!user.newsletter;

		FormFactory.submitGetHandbookForm(user)
		.then ( () => {
			$scope.show = false;
		})
		.catch (e => {
			console.log(e);
		});

	}
});
