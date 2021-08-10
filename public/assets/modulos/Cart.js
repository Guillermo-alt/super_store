//valida token de session y trae datos de usuario

/*
class Cart(user) {
    constructor() {
        let total = 0;
    }
    AddProduct(product) {
        this.products.push(product);
    };
    RemoveProduct(id) {
        this.products.remove(id);
    };
    Buy() {
        checkCreditCard();
        applyCoupon();
        pay();
    };
    getTotal() {};
    applyCoupon() {};
    checkCreditCard() {};
    pay() {};
}
class Productos() {
    constructor() {
        this.id = 0;
        this.name = ''
        this.quantity = 0;
        this.price = 0;
        this.thumnail = 0;
        this.description = '';
    };
    CreateProduct() {
        storeToDB(this);
    };
    UpdateProduct(id, product) {
        UpdateToDB(id, product);
    };
    DeleteProduct() {
        deleteFromDB(this.id);
    };
    RetrieveProduct() {
        retrieveDB(this.id);
    };
}
*/


//clase Cart

class Cart {
    constructor(clave) {
        this.clave = clave;
        this.productos = this.obtener();
        this.ML_ENDPOINT= 'product';
        this.total=0;
        this.jsonProductsCheck=[];
        
    }
    agregar(producto) {
            this.productos.push(producto);
            localStorage.setItem(this.clave,JSON.stringify( this.productos));
            let contCar = document.getElementById("contCar");
            contCar.textContent = this.obtenerConteo();
    }

    elimina(prod) {
        var i =  this.productos.indexOf(prod);
        if ( i != -1 ) {
            this.productos.splice( i,1 );    
         }
        localStorage.setItem(this.clave,JSON.stringify( this.productos));
        let hijo = document.getElementById(prod);
        hijo.parentNode.removeChild(hijo)
        console.log(this.productos); 
    
        location.reload();
     //   let contCar = document.getElementById("contCar");
      //  contCar.textContent = this.obtenerConteo();
        
       
    }


    obtener() {
        if ( this.clave in localStorage){
            return JSON.parse(localStorage.getItem(this.clave))
        }else
        return [];
        
    }
    /*existe(id) {
        return this.productos.find(producto => producto.id === id);
    }*/
    obtenerConteo() {
        return this.productos.length;
    }
    
    limpiar() {
        this.productos=[];
         localStorage.clear();
         let listProducts = document.getElementById("listProducts");
         listProducts.innerHTML = '';
         let contCar = document.getElementById("contCar");
         contCar.textContent = 0;
         let totalCar = document.getElementById("totalCar");
         totalCar.textContent = 0;
    }
    

    async checkout(){
        try {
        if( this.total >0){
        let data =  await JSON.parse(sessionStorage.getItem('dataSession'))
        if (sessionStorage['dataSession']){
        let resultado = await fetch('http://localhost:3000/user/orders', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.token,
        },
        body: JSON.stringify(this.jsonProductsCheck)
        })
        location.href="/congratulations.html"
        Carrito.limpiar();
    }else{
        location.href="/login.html"}
        }else{
            alert("sin productos")
        }
        } catch (error) {
            console.log(error);
        }
    }

    async mostrarProductos(){

        for (const i in  this.productos) {
                try {
                    if( this.productos[i].startsWith("M")){
                    const response = await fetch(`http://127.0.0.1:3000/${this.ML_ENDPOINT}?q=${this.productos[i]}`);
                    const item = await response.json(); //promesa en espera
                   // console.log(item);
                    //create json product and add to jsonProductsCheck
                    this.jsonProductsCheck.push( {
                        "product_id" : item.id,
                        "selling_price": item.price,
                        "quantity" :"1"
                    })       
                    console.log(this.jsonProductsCheck)
                    this.total+= item.price;
                    this.createElementProduct(item);
                    }
                } catch (error) {
                    throw new Error(error);
                }
          }
          let totalCar = document.getElementById("totalCar");
          totalCar.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(this.total);
    }

    async mostrarProductosLocal(){

        for (const i in  this.productos) {
                try {
                    if( this.productos[i].match(/^[0-9]+$/)){//si empieza con numeros == local
                        const response = await fetch(`http://127.0.0.1:3000/product/${this.productos[i]}`,{method: 'get'});
                        const item = await response.json(); //promesa en espera 
                       this.createElementLocal(item[0]);
                       this.jsonProductsCheck.push( {
                        "product_id" : item[0].id_product,
                        "selling_price": item[0].price,
                        "quantity" : document.getElementById(`Q${item[0].id_product}`).value
                    })
                    console.log(this.jsonProductsCheck)
                      this.total+= item[0].price;
                    }
                } catch (error) {
                    throw new Error(error);
                }
          }
          let totalCar = document.getElementById("totalCar");
          totalCar.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(this.total);
    }


    createElementProduct(item){
        let listProducts = document.getElementById("listProducts");
       

        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("d-flex");
        li.classList.add("justify-content-between");
        li.classList.add("lh-sm");
        li.setAttribute('id',item.id);

        let div = document.createElement("div");

        let h6 = document.createElement("h6");
        h6.classList.add("my-0");
        h6.textContent = item.title;

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.classList.add( "m-5");
        button.textContent = 'Borrar';
        button.setAttribute("onclick",`eliminaProducto('${item.id}')`);

        let quantity = document.createElement("input");
        quantity.setAttribute("type", "number");
        quantity.setAttribute("value", "1");
        quantity.setAttribute("min", "1");
        quantity.setAttribute("max", "5");
        quantity.setAttribute("id",`Q${item.id}`)

        let p = document.createElement("p");
        p.textContent = 'Cantidad'

        

        let itemImage = document.createElement("img");
        itemImage.setAttribute("src", item.thumbnail);
        itemImage.style.width = "100px";
        itemImage.style.height = "100px";

        let span = document.createElement("span");
        span.classList.add("text-muted");
        span.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(item.price);

        listProducts.appendChild(li);
        li.appendChild(div);
        div.appendChild(h6);
        div.appendChild(itemImage);
        li.appendChild(span);
        span.appendChild(button);
        div.appendChild(p)
        p.appendChild(quantity)
        
    }

    
    createElementLocal(item){
        let listProducts = document.getElementById("listProducts");
       

        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("d-flex");
        li.classList.add("justify-content-between");
        li.classList.add("lh-sm");
        li.setAttribute('id',item.id_product);

        let div = document.createElement("div");

        let h6 = document.createElement("h6");
        h6.classList.add("my-0");
        h6.textContent = item.name;

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.classList.add( "m-5");
        button.textContent = 'Borrar';
        button.setAttribute("onclick",`eliminaProducto('${item.id_product}')`);

        
        let quantity = document.createElement("input");
        quantity.setAttribute("type", "number");
        quantity.setAttribute("value", "1");
        quantity.setAttribute("min", "1");
        quantity.setAttribute("max", "5");
        quantity.setAttribute("id",`Q${item.id_product}`)

        let p = document.createElement("p");
        p.textContent = 'Cantidad'



        let itemImage = document.createElement("img");
        itemImage.setAttribute("src", item.image);
        itemImage.style.width = "100px";
        itemImage.style.height = "100px";

        let span = document.createElement("span");
        span.classList.add("text-muted");
        span.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(item.price);

        listProducts.appendChild(li);
        li.appendChild(div);
        div.appendChild(h6);
        div.appendChild(itemImage);
        li.appendChild(span);
        span.appendChild(button);
        div.appendChild(p)
        p.appendChild(quantity)
    }
}


//***************/
let limp = document.getElementById('limp')
let Carrito = new Cart('Productos');

let contCar = document.getElementById("contCar");
contCar.textContent = Carrito.obtenerConteo();


//fucniones externas

function checkout(){
    Carrito.checkout();
}


function clickAdd(prod){
    Carrito.agregar(prod);
    console.log(Carrito.productos);
}

function eliminaProducto(prod){
    Carrito.elimina(prod);
}

function cargarProductos(){
    Carrito.mostrarProductos(); 
    Carrito.mostrarProductosLocal();
    console.log(this.jsonProductsCheck)
}

function clearCar(){
    Carrito.limpiar();
}
function Sign_out(){
	var opcion = confirm("Desea salir?");
    if (opcion == true) {
		sessionStorage.clear(); 
		location.href = '/login.html'
	}
}

