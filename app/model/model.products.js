//import the modules to use
const sequelize = require('sequelize')
const Products = require('../../db/db.modelo.products')


//if existe
module.exports.productExists = async (id)=>{

}

//show products from  - database products
module.exports.getAllProducts = async ()=> { //while are actives
    try {  
        let result =  await Products.findAll({
            where: {
            active: 1
            }
        })
        return result;
    }  catch (err) {
        throw new Error (err+ 'problem in product models') 
    }
   // console.log("All Products:", JSON.stringify(result, null, 2)); 
   
}

module.exports.getProductId = async (id)=> { //while are actives
    try {  
        let result =  await Products.findAll({
            where: {
            active: 1,
            id_product: id
            }
        })
        return result;
    }  catch (err) {
        throw new Error (err+ 'problem in product models') 
    }
   // console.log("All Products:", JSON.stringify(result, null, 2)); 
   
}
//get products category local
module.exports.getProductsCategory = async (category)=> { //while are actives
    try {  
        let result =  await Products.findAll({
            where: {
            active: 1,
            category: category
            }
        })
        return result;
    }  catch (err) {
        throw new Error (err+ 'problem in product models') 
    }
   // console.log("All Products:", JSON.stringify(result, null, 2)); 
   
}



//"delete" update, active =  0
module.exports.deleteProduct = async (id)=> { 
    try { 
        let result =  await Products.update({
            active: 0
        }, {
            where: { id_product: id }
        })

        if(result == 1){// !careful --->  IF Y EL AWAIT  
            try {
                result = await Products.findOne({ where: {id_product: id} })
            } catch (err) {
                throw new Error (err+ 'problem in product models') 
            }
        }
        return result;   
        }catch (err) {
            throw new Error (err+ 'problem in product models')
    }
   // console.log("All Products:", JSON.stringify(result, null, 2)); 
    
}


//create products
module.exports.createProduct = async (product)=> { 
    try{
        let result = await Products.create({
            name:product.name,
             price:product.price,
             description:product.desc,
             image:`./assets/img/${product.image}`,
             qualification:product.quali,
             category:product.categ,
             stock:product.stock ,
             brand:product.brand,
             origin:'local',
             active:1})
        return result;

    }catch(err){
        console.log(err)
        throw new Error (err+ 'problem in product models')
    }
}


//update product
module.exports.updateProduct = async (product)=> { 

    try{
        let result = Products.update({
            name: product.name,
            price: product.price,
            description:product.desc,
            image:`./assets/img/${product.image}`,
            qualification:product.quali,
            brand: product.brand,
            category:product.categ,
            stock:product.stock, 
            origin: 'local',
        }, {
            where: {
                id_product: product.id,
            }
        })
        return result;

    }catch(err){
        console.log(err)
        throw new Error (err+ 'problem in product models')
    }
}