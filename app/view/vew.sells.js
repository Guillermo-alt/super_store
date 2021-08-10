const controlerSells = require('../controler/controlers.sells');
const middlewares = require('../../middlewares/middlewares');
const controlersUsers = require('../controler/controlers.Users');

module.exports = async (app) => {
	app.post('/user/orders', middlewares.validateToken, async (req, res) => {
		try {
			const ok = await controlersUsers.validateUser(req.params.user);
			if (ok) {
				const id = await controlerSells.createOrder();
				const myOrder = {
					order_id: id,
					email: req.params.user.email, //se cambio por email
					products: req.body
				};
				const result = await controlerSells.createUserOrder(myOrder);
				res.status(200).json(result);
			} else
				throw new Error('User is not authorized');
		} catch (error) {
			res.status(500).send(error.message);
		}
	});

	app.get('/user/orders', middlewares.validateToken, async (req, res) => {
		try {
			const ok = await controlersUsers.validateUser(req.params.user);
			if (ok) {
				const orders = await controlerSells.getUserOrders(req.params.user);
				res.status(200).json(orders);
			} else
				throw new Error('User is not authorized');
		} catch (error) {
			res.status(500).send(error.message);
		}
	});

	app.get('/user/orders/:id', middlewares.validateToken, async (req, res) => {
		try {
			const ok = await controlersUsers.validateUser(req.params.user);
			if (ok) {
				const orders = await controlerSells.getUserOrder(req.params.user, req.params.id);
				res.status(200).json(orders);
			} else
				throw new Error('User is not authorized');
		} catch (error) {
			res.status(500).send(error.message);
		}
	});
};
