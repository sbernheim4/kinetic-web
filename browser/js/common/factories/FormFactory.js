'use strict';

app.factory('FormFactory', function($http) {
  return {
    submitLaunchAChapterForm: (info) => {
      return $http.post('/api/forms/launch-a-chapter', info)
      .then(res => res.data);
    },
    submitExpertNominationForm: (info) => {
      return $http.post('/api/forms/nominate-expert', info)
      .then(res => res.data);
    }
  };

});
