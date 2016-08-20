'use strict';

app.factory('FormFactory', function($http) {
	return {
		submitLaunchAChapterForm: (info) => {
			//makes a post request to the users route and then returns the data
			return $http.post('/api/forms/launch-a-chapter', info)
			.then(res => res.data);
		},
		submitGetHandbookForm: (user) => {
			console.log('in FormFactory');
			return $http.post('/api/forms/get-the-handbook', user)
			.then(res => res.data);
		}
	};
});
