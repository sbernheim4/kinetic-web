'use strict'

app.config(function ($stateProvider) {

	$stateProvider.state('press-release', {
		url: '/press-releases',
		templateUrl: 'js/press-release/press-release.template.html',
		controller: 'PressReleaseCtrl'
	});
});
