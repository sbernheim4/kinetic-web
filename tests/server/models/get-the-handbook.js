const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

const GetTheHandbook = mongoose.model('GetTheHandbook');

describe('GetTheHandbook model', function () {
	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});
	it('should exist', function () {
		expect(GetTheHandbook).to.be.a('function');
	});

	describe('model validation', function () {

		describe('invalid entry', function () {
			it('should not add document to collection', function (done) {
				const invalidForm = {
					name: "Testy McTesterson",
					profession: "Student",
					member: true,
					interested: false,
					curious: false,
					workAtUniversity: false,
					newsletter: true,
				};

				GetTheHandbook.create(invalidForm)
				.then(done)
				.catch((err) => {
					expect(err.message).to.equal('GetTheHandbook validation failed');
					done();
				});
			});
		});

		describe('invalid entry', function () {
			it('should not add document to collection', function (done) {
				const invalidForm = {
					email: "test@test.com",
					profession: "Student",
					member: true,
					interested: false,
					curious: false,
					workAtUniversity: false,
					newsletter: true,
				};

				GetTheHandbook.create(invalidForm)
				.then(done)
				.catch((err) => {
					expect(err.message).to.equal('GetTheHandbook validation failed');
					done();
				});
			});
		});

		describe('valid entry', function () {
			it('should add document to collection', function (done) {
				const validForm = {
					name: "Testy McTesterson",
					email: "test@test.com",
					profession: "Student",
					member: false,
					interested: false,
					curious: true,
					workAtUniversity: false,
					newsletter: true,
				};

				GetTheHandbook.create(validForm)
				.then( (results) => {
					expect(results).to.exist;
					return GetTheHandbook.find();
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
