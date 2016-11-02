'use strict';

app.config(function ($stateprovider) {

    // register our *campuses* state.
    $stateprovider.state('become-mentor', {
        url: '/become-a-mentor',
        controller: 'BecomeMentorCtrl',
        templateurl: 'js/become-mentor/become-mentor.template.html'
    });

});
