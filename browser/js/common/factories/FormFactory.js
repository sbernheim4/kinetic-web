'use strict';

app.factory('FormFactory', function($http) {
	return {
		submitLaunchAChapterForm: (info) => {
			return $http.post('/api/forms/launch-a-chapter', info)
			.then(res => res.data);
		},
		submitContactUsForm: (info) => {
			return $http.post('/api/forms/contact-us', info)
			.then(res => res.data);
		}
	};

});