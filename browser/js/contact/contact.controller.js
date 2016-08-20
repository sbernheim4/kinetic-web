'use strict';

app.controller('ContactCtrl', function ($scope, FormFactory) {
  $scope.submitForm = function (user) {
  	if(!user || !user.email || !user.message) {
  		return;
  	}
  	
  	user.newsletter = !!user.newsletter;

  	FormFactory.submitContactUsForm(user)
  	.then( res => {
  		console.log('success');
  		console.log(res)
  	})
  	.catch( err => {
  		console.error(err);
  	});

  };
});
