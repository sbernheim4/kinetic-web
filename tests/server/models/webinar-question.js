const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

const WebinarQuestion = mongoose.model('WebinarQuestion');

describe('WebinarQuestion model', function () {
	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	it('should exist', function () {
		expect(WebinarQuestion).to.be.a('function');
	});

	describe('model validation', function () {

		// describe('invalid entry', function () {
		// 	it('should not add document to collection', function (done) {
		//     const invalidForm = { //missing `question` field
		//       name: 'Jane Doe',
		//       email: 'janedoe@email.com',
		//       advisor: 'Barack Obama',
		//       school: 'University of Phoenix'
		//     };

		// 		WebinarQuestion.create(invalidForm)
		// 		.then(done)
		// 		.catch((err) => {
		// 			expect(err.message).to.equal('WebinarQuestion validation failed');
		// 			return WebinarQuestion.find() //this is really weird putting a promise in a .catch. really not sure if this is the right way to do that
		// 			.then(results => {
		// 				expect(results.length).to.equal(0);
		// 				done();
		// 			})
		// 			.catch(done);
		// 		});
		// 	});
		// });

		describe('valid entry', function () {
			it('should add document to collection', function (done) {
				const validForm = {
		      name: 'Jane Doe',
		      email: 'janedoe@email.com',
		      question: 'Why do i need to test this??',
		      advisor: 'Barack Obama',
		      school: 'University of Phoenix'
		    };

				WebinarQuestion.create(validForm)
				.then( (results) => {
					expect(results).to.exist;
					return WebinarQuestion.find();
				})
				.then( (found) => {
					expect(found.length).to.equal(1);
					expect(found[0].email).to.equal('janedoe@email.com');
					done();
				})
				.catch(done);
			});
		});

	});
});
