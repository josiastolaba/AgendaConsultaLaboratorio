const horaInicioManiana = document.getElementById("hora_inicio_maniana")
const intervaloTurno = document.getElementById("intervalo_turno")
const horaFinManiana = document.getElementById("hora_fin_maniana")
const horaInicioTarde = document.getElementById("hora_inicio_tarde")
const horaFinTarde = document.getElementById("hora_fin_tarde")

const fechaInicio = document.getElementById("fecha_inicio")
const fechaFin = document.getElementById("fecha_fin")

const siguienteSeccion = (seccionActual,id_seccion) => {
    seccionActual.parentElement.classList.add("d-none")
    const nextSection = document.getElementById(id_seccion)
    nextSection.classList.remove("d-none")
}
const anteriorSeccion = (seccionActual,id_seccion) => {
    seccionActual.parentElement.classList.add("d-none")
    const previousSection = document.getElementById(id_seccion)
    previousSection.classList.remove("d-none")
}

const controlHFinMayorMenorHInicio = ()=>{
    const horaInicioManianaDate = moment(horaInicioManiana.value,"HH:mm")._d
    const horaInicioTardeDate = moment(horaInicioTarde.value,"HH:mm")._d
    console.log(horaInicioManianaDate,horaInicioTardeDate)
}

// const controlHFinMayorMenorHInicio = ()=>{
//     const [horasm, minutosm] = horaInicioManiana.value.split(":")
//     const [horast, minutost] = horaInicioTarde.value.split(":")
//     const horaMinimaDateM = new Date()
//     const horaMinimaDateT = new Date()
//     horaMinimaDateM.setHours(parseInt(horasm, 10), parseInt(minutosm, 10), 0);
//     horaMinimaDateT.setHours(parseInt(horast, 10), parseInt(minutost, 10), 0);
//     if(intervaloTurno.value){
//         const [horasI, minutosI] = intervaloTurno.value.split(":")
//         const intervaloTurnoDate = new Date()
//         intervaloTurnoDate.setHours(parseInt(horasI, 10), parseInt(minutosI, 10), 0);
//         horaMinimaDateM.setHours(horaMinimaDateM.getHours() + intervaloTurnoDate.getHours());
//         horaMinimaDateM.setMinutes(horaMinimaDateM.getMinutes() + intervaloTurnoDate.getMinutes());
//         intervaloTurnoDate.setHours(parseInt(horasI, 10), parseInt(minutosI, 10), 0);
//         horaMinimaDateT.setHours(horaMinimaDateT.getHours() + intervaloTurnoDate.getHours());
//         horaMinimaDateT.setMinutes(horaMinimaDateT.getMinutes() + intervaloTurnoDate.getMinutes());
//     }
//     const newTimeM = horaMinimaDateM.toTimeString().slice(0, 5);
//     horaFinManiana.setAttribute("min", newTimeM)
//     const newTimeT = horaMinimaDateT.toTimeString().slice(0, 5);
//     horaFinTarde.setAttribute("min", newTimeT)
//     if(horaMinimaDateM >= horaFinManiana){

//     }
// }

const controlFechasAnterior = ()=>{
    if(fechaInicio.value)
        fechaFin.setAttribute("min", fechaInicio.value)
}

const controlFechasPosterior = ()=>{
    if(fechaFin.value)
        fechaInicio.setAttribute("max", fechaFin.value)
}

// Obtener todos los radio buttons
const radioButtons = document.querySelectorAll('input[name="turno"]');

// Agregar el listener a cada botón

const turnoManiana = document.getElementById("turnomaniana")
const turnoTarde = document.getElementById("turnotarde")

const seleccionarTurno = (e)=>{
    const selectedValue = e.target.value
    console.log(selectedValue)
    switch (selectedValue) {
        case "mañana":
            turnoTarde.classList.add("d-none")
            turnoManiana.classList.remove("d-none")
            break;
        case "tarde":
            turnoManiana.classList.add("d-none")
            turnoTarde.classList.remove("d-none")
            break;
        case "doble":
            turnoManiana.classList.remove("d-none")
            turnoTarde.classList.remove("d-none")
            break;
        default:
            break;
    }
}

radioButtons.forEach(radio => {
    radio.addEventListener('change', (event)=>{
        seleccionarTurno(event)
    })
  })

fechaInicio.addEventListener("input", controlFechasAnterior)
fechaFin.addEventListener("input", controlFechasPosterior)


horaInicioManiana.addEventListener("input", controlHFinMayorMenorHInicio())
horaInicioTarde.addEventListener("input", controlHFinMayorMenorHInicio())
intervaloTurno.addEventListener("input", controlHFinMayorMenorHInicio())



