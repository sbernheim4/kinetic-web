'use strict';

app.factory('ForumFactory', function($http) {
  return {
    createDiscussion: (info) => {
      return $http.post('/api/forum/discussions', info)
      .then(res => res.data);
    },
    getAllDiscussions: () => {
      return $http.get('/api/forum/discussions')
      .then(res => res.data);
    },
    getADiscussion: (id) => {
      return $http.get(`/api/forum/discussions/${id}`)
      .then(res => res.data);
    },
    createComment: (info) => {
      return $http.post(`/api/forum/discussions/${info.discussionId}`, info)
      .then(res => res.data)
    }
  };
});
