'use strict';

const mongoose = require('mongoose');
require('../../../server/db/models');
const LaunchAChapter = mongoose.model('LaunchAChapter');
const Questions = mongoose.model('Questions');
const EmailSignup = mongoose.model('EmailSignup');
const Nominate = mongoose.model('Nominate');
const WebinarQuestion = mongoose.model('WebinarQuestion');
const expect = require('chai').expect;

const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const supertest = require('supertest');
const app = require('../../../server/app');

describe('Form routes', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('/launch-a-chapter', function() {
    let userAgent;

    const formData = {
      classYear: "2018",
      email: "test@test.com",
      name: "Testy McTesterson",
      newsletter: true,
      questions: "Why does my hair smell like sunflower seeds",
      school: "Saul University"
    };

    beforeEach('Create guest agent', function () {
      userAgent = supertest.agent(app);
    });

    it('should create an entry in the launch db', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(formData)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        LaunchAChapter.find()
        .then(function(interests) {
          expect(interests.length).to.equal(1);
          expect(interests[0].email).to.equal('test@test.com');
          done();
        })
        .catch(done);
      });
    });

    it('should create an entry in the questiondb', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(formData)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        Questions.find()
        .then(function(questions) {
          expect(questions.length).to.equal(1);
          expect(questions[0].questions).to.equal('Why does my hair smell like sunflower seeds');
          done();
        })
        .catch(done);
      });
    });

    const formDataWithoutQuestion = {
      classYear: "2018",
      email: "test@test.com",
      name: "Testy McTesterson",
      newsletter: true,
      questions: "",
      school: "Saul University"
    };

    it('should NOT create an entry in the questiondb', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(formDataWithoutQuestion)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        Questions.find()
        .then(function(questions) {
          expect(questions.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });

    it('should add entries to emaildb if user subscribes to newsletter', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(formData)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        EmailSignup.find()
        .then(function(emailList) {
          expect(emailList.length).to.equal(1);
          expect(emailList[0].email).to.equal('test@test.com');
          done();
        })
        .catch(done);
      });
    });

    const formDataWithoutNewsletterSubscription = {
      classYear: "2018",
      email: "test@test.com",
      name: "Testy McTesterson",
      newsletter: false,
      questions: "Why does my hair smell like sunflower seeds",
      school: "Saul University"
    };

    it('should NOT add entries to emaildb if user does not subscribe to newsletter', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(formDataWithoutNewsletterSubscription)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        EmailSignup.find()
        .then(function(emailList) {
          expect(emailList.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });

  });


  describe('/nominate-expert', function() {
    let userAgent;

    beforeEach('Create guest agent', function () {
      userAgent = supertest.agent(app);
    });

    const validForm = {
      nomineeName: 'Nominee Testee',
      email: 'nominator@email.com',
      name: 'Nominator Testee',
      nomineeExpertise: 'Homelessness',
      relationship: 'knowsNominee',
      newsletter: true
    };

    const invalidForm = {
      nomineeName: 'Nominee Testee',
      nominatorEmail: 'nominator@email.com',
      nominatorName: 'Nominator Testee',
      nomineeExpertise: 'Building pianos for leopards', //not valid
      relationship: 'knowsNominee'
    };

    it('should create an entry in the nominate db', function (done) {
      userAgent.post('/api/forms/nominate-expert')
      .send(validForm)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        Nominate.find()
        .then(function(results) {
          expect(results.length).to.equal(1);
          expect(results[0].nominatorEmail).to.equal('nominator@email.com');
          done();
        })
        .catch(done);
      });
    });

    it('should not create an entry in the nominate db', function(done) {
      userAgent.post('/api/forms/nominate-expert')
      .send(invalidForm)
      .expect(500)
      .end(function (err, response) {
        if (err) return done(err);
        Nominate.find()
        .then(function(results) {
          expect(results.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });

    it('should add entries to emaildb if user subscribes to newsletter', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(validForm)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        EmailSignup.find()
        .then(function(emailList) {
          expect(emailList.length).to.equal(1);
          expect(emailList[0].email).to.equal('nominator@email.com');
          done();
        })
        .catch(done);
      });
    });

    const validFormWithoutNewsletter = {
      nomineeName: 'Nominee Testee',
      email: 'nominator@email.com',
      name: 'Nominator Testee',
      nomineeExpertise: 'Homelessness',
      relationship: 'knowsNominee'
    };

    it('should NOT add entries to emaildb if user does not subscribe to newsletter', function (done) {
      userAgent.post('/api/forms/launch-a-chapter')
      .send(validFormWithoutNewsletter)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        EmailSignup.find()
        .then(function(emailList) {
          expect(emailList.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });

  });

  describe('/ask-advisor-question', function() {
    let userAgent;

    beforeEach('Create guest agent', function () {
      userAgent = supertest.agent(app);
    });

    const validForm = {
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      question: 'Why do i need to test this??',
      advisor: 'Barack Obama',
      school: 'University of Phoenix'
    };

    const invalidForm = { //missing `question` field
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      advisor: 'Barack Obama',
      school: 'University of Phoenix'
    };

    it('should create an entry in the WebinarQuestion collection', function (done) {
      userAgent.post('/api/forms/ask-advisor-question')
      .send(validForm)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        WebinarQuestion.find()
        .then(function(results) {
          expect(results.length).to.equal(1);
          expect(results[0].email).to.equal('janedoe@email.com');
          done();
        })
        .catch(done);
      });
    });

    it('should not create an entry in the nominate db', function(done) {
      userAgent.post('/api/forms/ask-advisor-question')
      .send(invalidForm)
      .expect(500)
      .end(function (err, response) {
        if (err) return done(err);
        WebinarQuestion.find()
        .then(function(results) {
          expect(results.length).to.equal(0);
          done();
        })
        .catch(done);
      });
    });
  });
});
