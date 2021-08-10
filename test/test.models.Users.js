
const expect = require('chai').expect;
const modelsUsers = require('../app/model/models.Users');

//Declarar los testeos que vamos a realizar

describe('Given a user object', () => {
	let user = {
		names: "user",
		last_names: "lastName",
		// email: "alexmail.mail.com.mx",
		userName: "u001",
		phone_number: "1234567890",
		password: "pass12",
		billing_address: "direction1",
		delivery_address: "direction2"
	};
	describe('with missing email field', async () => {
		it('should get error when passing by RegisterUser function', async () => {
			try {
				let result = await modelsUsers.RegisterUser(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "email" has invalid "undefined" value');
			}
		});
		it('should get error when passing by UserExists', async () => {
			try {
				let result = await modelsUsers.UserExists(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "email" has invalid "undefined" value');
			}
		});
		it('should get error when passing by retrieveUser', async () => {
			try {
				let result = await modelsUsers.retrieveUser(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "email" has invalid "undefined" value');
			}
		});
		it('should get error when passing by modifyUser', async () => {
			try {
				let result = await modelsUsers.modifyUser(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "email" has invalid "undefined" value');
			}
		});
	});
});
