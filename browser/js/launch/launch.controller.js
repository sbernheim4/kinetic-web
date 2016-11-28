'use strict';

app.controller('LaunchCtrl', function($scope, FormFactory) {

  $scope.show = true;

  $scope.submitForm = function (user) {
    // Evaluates the truthfulness of user.newsletter
    if(typeof user === 'undefined') {
      return;
    }
    user.newsletter = !!user.newsletter;

    // send all the data to our FormFactory and then log it in the console.
    FormFactory.submitLaunchAChapterForm(user)
    .then( () => {
      $scope.show = false;
    })
    .catch( e => {
      console.error(e);
    });

  }
});
