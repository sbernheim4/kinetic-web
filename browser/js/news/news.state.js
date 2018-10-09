'use strict'

app.config(function ($stateProvider) {

    $stateProvider.state('news', {
        url: '/news',
        templateUrl: 'js/news/news.template.html'
    });
});
