//Importo los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./db.conection')

//I define the DB models

const Products = sequelize.define('products', {
    id_product: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    qualification: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    brand: {
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    origin: {
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    stock: {
        type:DataTypes.INTEGER(),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN(),
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Products