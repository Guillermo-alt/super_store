const order = require('../../db/db.model.order');
// const userOrder = require('../../db/db.model.order');

module.exports.createOrder = async () => {
	try {
		const result = await order.Orders.create();
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports.createUserOrder = async (myOrder) => {
	try {
		for (let product in myOrder.products) {

			let item = {
				order_id: myOrder.order_id,
				email: myOrder.email,
				product_id: myOrder.products[product].product_id,
				selling_price: myOrder.products[product].selling_price,
				quantity: myOrder.products[product].quantity
			};
			await order.UserOrders.create(item);

		}
		return myOrder;
	} catch (error) {
		throw error;
	}
};

module.exports.getUserOrders = async (user) => {
	try {
		const res = await order.UserOrders.findAll(
			{
				where: {
					email: user.email
				}
			});
		return res;
	} catch (error) {
		throw error;
	}
};

module.exports.getUserOrder = async (user, id) => {
	try {
		const res = await order.UserOrders.findAll(
			{
				where: {
					email: user.email,
					order_id: id
				}
			});
		return res;
	} catch (error) {
		throw error;
	}
};
