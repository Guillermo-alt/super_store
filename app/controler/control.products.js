//import the modules to use
const modelProducts = require('../model/model.products')

//export the modules to user

//show products from the model products - database
module.exports.getAllProducts = async ()=> {
    try {
        const result = await modelProducts.getAllProducts()
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('product controller error')
    }
}
//get product->  id
module.exports.getProductId = async (id)=> {
    try {
        const result = await modelProducts.getProductId(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('product controller error')
    }
}

//get product->  category
module.exports.getProductsCategory = async (category)=> {
    try {
        const result = await modelProducts.getProductsCategory(category)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('product controller error')
    }
}

//delete product -- active = 0
module.exports.deleteProduct = async (id)=> {
    try {
        const result = await modelProducts.deleteProduct(id)
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('product controller error')
    }
}
//create product
module.exports.createProduct = async (product)=> {
    try {
        const result = await modelProducts.createProduct(product)
       
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('product controller error')
    }
    
}

//update product
module.exports.updateProduct = async (product)=> {
    try {
        const result = await modelProducts.updateProduct(product)
       
        return result
    }catch (error) {
        console.log(error)
        throw new Error ('Desde el controlador paso algo')
    }
    
}