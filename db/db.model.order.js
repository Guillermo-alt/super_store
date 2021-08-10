const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.conection');


const Orders = sequelize.define('orders',
	{
		delivery_date: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	},
	{
		timestamps: true
	}
);


const UserOrders = sequelize.define('user_orders',
	{
		order_id: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		product_id: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		selling_price: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		quantity: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
	},
	{
		timestamps: true
	}
);

module.exports = { Orders, UserOrders };
