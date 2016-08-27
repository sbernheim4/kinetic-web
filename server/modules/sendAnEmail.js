const helper = require('sendgrid').mail;
const apiKey = require('../env/').SENDGRID.API_KEY;
const Sendgrid = require('sendgrid')(apiKey);
const Bluebird = require('bluebird');

function sendEmail(mail) {
  const request = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
    return Bluebird.resolve();
  }
  return Sendgrid.API(request);
}

module.exports = {
  formatAndSendEmail: function (emailInfo) {
    const fromEmail = new helper.Email(emailInfo.from);
    const toEmail = new helper.Email(emailInfo.to);
    const content = new helper.Content('text/html', emailInfo.content);
    const subject = emailInfo.subject;

    const email = new helper.Mail(fromEmail, subject, toEmail, content);
    return sendEmail(email);
  }
};
