'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const helper = require('sendgrid').mail;
const apiKey = require('../../env/').SENDGRID.API_KEY;
const Sendgrid = require('sendgrid')(apiKey);


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

QuestionsSchema.post('save', function(doc, next) {
	const clientEmail = formatClientEmail(this);
	const adminEmail = formatAdminEmail(this);

	Bluebird.all([sendEmail(clientEmail), sendEmail(adminEmail)])
  .then( () => {
  	next();
  })
  .catch(next);

});

function sendEmail(mail) {
	const request = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return Sendgrid.API(request);
}

function formatClientEmail(doc) {
	const from_email = new helper.Email('thanks@kineticglobal.org');
  const to_email = new helper.Email(doc.email.toLowerCase());
  const subject = 'Thanks for your question!';
  const name = doc.name.split(' ');
  const content = new helper.Content('text/html', 
  	`<p>Hi ${name},</p>

  	<p>Thanks for your question about launching a chapter of Kinetic Global. We'll get back to you as soon as possible with an answer.</p>

  	<p>Best,</p>
  	<p>The team at Kinetic Global</p>`);
  const clientEmail = new helper.Mail(from_email, subject, to_email, content);
  return clientEmail;
}

function formatAdminEmail(doc) {
	const from_email = new helper.Email('noreply-questions@kineticglobal.org');
  const to_email = new helper.Email('daniel@kineticglobal.org'); //swap with actual admin email
  const subject = 'New question!';
  const clientName = doc.name;
  const clientEmailAddress = doc.email;
  const content = new helper.Content('text/html', 
  	`<p>Hi,</p>

  	<p>${clientName}, a user who displayed interested in launching a chapter of Kinetic Global had the following question:</p>

  	<p>${doc.questions}</p>

  	<p>You can reply to ${clientName} at ${clientEmailAddress}.</p>

  	<p>Best,</p>
  	<p>The team at Kinetic Global</p>`);
  const clientEmail = new helper.Mail(from_email, subject, to_email, content);
  return clientEmail;
}

mongoose.model('Questions', QuestionsSchema);
