'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('advisory', {
        url: '/advisory-network',
        templateUrl: 'js/advisory/advisory.template.html',
        controller: 'AdvisoryCtrl'
    });
});
