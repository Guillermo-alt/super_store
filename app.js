/** Import required modules */

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const middlewares = require('./middlewares/middlewares');
const mercadolibreRoutes = require('./app/view/mercado-libre.routes');
const viewUsers = require('./app/view/view.Users');
const db = require('./db/db.conection');
const users = require('./db/db.model.users');
const viewProducts = require('./app/view/view.products');
const products = require('./db/db.modelo.products');
const order = require('./db/db.model.order');
const sells = require('./app/view/vew.sells');
// Antes de usar middlewarenpm install body-parser
const bodyParser = require('body-parser');


//Utilice middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/** Global middlewares */
app.use(cors());
app.use(express.json());
app.use(middlewares.limiter);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


/** Start server */
async function startServer() {
	try {
		await users.sync({ alter: true });
		await products.sync({ alter: true });
		await order.Orders.sync({ alter: true });
		await order.UserOrders.sync({ alter: true });
		await db.authenticate();
		console.log('Conected to Database');
		app.listen(process.env.PORT, process.env.HOST, () => {
			console.log(`Server started at http://${process.env.HOST}:${process.env.PORT}`);
		});
	} catch (error) {
		console.error('Conection to Database failed: ' + error.message);
	}
}

startServer();

/** Start API routes */
mercadolibreRoutes(app);
viewProducts(app);
viewUsers(app);
sells(app);
