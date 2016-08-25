'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('template', {
		url: '/kinetic-template',
		controller: 'TemplateCtrl',
		templateUrl: 'js/template/template.template.html'
	});
});
