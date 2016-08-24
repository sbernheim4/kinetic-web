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
			console.log('WEEEE s')
		})
		.catch (e => {
			console.log(e);
		});

	}
});
