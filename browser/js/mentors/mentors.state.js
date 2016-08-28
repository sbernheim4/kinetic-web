'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('mentors', {
        url: '/issue-mentors',
        templateUrl: 'js/mentors/mentors.template.html',
        controller: 'MentorsCtrl'
    });
});
