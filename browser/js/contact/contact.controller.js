'use strict';

app.controller('ContactCtrl', function ($scope, FormFactory) {
  $scope.wasFormSubmitted = false;

  $scope.submitForm = function (user) {
    if(!user || !user.email || !user.message) {
      return;
    }

    user.newsletter = !!user.newsletter;

    FormFactory.submitContactUsForm(user)
    .then( () => {
      $scope.wasFormSubmitted = true;
    })
    .catch( err => {
      console.error(err);
    });

  };
});
