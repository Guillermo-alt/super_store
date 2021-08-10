/** Constantes */

//verfica si hay seciones activas para traer

window.onload = async function (){
    let data =  await JSON.parse(sessionStorage.getItem('dataSession'))

    if (sessionStorage['dataSession']){
		try {
    let res = await fetch('http://localhost:3000/user', {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.token
          }
    })
         let result =  await res.json()
         document.getElementById('user').textContent  = `Bienvenido ${result.userName}`
		 document.getElementById("Sign_in").style.visibility = "hidden";
		 document.getElementById("Sign_up").style.visibility = "hidden";

		} catch (error) {
			console.log(error)
		}
    
    }
    
}



const defaultSearch = 'Tarjeta grafica';
const defaultCategory = 'mouse';
const ML_ENDPOINT = 'trendProducts';




/** Clase Store */
class Store {
	constructor(key) {
		this.word = key;
	}

	createTrendElement(product) {
		let productContainer = document.getElementById("product-container");

		let row = document.createElement("div");
		row.classList.add("row");
		row.classList.add("featurette");

		let divider = document.createElement("hr");
		divider.classList.add("featurette-divider");

		let headerDiv = document.createElement("div");
		headerDiv.classList.add("col-md-7");

		let productHeader = document.createElement("h2");
		productHeader.classList.add("featurette-heading");
		productHeader.textContent = product.title;

		let itemPrice = document.createElement('p');
		itemPrice.classList.add('lead');
		itemPrice.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(product.price);

		let imageContainer = document.createElement("div");
		imageContainer.classList.add("col-md-5");

		let itemImage = document.createElement("img");
		itemImage.setAttribute("src", product.thumbnail);
		itemImage.style.width = "300px";
		itemImage.style.height = "300px";

		let addButton = document.createElement("button");
		addButton.setAttribute("id", "addToCar");
		addButton.setAttribute("onclick", `clickAdd('${product.id}')`);
		addButton.classList.add("btn");
		addButton.classList.add("btn-primary");
		addButton.textContent = 'Add to cart';

		productContainer.appendChild(divider);
		productContainer.appendChild(row);
		row.appendChild(headerDiv);
		headerDiv.appendChild(productHeader);
		headerDiv.appendChild(itemPrice);
		row.appendChild(imageContainer);
		imageContainer.appendChild(itemImage);
		imageContainer.appendChild(addButton);
	}
//create element local
    createTrendElementLocal(product) {
		let productContainer = document.getElementById("product-local-container");

		let row = document.createElement("div");
		row.classList.add("row");
		row.classList.add("featurette");

		let divider = document.createElement("hr");
		divider.classList.add("featurette-divider");

		let headerDiv = document.createElement("div");
		headerDiv.classList.add("col-md-7");

		let productHeader = document.createElement("h2");
		productHeader.classList.add("featurette-heading");
		productHeader.textContent = product.name;

		let itemPrice = document.createElement('p');
		itemPrice.classList.add('lead');
		itemPrice.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(product.price);

		let imageContainer = document.createElement("div");
		imageContainer.classList.add("col-md-5");

		let itemImage = document.createElement("img");
		itemImage.setAttribute("src", product.image);
		itemImage.style.width = "300px";
		itemImage.style.height = "300px";

		let addButton = document.createElement("button");
		addButton.setAttribute("id", "addToCar");
		addButton.setAttribute("onclick", `clickAdd('${product.id_product}')`);
		addButton.classList.add("btn");
		addButton.classList.add("btn-primary");
		addButton.textContent = 'Add to cart';

		productContainer.appendChild(divider);
		productContainer.appendChild(row);
		row.appendChild(headerDiv);
		headerDiv.appendChild(productHeader);
		headerDiv.appendChild(itemPrice);
		row.appendChild(imageContainer);
		imageContainer.appendChild(itemImage);
		imageContainer.appendChild(addButton);
	}
	/** funcion que usa la palabras claves para buscar y traer productos */
	async getProductsFromKeyword(word) {
		try {
			const response = await fetch(`http://127.0.0.1:3000/${ML_ENDPOINT}?q=${word}`);
			const products = await response.json(); //promesa en espera
			return products;
		} catch (error) {
			throw error;
		}

	}
//** get products local db super store */
    async getProductsLocal(category) {
		let productContainer = document.getElementById("product-local-container");
		productContainer.innerHTML = '';
		try {
			const response = await fetch(`http://127.0.0.1:3000/products/${category}`)
			const products = await response.json(); //promesa en espera

            for (let product in products) {
				this.createTrendElementLocal(products[product]);
			}
		} catch (error) {
			throw error;
		}

	}

	/** trae productos por palabra clave */
	async getTrendProducts() {
		let productContainer = document.getElementById("product-container");
		productContainer.innerHTML = '';

		try {
			this.CategoryProducts = await this.getProductsFromKeyword(this.word); //palabras claves
			for (let product in this.CategoryProducts.results) {
				this.createTrendElement(this.CategoryProducts.results[product]);
			}
		} catch (error) {
			throw error;
		}
	}
    //valida antes
	start() {
        if(window.location.pathname =='/index.html' || window.location.pathname =='/'){
            myStore.getTrendProducts();
        }
        if(window.location.pathname =='/LocalProducts.html'){
            myStore.getProductsLocal(defaultCategory);
        }
		
	}
}

let myStore = new Store(defaultSearch);
myStore.start();

function setSearchValue(store) {
	let search = document.getElementById('Search');

	try {
		getSearchProducts(store, search.value);
	} catch (error) {
		throw error;
	}
}

function getSearchProducts(store, keywords) {
	store.word = keywords;
	try {
		store.getTrendProducts();
	} catch (error) {
		throw error;
	}
}

function getCategory(cat){
	myStore.getProductsLocal(cat)
}
