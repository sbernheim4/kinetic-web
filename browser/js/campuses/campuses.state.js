'use strict';

app.config(function ($stateProvider) {

    // Register our *campuses* state.
    $stateProvider.state('campuses', {
        url: '/campuses',
        controller: 'CampusesCtrl',
        templateUrl: 'js/campuses/campuses.template.html'
    });

});
