'use strict';

app.factory('UserFactory', function($http) {
	return {
		createUser: (account) => {
			return $http.post('/api/users', account)
			.then(res => res.data);
		}
	};

});