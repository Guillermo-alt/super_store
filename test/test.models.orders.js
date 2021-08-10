
const expect = require('chai').expect;
const modelsOrders = require('../app/model/models.orders');

//Declarar los testeos que vamos a realizar
describe('', () => {
	describe('When creating order', async () => {
		it('should return an order ID', async () => {
			let result = await modelsOrders.createOrder();
			expect(result.id).to.be.a('number');
		});
	});
	describe('Given an invalid order and when creating a user order', async () => {
		let order = [
			{
				"product_id": "MX01",
				"selling_price": 100,
				"quantity": 1
			},
			{
				"product_id": "MX02",
				"selling_price": 200,
				"quantity": 1
			},
			{
				"product_id": "MX03",
				"selling_price": 300,
				"quantity": 1
			}
		];

		it('should return order', async () => {
			let result = await modelsOrders.createUserOrder(order);
			expect(result).to.be.equal(order);
		});
	});
});
