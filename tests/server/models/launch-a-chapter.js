const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

const LaunchAChapter = mongoose.model('LaunchAChapter');

describe('LaunchAChapter model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });
  it('should exist', function () {
    expect(LaunchAChapter).to.be.a('function');
  });

  describe('model validation', function () {

    // describe('invalid entry', function () {
    //   it('should not add document to collection', function (done) {
    //     const invalidForm = {
    //       classYear: "2018",
    //       name: "Testy McTesterson",
    //       newsletter: true,
    //       questions: "",
    //       school: "Saul University"
    //     };

    //     LaunchAChapter.create(invalidForm)
    //     .then(done)
    //     .catch((err) => {
    //       expect(err.message).to.equal('LaunchAChapter validation failed');
    //       done();
    //     });
    //   });
    // });

    describe('valid entry', function () {
      it('should add document to collection', function (done) {
        const validForm = {
          classYear: "2018",
          email: "test@test.com",
          name: "Testy McTesterson",
          newsletter: true,
          questions: "",
          school: "Saul University"
        };

        LaunchAChapter.create(validForm)
        .then( (results) => {
          expect(results).to.exist;
          return LaunchAChapter.find();
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
