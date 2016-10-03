/*
 * Schema used for people who want to launch a chapter of Kinetic on their campus.
 * Info comes from the form on the launch state: www.kineticglobal.org/launch-a-chapeter
 * An email is sent out to both the user saying thank you and to the admin email
 * with the info of who wanted to join.
 */

'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const sendEmail = require('../../modules/sendAnEmail.js').formatAndSendEmail;

const NominateSchema = new mongoose.Schema({
  nomineeName: {
    type: String,
    required: true
  },
  nominatorEmail: {
    type: String,
    required: true
  },
  nominatorName: {
    type: String,
    required: true
  },
  nomineeExpertise: {
    type: String,
    enum: ['Food Insecurity', 'Homelessness', 'Environment', 'Other'],
    required: true
  },
  relationship: {
    type: String,
    enum: ['knowsNominee', 'doesNotKnowNominee', 'isNominee'],
    required: true
  }
});

NominateSchema.post('save', function (doc, next) {

  Bluebird.all([sendClientEmail(this), sendAdminEmail(this)])
  .then(() => {
    next();
  })
  .catch(next);
});

function sendClientEmail(doc) {
  const nominatorName = doc.nominatorName;
  const nominatorNameShortened = nominatorName.split(' ')[0];
  const nomineeName = doc.nomineeName;

  const emailInfo = {
    from: 'thanks@kineticglobal.org',
    to: doc.nominatorEmail.toLowerCase(),
    subject: 'Thanks for your nomination!',
    content: `<p>Hi ${nominatorNameShortened},</p>

    <p>Thank you for nominating ${nomineeName} to be an expert at Kinetic Global. We've passed on your nomination to our team and will contact you soon.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };

  if(nomineeName.toLowerCase() === nominatorName.toLowerCase() && doc.relationship === 'isNominee'){
    emailInfo.content = `<p>Hi ${nominatorNameShortened},</p>

    <p>Thank you for nominating yourself to be an expert at Kinetic Global. We've passed on your nomination to our team and will contact you soon.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  }

  return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
  const nominatorName = doc.nominatorName;
  const nominatorNameShortened = nominatorName.split(' ')[0];
  const nomineeName = doc.nomineeName;
  const nominatorEmail = doc.nominatorEmail;
  const nomineeExpertise = doc.nomineeExpertise;
  const relationship = doc.relationship;

  let relationshipInWords;

  if(relationship === 'knowsNominee') {
    relationshipInWords = `knows ${nomineeName}`;
  } else if (relationship === 'doesNotKnowNominee') {
    relationshipInWords = `does not have a relationship with ${nomineeName}`;
  }

  const emailInfo = {
    from: 'noreply-nomination@kineticglobal.org',
    to: ['general@kineticglobal.org', 'bryan.jones@kineticglobal.org', 'jessica.bernheim@kineticglobal.org', 'katie.swoap@kineticglobal.org'],
    subject: 'New nomination for Kinetic Global!',
    content: `<p>Hi,</p>

    <p>${nominatorNameShortened} has just nominated ${nomineeName} to be an expert at Kinetic Global. According to ${nominatorNameShortened}, ${nomineeName} is an expert in "${nomineeExpertise}". Additionally, ${nominatorNameShortened}, the nominator, ${relationshipInWords}.

    <p>You can reach out to the nominator at ${nominatorEmail}.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };

  if (nomineeName.toLowerCase() === nominatorName.toLowerCase() && relationship === 'isNominee') {
    emailInfo.content = `<p>Hi,</p>

    <p>${nominatorName} has just himself/herself to be an expert at Kinetic Global. According to ${nominatorName}, he/she is an expert in "${nomineeExpertise}".

    <p>You can reach out to ${nominatorName} at ${nominatorEmail}.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  }

  return sendEmail(emailInfo);
}

mongoose.model('Nominate', NominateSchema);
