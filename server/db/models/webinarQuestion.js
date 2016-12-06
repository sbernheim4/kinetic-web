/*
 * Schema for sending an email if a user enters info into the questions box in
 * the launch a chapter form. An email is sent to the user saying thanks and
 * we'll get back to you soon. Another email is sent to the admin with the
 * person's name, email and questions.
 */

'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const sendEmail = require('../../modules/sendAnEmail.js').formatAndSendEmail;

const WebinarQuestionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  advisor: {
    type: String,
    required: true
  },
  school: {
    type: String
  }
});

WebinarQuestionSchema.post('save', function (doc, next) {

  Bluebird.all([sendClientEmail(this), sendAdminEmail(this)])
  .then(() => {
    next();
  })
  .catch(next);
});

function sendClientEmail(doc) {
  const name = doc.name.split(' ')[0];

  const emailInfo = {
    from: 'thanks@kineticglobal.org',
    to: doc.email.toLowerCase(),
    subject: 'Thanks for your question!',
    content: `<p>Hi ${name},</p>

    <p>Thanks for your question for ${doc.advisor}. We'll pass it on to them and do our best to have them answer it in the webinar.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };

  return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
  const question = doc.question;
  const clientName = doc.name;
  const clientEmailAddress = doc.email;

  const emailInfo = {
    from: 'noreply-questions@kineticglobal.org',
    to: ['katie.swoap@kineticglobal.org','general@kineticglobal.org', 'daniel@kineticglobal.org'],
    subject: 'New question for an advisor!',
    content: `<p>Hi,</p>

    <p>${clientName} from ${doc.school} had the following question for ${doc.advisor}'s webinar:</p>

    <p>"${question}"</p>

    <p>You can reply to ${clientName} at ${clientEmailAddress}.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };
  return sendEmail(emailInfo);
}

mongoose.model('WebinarQuestion', WebinarQuestionSchema);
