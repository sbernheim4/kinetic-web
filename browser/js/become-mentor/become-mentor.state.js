'use strict';

app.config(function ($stateProvider) {

    // register our *become-mentor* state.
    $stateProvider.state('become-mentor', {
        url: '/become-a-mentor',
        templateUrl: 'js/become-mentor/become-mentor.template.html',
        controller: 'BecomeMentorCtrl'
    });

});
