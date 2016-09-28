const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const sendEmail = require('../../modules/sendAnEmail.js').formatAndSendEmail;

const ContactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
});


ContactSchema.post('save', function (doc, next) {

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
    subject: 'We\'ve received your request',
    content: `<p>${ doc.name ? 'Hi '+ name : 'Hi'},</p>

    <p>We have received your request for contact and have passed it on to one of our team members. We'll be reaching out to you shortly to follow up.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`
  };

  return sendEmail(emailInfo);
}

function sendAdminEmail(doc) {
  const clientName = doc.name ? doc.name : 'A user';
  const fullRole = 'who has the role of &quot;' + doc.role + '&quot; ';
  const emptyRole = '';
  const role = doc.role ? fullRole : emptyRole;
  const clientEmail = doc.email;
  const emailInfo = {
    from: 'noreply-contact-us@kineticglobal.org',	
    to: ['general@kineticglobal.org', 'bryan.jones@kineticglobal.org', 'katie.swoap@kineticglobal.org'],
    subject: 'New Question/Comment from Contact Us Page',
    content: `<p>Hi,</p>

    <p>${clientName} ${role}has just requested that a member of the Kinetic Global team contact them.</p>

    <p>The user had the following message:</p>

    <p>"${doc.message}"</p>

    <p>You can reach out to them at ${clientEmail}.</p>

    <p>Best,</p>
    <p>The team at Kinetic Global</p>`

  };

  return sendEmail(emailInfo);
}

mongoose.model('ContactRequest', ContactSchema);
