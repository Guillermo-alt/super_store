/** Import modules */
const rateLimit = require("express-rate-limit");
const controlerUsers = require('../app/controler/controlers.Users');
const Joi = require('joi');
const userValidationModel = require('../app/model/models.userValidation');

/** Rate limiter middleware */
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100,
	message: 'Requests exceeded, wait 10 minutes'
});

/** cors option middleware for whitelist*/

const corsOption = {
	origin: function (origin, callback) {
		console.log(process.env.WHITE_LIST);
		if (process.env.WHITE_LIST.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not authorized by CORS'));
		}
	}
};


const validateToken = async (req, res, next) => {
	try {
		if (req.headers.authorization != undefined) {
			const token = req.headers.authorization.split(' ')[1];
			let verified = await controlerUsers.verifyUserToken(token);
			req.params.user = verified.data;
			return next();
		} else {
			throw new Error('Unauthorized request');
		}
	} catch (err) {
		console.log('Error: ' + err);
		res.status(500).send('Error: ' + err.message);
	}
};


const validateLoginInfo = async (req, res, next) => {
	try {
		await Joi.attempt(req.body, userValidationModel.loginModel, 'invalid login data');
		return next();
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error.message);
	}
};

const validateRegisterInfo = async (req, res, next) => {
	try {
		await Joi.attempt(req.body, userValidationModel.registerModel, 'invalid user data');
		return next();
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error.message);
	}
};

module.exports = {
	corsOption, limiter, validateToken,
	validateLoginInfo, validateRegisterInfo
};
