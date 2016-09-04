'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('calendar', {
        url: '/calendar',
        templateUrl: 'js/calendar/calendar.template.html'
    });

});
