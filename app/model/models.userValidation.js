const Joi = require('joi');

module.exports = {
	loginModel: Joi.object().keys(
		{
			email: Joi.string().email().required(),
			role: Joi.string().alphanum().required(),//se valida role, useName no se usa
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required()
		}).with('email', 'password'),
	registerModel: Joi.object().keys(
		{
			names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(6).required(),
			last_names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(6).required(),
			email: Joi.string().email().required(),
			userName: Joi.string().alphanum().min(6).max(16).required(),
			phone_number: Joi.string().length(10).required(),
			billing_address: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(6).required(),
			delivery_address: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(6).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required()
		}).with('userName', 'password')
};
