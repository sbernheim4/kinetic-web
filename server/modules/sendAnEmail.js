const helper = require('sendgrid').mail;
const apiKey = require('../env/').SENDGRID.API_KEY;
const Sendgrid = require('sendgrid')(apiKey);

function sendEmail(mail) {
  const request = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return Sendgrid.API(request);
}

module.exports = {
  formatAndSendEmail: function (emailInfo) {
    const fromEmail = new helper.Email(emailInfo.from);
    const toEmail = new helper.Email(emailInfo.to);
    const content = new helper.Content('text/html', emailInfo.content);
    const subject = emailInfo.subject;

    var email = new helper.Mail(fromEmail, subject, toEmail, content);

    if (emailInfo.alsoTo !== undefined ) {
      email.personalizations[0].addTo(emailInfo.alsoTo);
    }

    return sendEmail(email);
  }
};
