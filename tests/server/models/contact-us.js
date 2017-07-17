const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

const ContactRequest = mongoose.model('ContactRequest');

describe('ContactUs model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
    expect(ContactRequest).to.be.a('function');
  });

  describe('model validation', function () {

    // describe('invalid entry', function () {
    //   it('should not add document to collection', function (done) {
    //     const invalidForm = {
    //       name: "Testy McTesterson",
    //       role: "educator",
    //       message: "What is Kinetic",
    //       newsletter: true,
    //     };

    //     ContactRequest.create(invalidForm)
    //     .then(done)
    //     .catch((err) => {
    //       expect(err.message).to.equal('ContactRequest validation failed');
    //       done();
    //     });
    //   });
    // });

    // describe('invalid entry', function () {
    //   it('should not add document to collection', function (done) {
    //     const invalidForm = {
    //       name: "Testy McTesterson",
    //       email: "testy@gmail.com",
    //       role: "educator",
    //       newsletter: true,
    //     };

    //     ContactRequest.create(invalidForm)
    //     .then(done)
    //     .catch((err) => {
    //       expect(err.message).to.equal('ContactRequest validation failed');
    //       done();
    //     });
    //   });
    // });



    describe('valid entry', function () {
      it('should add document to collection', function (done) {
        const validForm = {
          name: "Testy McTesterson",
          email: "test@test.com",
          role: "educator",
          message: "What is Kinetic",
          newsletter: true,
        };

        ContactRequest.create(validForm)
        .then( (results) => {
          expect(results).to.exist;
          return ContactRequest.find();
        })
        .then( (found) => {
          expect(found.length).to.equal(1);
          expect(found[0].email).to.equal('test@test.com');
          done();
        })
        .catch(done);
      });
    });

  });
});
