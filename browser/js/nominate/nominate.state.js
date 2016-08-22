'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('nominate', {
        url: '/nominate-an-expert',
        templateUrl: 'js/nominate/nominate.template.html',
        controller: 'NominateCtrl'
    });

});
