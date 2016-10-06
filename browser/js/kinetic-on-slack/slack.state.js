'use strict'

app.config(function ($stateProvider) {

	$stateProvider.state('kinetic-on-slack', {
		url: '/kinetic-on-slack',
		controller: 'SlackCtrl',
		templateUrl: 'js/kinetic-on-slack/slack.template.html'
	});
});
