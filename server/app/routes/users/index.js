'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const slackMethods = require('../../../modules/slackMethods');
module.exports = router;

router.post('/', (req, res) => {
	//creates a user and sends it back if successful
	//throws a 500 and sends back the error if unsuccessful
  let user;
	User.create(req.body)
	.then( createdUser => {
    user = createdUser;
    return slackMethods.inviteUserToSlack(user.email);
  })
  .then( (response) => res.json(user) )
  .catch( err => {
    console.error(err)
    let validationErrors;
    if(err.errors) {
      validationErrors = Object.keys(err.errors).map(error => err.errors[error].message)
    }
    let errorMessage;
    if (validationErrors && validationErrors.length) {
      errorMessage = validationErrors[0];
    } else {
      errorMessage = err.message;
    }

    if(user) {
      return User.findById(user._id).remove()
      .then(destroyedUser => res.status(500).send(errorMessage) )
      .catch(deletionErr => {
        console.error(deletionErr)
        return res.status(500).send(deletionErr)
      }) 
    } else {
      return res.status(500).send(errorMessage);
    }
  });
});
