'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('advisory', {
        url: '/advisors',
        templateUrl: 'js/advisory/advisory.template.html',
        controller: 'AdvisoryCtrl'
    });
});
