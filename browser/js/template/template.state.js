'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('template', {
    url: '/kinetic-template',
    templateUrl: 'js/template/template.template.html'
  });
});
