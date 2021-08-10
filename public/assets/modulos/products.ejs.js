console.log('Hola mundo desde el servidor pero lo enviamos al front')
//eventos para vista productosCrud.ejs /borones CRUD PRODUCTOS

//verifica session y token y trae

window.onload = async function (){
    let data =  await JSON.parse(sessionStorage.getItem('dataSession'))

    if (sessionStorage['dataSession'] && data.role==="admin"){
    let res = await fetch('http://localhost:3000/userAdmin', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.token
          }
    })
         let result =  await res.json()
         document.getElementById('dataUser').textContent  = `Bienvenido ${result.role} ${result.names} id ${result.id}`
    }else{
        
        location.href = '/loginAdmin.html'
    }
    

}

const exit = document.getElementById('exit')
exit.addEventListener('click', async ()=> {
    sessionStorage.clear(); 
    location.href = '/loginAdmin.html'
})


//peticion a endpoint vista (read crud) /mustra productos DB
const traerP = document.getElementById('getProd')
traerP.addEventListener('click', async ()=> {
    location.reload();
})



async function deleteProduct(id_prod){
    var opcion = confirm("Desea eliminar el producto");
    if (opcion == true) {
    try {
        let resultado = await fetch(`http://127.0.0.1:3000/products/${id_prod}`,{method: 'put'})
        console.log('se elimino producto');
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
	} else {
        console.log('se cancelo la eliminacion');
	}
    location.reload()
}

