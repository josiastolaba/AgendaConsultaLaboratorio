
async function iniciarSesion(){
    const dni = document.getElementById("dni").value
    const password = document.getElementById("password").value
    const data = {dni,password}
    console.log(data)
    const response = await fetch("/inicio/autenticar", {method: "POST",
        headers: {"Content-Type":"application/json",},
        body: JSON.stringify(data),
    })
    const mensaje = document.getElementById("mensaje")
    switch (response.status) {
        case 401: 
            mensaje.innerHTML="*Datos Incorrectos"
            break;
        case 500: 
            mensaje.innerHTML="*Error inesperado"
            break;
        default:
            break;
    }
    if(response.redirected){
        window.location.href=response.url
    }
}