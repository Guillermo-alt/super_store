


class admin {
    constructor (userAdmin, pass) {
        this.email = userAdmin
        this.pass = pass
        this.token = ''
        this.role = 'admin'
    }

    static async guardaAdmin (userAdmin) {
        sessionStorage.setItem('dataSession', JSON.stringify(userAdmin))
    }

    static async recuperaAdmin () {
        let resultado = await JSON.parse(sessionStorage.getItem('dataSession'))
        return resultado
    }
}



let Sign_in = document.getElementById('Sign_in')


//Logica para trabajar
//Login
Sign_in.addEventListener('click', async ()=> {

    var formulario = document.forms['form_sign'];

    admin.guardaAdmin(new admin (formulario['email'].value,formulario['pass'].value))
    console.log('sing in')
    try {
        
    let data = await admin.recuperaAdmin()

    let resultado = await fetch('http://localhost:3000/admin/login', {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": data.email,
            "password" : data.pass,
            "role" : data.role
        })
    })
        
    let datosVuelta = await resultado.json()
    data.token = datosVuelta
    console.log(data)
    admin.guardaAdmin(data)
    
    if (resultado.status === 200){
        console.log("redirecciona");
        location.href ="./adminProducts";
    }

    } catch (error) {
    console.log(error)
        alert('email or password incorrect')
    }

})



