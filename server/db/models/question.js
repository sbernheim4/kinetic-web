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

const QuestionsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  questions: {
    type: String,
    required: true
  }
});

QuestionsSchema.post('save', function (doc, next) {

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

    <p>Thanks for your question about launching a chapter of Kinetic Global. We'll get back to you as soon as possible with an answer.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };

  return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
  const questions = doc.questions;
  const clientName = doc.name;
  const clientEmailAddress = doc.email;

  const emailInfo = {
    from: 'noreply-questions@kineticglobal.org',
    to: 'sam@kineticglobal.org',
    subject: 'New question!',
    content: `<p>Hi,</p>

    <p>${clientName}, a user who displayed interested in launching a chapter of Kinetic Global, had the following question:</p>

    <p>${questions}</p>

    <p>You can reply to ${clientName} at ${clientEmailAddress}.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };
  return sendEmail(emailInfo);
}

mongoose.model('Questions', QuestionsSchema);
