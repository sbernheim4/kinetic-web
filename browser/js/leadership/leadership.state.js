'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('leadership', {
		url: '/kinetic-global-leadership',
		templateUrl: 'js/leadership/leadership.template.html',
		controller: 'LeadershipCtrl'
	});
});
