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
	}

});
