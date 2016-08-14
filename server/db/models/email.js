'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const apiKey = require('../../env/').SENDGRID.API_KEY;
const Sendgrid = require('sendgrid')(apiKey);


const EmailSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	}
});


EmailSchema.post('save', function(doc, next) {
	const newContact = [
		{
			email: this.email,
		}
	];

	const firstName = this.name.split(' ')[0];
	if(firstName) {
		newContact[0].first_name = firstName; 
	}

	const lastName = this.name.split(' ')[this.name.split(' ').length-1]; //last elem in the array of names
	if(lastName && this.name.split(' ').length > 1) { //only if there's more than 1 elem in the array of names
		newContact[0].last_name = lastName;
	}

	addContact(newContact)
	.then( res => {
		next();
	})
	.then(next);
});

function addContact(newContact) {

	const request = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/contactdb/recipients',
    body: newContact
  });
	return Sendgrid.API(request);
}

mongoose.model('EmailSignup', EmailSchema);
