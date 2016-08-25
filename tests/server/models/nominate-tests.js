const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

const Nominate = mongoose.model('Nominate');

describe('Nominate model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });
  it('should exist', function () {
    expect(Nominate).to.be.a('function');
  });

  describe('model validation', function () {

    describe('invalid entry', function () {
      it('should not add document to collection', function (done) {
        const invalidForm = {
          nomineeName: 'Nominee Testee',
          nominatorEmail: 'nominator@email.com',
          nominatorName: 'Nominator Testee',
          nomineeExpertise: 'Building pianos for leopards', //not valid
          relationship: 'knowsNominee'
        };
        Nominate.create(invalidForm)
        .then(done)
        .catch((err) => {
          expect(err.message).to.equal('Nominate validation failed');
          done();
        });
      });
    });

    describe('valid entry', function () {
      it('should add document to collection', function (done) {
        const validForm = {
          nomineeName: 'Nominee Testee',
          nominatorEmail: 'nominator@email.com',
          nominatorName: 'Nominator Testee',
          nomineeExpertise: 'Homelessness',
          relationship: 'knowsNominee'
        };
        
        Nominate.create(validForm)
        .then( (results) => {
          expect(results).to.exist;
          return Nominate.find();
        })
        .then( (found) => {
          expect(found.length).to.equal(1);
          expect(found[0].nominatorEmail).to.equal('nominator@email.com');
          done();
        })
        .catch(done);
      });
    });

  });
});