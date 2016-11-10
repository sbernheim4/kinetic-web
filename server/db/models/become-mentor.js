const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const sendEmail = require('../../modules/sendAnEmail.js').formatAndSendEmail;

const BecomeAMentorSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	profession: {
		type: String
	},
	almaMater: {
		type: String
	},
	information: {
		type: Boolean
	},
	mentor: {
		type: Boolean
	},
	newsletter: {
		type: Boolean
	}
});

BecomeAMentorSchema.post('save', function (doc, next) {
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
		subject: 'Thank you for your interest in becoming a mentor',
		content: `<p>${doc.name ? ' Hi ' + name : 'Hi'}, </p>

		<p> Thank you for your interest in becoming a mentor! We will be reaching out to you shortly to follow up and get to know you better. Look for our email soon.</p>

		<p>Best,</p>
		<p>The team at Kinetic Global</p>`
	};

	return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
	const clientName = doc.name ? doc.name : 'A user';
	const clientEmail = doc.email;
	const profession = doc.profession;
	const almaMater = doc.almaMater;

	const emailInfo = {
		from: 'noreply-become-a-mentor@kineticglobal.org',
		to: 'sambernheim@gmail.com',
		subject: 'Someone is interested in becoming a mentor',
		content: `<p>Hi,</p>

		<p>${clientName} has expressed interest in becoming a mentor for Kinetic</p>

		<p>You can reach out to them at ${clientEmail}.</p>

		<p>Here is the information they provided:</p>
		<p>${almaMater}</p>
		<p>${profession}</p>

		<p>Best,</p>
		<p>The team at Kinetic Global</p>`
	};
	return sendEmail(emailInfo);
}

mongoose.model('BecomeAMentor', BecomeAMentorSchema);
