const modelsOrders = require('../model/models.orders');
module.exports.createOrder = async () => {
	try {
		let order = await modelsOrders.createOrder();
		return order.id;
	} catch (error) {
		throw error;
	}
};

module.exports.createUserOrder = async (myOrder) => {
	try {
		let order = await modelsOrders.createUserOrder(myOrder);
		return order;
	} catch (error) {
		throw error;
	}
};

module.exports.getUserOrders = async (user) => {
	try {
		let orders = await modelsOrders.getUserOrders(user);
		return orders;
	} catch (error) {
		throw error;
	}
};

module.exports.getUserOrder = async (user, id) => {
	try {
		let orders = await modelsOrders.getUserOrder(user, id);
		return orders;
	} catch (error) {
		throw error;
	}
};
