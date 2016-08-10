'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('advisors', {
        url: '/issue-advisors',
        templateUrl: 'js/advisors/advisors.template.html',
        controller: 'AdvisorsCtrl'
    });
});
