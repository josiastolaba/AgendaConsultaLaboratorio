const tabla = document.getElementById("turnoTable")
const turnosButton = tabla.querySelectorAll('button.select')

function seleccionarTurno(htmlElement,id_turno){
    turnosButton.forEach(button=>{
        button.innerHTML= "Seleccionar"
        button.classList.remove("btn-success")})
    document.getElementById("id_turno").value = id_turno    
    htmlElement.innerHTML = "Seleccionado"
    htmlElement.classList.add("btn-success")
}