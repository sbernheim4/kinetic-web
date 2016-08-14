'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const helper = require('sendgrid').mail;
const apiKey = require('../../env/').SENDGRID.API_KEY;
const Sendgrid = require('sendgrid')(apiKey);


// Schema used for people who want to launch a chapter of Kinetic on their campus.
// Info comes from the form on the launch state: www.kineticglobal.org/launch-a-chapeter

const LaunchSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	school: {
		type: String
	},
	year: {
		type: String
	},
	questions: {
		type: String
	},
	newsletter: {
		type: Boolean
	}
});

LaunchSchema.post('save', function(doc, next) {
	if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
		return next();
	}
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
  const subject = 'Thanks for your interest!';
  const name = doc.name.split(' ')[0];
  const content = new helper.Content('text/html', 
  	`<p>Hi ${name},</p>

  	<p>Thanks for expressing your interest in launching a chapter of Kinetic Global at ${doc.school}! We'll be reaching out to you shortly to follow up. In the meantime, if you have any questions, email us at admin@kineticglobal.org.</p>

  	<p>Best,</p>
  	<p>The team at Kinetic Global</p>`);
  const mail = new helper.Mail(from_email, subject, to_email, content);
  return mail;
}

function formatAdminEmail(doc) {
	const from_email = new helper.Email('noreply-launch-interest@kineticglobal.org');
  const to_email = new helper.Email('daniel@kineticglobal.org');
  const subject = 'New interest in launching a Kinetic Global chapter!';
  const clientName = doc.name;
  const clientEmail = doc.email;
  const content = new helper.Content('text/html', 
  	`<p>Hi,</p>

  	<p>${clientName} has just expressed interest in launching a chapter of Kinetic Global at ${doc.school}.</p>

  	<p>You can reach out to them at ${clientEmail}.</p>

  	<p>Best,</p>
  	<p>The team at Kinetic Global</p>`);
  const mail = new helper.Mail(from_email, subject, to_email, content);
  return mail;
} 

mongoose.model('LaunchAChapter', LaunchSchema);
