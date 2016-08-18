'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('contact', {
        url: '/contact-us',
        templateUrl: 'js/contact/contact.template.html',
        controller: 'ContactCtrl'
    });
});
