'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('mission', {
        url: '/mission',
        templateUrl: 'js/mission/mission.template.html',
        controller: 'MissionCtrl'
    });

});