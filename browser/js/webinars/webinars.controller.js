'use strict';

app.controller('WebinarsCtrl', function($scope, FormFactory) {
	$scope.submitted = false;
	$scope.question = {};
	$scope.question.school = 'Amherst College';
	$scope.question.advisor = 'Daniel Thorne';
	$scope.submitQuestion = function(question) {
		$scope.submitted = true;
		FormFactory.submitAdvisorQuestion(question)
		.catch(err => {
			$scope.submitted = false;
		});
	};
});
