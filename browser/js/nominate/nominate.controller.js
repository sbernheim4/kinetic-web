'use strict';

app.controller('NominateCtrl', function($scope, FormFactory) {
		$scope.formSubmitted = false;

		$scope.submitForm = function(data) {
			
			data.newsletter = !!data.newsletter;
			data.knowsNominee = !!data.knowsNominee;
			data.isNominee = !!data.isNominee;

			FormFactory.submitExpertNominationForm(data)
			.then(function() {
				$scope.formSubmitted = true;
			})
			.catch(e => {
				console.error(e);
			});
		}
});