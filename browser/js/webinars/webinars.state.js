'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('webinars', {
    url: '/webinars',
    controller: 'WebinarsCtrl',
    templateUrl: 'js/webinars/webinars.template.html'
  });
});
