/*
* Schema used for people who submit a form to join the kinetic slack account
*/

'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const sendEmail = require('../../modules/sendAnEmail.js').formatAndSendEmail;

const SlackSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});

SlackSchema.post('save', function (doc, next) {

	var valid = false;

	const domains = ['@amherst.edu', '@brandeis.edu', '@columbia.edu', '@duke.edu', '@nyu.edu', '@skidmore.edu', '@swarthmore.edu', '@swarthmore.edu', '@upenn.edu', '@usc.edu', '@vanderbilt.edu', '@wustl.edu','@williams.edu'];

	const indexOfAt = doc.email.indexOf("@");

	for (var i = 0; i < domains.length; i++) {
		if (doc.email.substring(indexOfAt) == domains[i]) {
			valid = true;
		}
	}

	if (valid) {
		Bluebird.all([sendClientEmail(this), sendAdminEmail(this)])
		.then(() => {
			next();
		})
		.catch(next);
	} else {
		Bluebird.all([sendClientEmailTwo(this), sendAdminEmail(this)])
		.then(() => {
			next();
		})
	}
});

function sendClientEmail(doc) {
	const name = doc.name.split(' ')[0];

	const emailInfo = {
		from: 'thanks@kineticglobal.org',
		to: doc.email.toLowerCase(),
		subject: 'Thanks for asking to Join the Kinetic Slack Group',
		content: `<p>Hi ${name},</p>

		<p>Thank you for expressing interest in joining the Kinetic Slack group.</p>
		<br>
		<p>Please go visit https://kineticglobal.slack.com/messages to get started.</p>

		<p>Best,</p>
		<p>The team at Kinetic Global</p>`
	};
	return sendEmail(emailInfo);
}

function sendClientEmailTwo(doc) {
	const name = doc.name.split(' ')[0];

	const emailInfo = {
		from: 'thanks@kineticglobal.org',
		to: doc.email.toLowerCase(),
		subject: 'Thanks for asking to Join the Kinetic Slack Group',
		content: `<p>Hi ${name},</p>

		<p>Thank you for expressing interest in joining the Kinetic Slack group.</p>
		<p>We noticed the email you entered is from a school not affiliated with Kinetic. If you used a email different from your school email and you are part of a kinetic team please visit https://kineticglobal.slack.com/messages to get started with slack.</p>
		<p>Just be sure to sign up with your school email</p>
		<p>If you are from a school that is not yet partnered with Kinetic, please email EMAIL EMAILPLACEHOLDER to look into starting a chapter at your College or University or visit https://www.kineticglobal.org/launch-a-chapter and thank you for your interest.</p>

		<p>Best,</p>
		<p>The team at Kinetic Global</p>`
	};
	return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
	const clientName = doc.name;
	const clientEmail = doc.email;

	const emailInfo = {
		from: 'noreply@kineticglobal.org',
		to: 'admin@kineticglobal.org',
		subject: 'New Request to Join the Slack Organization',
		content: `<p> Hi, </p>
		<p>${clientName} has just requested to join the Kinetic Slack Group.</p>

		<p>You can reach out to them at ${clientEmail}</p>

		<p>Best, </p>
		</p>The team at Kinetic Global</p>`

	};
	return sendEmail(emailInfo);
}

mongoose.model('JoinSlack', SlackSchema);
