'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('supporters', {
    url: '/our-supporters',
    templateUrl: 'js/supporters/supporters.template.html'
  });

});
