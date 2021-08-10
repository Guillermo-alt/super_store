const users = require('../../db/db.model.users');


module.exports.RegisterUser = async (user) => {
	try {
		let exists = await users.findOne({ where: { email: user.email } });
		if (exists != null) {
			throw new Error('User already exists or it is inactive');
		} else {
			user.active = 'true';
			user.role = 'user';
			await users.create(user);
			return true;
		}
	} catch (error) {
		throw error;
	}
};

module.exports.UserExists = async (user) => {
	try {
		let exists = await users.findOne({
			where: {
				email: user.email,
				//userName: user.userName,
				password: user.password,
				active: 'true',
				role:  user.role
			}

		});
		if (exists != null) {
			return true;
		}
		return false;
	} catch (error) {
		throw error;
	}
};


module.exports.AdminExists= async (user) => {
	try {
		let exists = await users.findOne({
			where: {
				email: user.email,
				//userName: user.userName,
				password: user.password,
				active: 'true',
				role:  user.role
			}

		});
		if (exists != null) {
			return true;
		}
		return false;
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveUser = async (user) => {
	try {
		let User = await users.findOne({
			where: {
				email: user.email,
				//userName: user.userName,
				password: user.password,
				active: 'true',
				role: 'user'
			}
		});
		if (User != null) {
			return User.dataValues;
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
		throw error;
	}
};


module.exports.retrieveUserAdmin = async (user) => {
	try {
		let User = await users.findOne({
			where: {
				email: user.email,
				//userName: user.userName,
				password: user.password,
				active: 'true',
				role: 'admin'
			}
		});
		if (User != null) {
			return User.dataValues;
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
		throw error;
	}
};

module.exports.modifyUser = async (user) => {
	try {
		let result = await users.update(user, {
			where: {
				email: user.email,
				userName: user.userName,
				password: user.password,
				active: 'true',
				role: 'user'
			}
		});
		if (result[0]) {
			return true;
		}
		throw new Error('User not active in database, check user data');
	} catch (error) {
		throw error;
	}
};

module.exports.deleteUser = async (user) => {
	try {
		user.active = 'false';
		let result = await users.update(user, {
			where: {
				email: user.email,
				// userName: user.userName,
				password: user.password,
				active: 'true',
				role: 'user'
			}
		});
		if (result[0]) {
			return true;
		}
		throw new Error('User no longer exists or already deactivated');
	} catch (error) {
		throw error;
	}
};
