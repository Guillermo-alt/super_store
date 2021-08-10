/** Mercado Libre End points */
const fetch = require('node-fetch');
const middlewares = require('../../middlewares/middlewares');
const cors = require('cors');


module.exports = (app) => {
	app.get('/trendProducts', /* cors(middlewares.corsOption), */ async (req, res) => {
		try {
			let result = await fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${req.query.q}&limit=10`);
			let response = await result.json();
			res.send(response);
		} catch (err) {
			console.log('error: ' + err.message);
			res.status(400).send('error: ' + err.message);
		}
	});
	app.get('/product', /*cors(middlewares.corsOption),*/ async (req, res) => {
		try {
			let result = await fetch(`https://api.mercadolibre.com/items/${req.query.q}`);
			let response = await result.json();
			res.send(response);
		} catch (err) {
			console.log(err);
			res.status(400).send('error: ' + err.message);
		}
	});
};
