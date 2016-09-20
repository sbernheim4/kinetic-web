app.config(function ($stateProvider) {

	$stateProvider.state('resources', {
		controller: 'ResourceCtrl',
		url: '/kinetic-global-resources',
		templateUrl: 'js/resources/resources.template.html'
	});
});
