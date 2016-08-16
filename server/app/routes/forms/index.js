'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const EmailSignup = mongoose.model('EmailSignup');
const LaunchAChapter = mongoose.model('LaunchAChapter');
const Questions = mongoose.model('Questions');
const Bluebird = require('bluebird');

module.exports = router;

router.post('/launch-a-chapter', (req, res, next) => {
  //adds form data to dbs, emails the client and admins, and send back a 200 if successful
  //throws a 500 and sends back the error if unsuccessful
  Bluebird.resolve()
  .then(() => {
    if (req.body.email && req.body.newsletter) {
      return EmailSignup.create(req.body);
    }
    return;
  })
  .then((e) => {
    return LaunchAChapter.create(req.body);
  })
  .then(() => {
    if (req.body.questions) {
      return Questions.create(req.body);
    }
    return;
  })
  // When everything has completed we should redirect them to a page saying so
  // or add a confirmation popup or something dynamic like this
  .then(() => res.send())
  .catch(err => res.status(500).send(err));
});
