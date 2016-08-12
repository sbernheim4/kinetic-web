'use strict';

app.factory('UserFactory', function($http) {
	return {
		createUser: (account) => {
			//makes a post request to the users route and then returns the data
			return $http.post('/api/users', account)
			.then(res => res.data);
		}
	};
});