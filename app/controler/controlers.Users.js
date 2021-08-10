const modelsUsers = require('../model/models.Users');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (newUser) => {
	try {
		const ok = await modelsUsers.RegisterUser(newUser);
		if (ok) {
			return newUser.userName;
		}
		throw new Error('An internal error has ocurred, try later');
	} catch (error) {
		throw error;
	}
};

module.exports.validateUser = async (usr) => {
	try {
		const ok = await modelsUsers.UserExists(usr);
		if (ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
};

module.exports.validateAdmin = async (usr) => {
	try {
		const ok = await modelsUsers.AdminExists(usr);
		if (ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
};

module.exports.generateUserToken = async (user) => {
	const token = jwt.sign(
		{ data: user },
		process.env.SECRET_KEY
	);
	return token;
};

module.exports.verifyUserToken = async (token) => {
	try {
		const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
		if (decodedUser) {
			return decodedUser;
		}
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveUser = async (user) => {
	try {
		const result = await modelsUsers.retrieveUser(user);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveUserAdmin = async (user) => {
	try {
		const result = await modelsUsers.retrieveUserAdmin(user);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports.modifyUser = async (newUser) => {
	try {
		const ok = await modelsUsers.modifyUser(newUser);
		if (ok) {
			return newUser.userName;
		}
		throw new Error('An internal error has ocurred, try later');
	} catch (error) {
		throw error;
	}
};


module.exports.deleteUser = async (newUser) => {
	try {
		const ok = await modelsUsers.deleteUser(newUser);
		if (ok) {
			return newUser.userName;
		}
		throw new Error('An internal error has ocurred, try later');
	} catch (error) {
		throw error;
	}
};
