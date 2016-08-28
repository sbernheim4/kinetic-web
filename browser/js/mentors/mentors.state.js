'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('mentors', {
        url: '/issue-team-mentors',
        templateUrl: 'js/mentors/mentors.template.html',
        controller: 'MentorsCtrl'
    });
});
