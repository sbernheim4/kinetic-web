'use strict';

app.controller('LaunchCtrl', function($scope) {

	$scope.name='';
	$scope.email='';
	$scope.school='';
	$scope.classYear='';
	$scope.questions='';
	$scope.newsletter='';

	$scope.submitFunc = function () {
		$scope.name = this.user.name;
		$scope.email = this.user.email;
		$scope.school = this.user.school;
		$scope.classYear = this.user.classYear;
		$scope.questions = this.user.questions;
		$scope.newsletter = this.user.newsletter;


		// If the checkbox is never clicked, then it has a value of undefined instead of false.
		// Here I'm saying if the value is not true it must be false to avoid a null value being
		// passed to mongodb
		if ($scope.newsletter !== true) {
			$scope.newsletter = false;
		}

		// creating JSON object to send to mongodb
		var launch = [
			{'name' : $scope.name},
			{'email' : $scope.email},
			{'school' : $scope.school},
			{'classYear' : $scope.classYear},
			{'questions' : $scope.questions},
			{'newsletter' : $scope.newsletter}
		]

		// Is this what I would do to then use express to catch this URL being hit?
		// $http.post('/get-launch-a-chapter-info', {data: launch});
	}
});
