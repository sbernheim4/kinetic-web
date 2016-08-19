'use strict'

app.controller('HandbookCtrl', function ($scope) {
	$scope.submitGetHandbook = function (user) {
		user.newsletter = !!user.newsletter;



	}
});
