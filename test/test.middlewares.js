const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const midd = require('../middlewares/middlewares');

chai.use(chaiHttp);
const url = 'http://localhost:3000';


describe('Given an invalid register user data', () => {
	it('when passing by register middleware should return 400 status', (done) => {
		chai.request(url)
			.post('/users/register')
			.send(
				{
					"names": "Alejandro",
					"last_names": "esquivel",
					"email": "alexmail.mail.com", //missing @ symbol
					"userName": "alex01",
					"phone_number": "1234567890",
					"password": "pass12",
					"billing_address": "direction1",
					"delivery_address": "direction2"
				}
			).end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});

describe('Given an malformed login data', () => {
	it('when passing by register middleware should return 400 status', (done) => {
		chai.request(url)
			.post('/users/login')
			.send(
				{
					"email": "alexmail.mail.com", //missing @ symbol
					"userName": "alex01",
					"password": "pass"
				}
			).end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});
