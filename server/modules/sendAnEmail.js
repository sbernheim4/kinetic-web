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
    const mail = new helper.Mail();
    const personalization = new helper.Personalization();

    mail.setFrom(new helper.Email(emailInfo.from));
    mail.setSubject(emailInfo.subject);
    mail.addContent(new helper.Content('text/html', emailInfo.content));

    if (Array.isArray(emailInfo.to)) {
      emailInfo.to.forEach((email) => {
        personalization.addTo(new helper.Email(email));
      });

    } else {
      personalization.addTo(new helper.Email(emailInfo.to));
    }
    mail.addPersonalization(personalization);

    return sendEmail(mail);
  }
};
