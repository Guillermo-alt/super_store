//import the modules to use
const controlProducts = require('../controler/control.products')
const cors = require('cors');
const middlewares = require('../../middlewares/middlewares');
const path = require('path');  


module.exports = (app) => {//show database products
    app.get('/adminProducts', async (req,res)=> {
        try{
            let result = await controlProducts.getAllProducts();
           // console.log(result )
            res.render("products", {resultProd:  result })
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    })

    //show database product locals -- type column category
    app.get('/products/:category', /*cors(middlewares.corsOption)*/async (req,res)=> {
        try{
            let result = await controlProducts.getProductsCategory(req.params.category);
           // console.log(result )
            res.send(result)
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    }) 
    
    //getProduct id
    app.get('/product/:id',/*cors(middlewares.corsOption)*/ async (req,res)=> {
        try{
            let result = await controlProducts.getProductId(req.params.id);
           // console.log(result )
            res.send(result)
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    }) 
    
    //delete product - change asset value to 0  //does not allow patch
    app.put('/products/:id', /*cors(middlewares.corsOption),*/async (req,res)=> {
        try{
            let result  = await controlProducts.deleteProduct(req.params.id)
           // console.log(result )
            res.send('product deleted')
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    })

    //create new product
    app.post('/products',/*cors(middlewares.corsOption),*/async (req,res)=> {
        try{
           let result  = await controlProducts.createProduct(req.body)
          res.send(result );
            // res.send(result)

           location.href='login.html'
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    })

     //update product
    app.post('/products/update'/*,cors(middlewares.corsOption)*/ ,async (req,res)=> {
        try{
           // let result = await controlProducts.deleteProduct(req.body.id)
           let result  = await controlProducts.updateProduct(req.body)
               res.send(req.body);
          //  res.send(resultado)
          //  console.log(result )
        }catch (error) {
            console.log(error)
            res.status(500).json('error in the request view products')
        } 
    })
};
