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
    },
    submitExpertNominationForm: (info) => {
      return $http.post('/api/forms/nominate-expert', info)
      .then(res => res.data);
    },
    submitGetHandbookForm: (info) => {
      return $http.post('/api/forms/get-the-handbook', info)
      .then(res => res.data);
    },
    submitAdvisorQuestion: (info) => {
      return $http.post('/api/forms/ask-advisor-question', info)
      .then(res => res.data);
    }
  };
});
