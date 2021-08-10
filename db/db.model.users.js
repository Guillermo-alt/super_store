const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.conection');


const Users = sequelize.define('users', {
	names: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	last_names: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	userName: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	phone_number: {
		type: DataTypes.STRING(15),
		allowNull: false
	},
	password: {
		type: DataTypes.STRING(15),
		allowNull: false
	},
	billing_address: {
		type: DataTypes.STRING(30),
		allowNull: false
	},
	delivery_address: {
		type: DataTypes.STRING(30),
		allowNull: false
	},
	active: {
		type: DataTypes.STRING(15),
		allowNull: false
	},
	role: {
		type: DataTypes.STRING(15),
		allowNull: false
	}
}, {
	timestamps: true
});


module.exports = Users;
