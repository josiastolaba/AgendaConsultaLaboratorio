document.addEventListener('DOMContentLoaded',cargarCalendario)
let request_calendar = "/events.json"
function cargarCalendario(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        eventOrder: "timeStart",
        events:function(info, successCallback, failureCallback){
            fetch("http://localhost:3000/agendas/getAgenda/" + document.getElementById("agenda").value)
                .then(function(response){
                    console.log(response.status)
                    return response.json()
                })
                .then(function(data){
                    const eventos = []
                    let events = eventos
                    let datos = data.agenda.map(function(event){
                        const fechaActual = new Date()
                        const fechaFin = new Date(fechaActual)
                        fechaFin.setMonth(fechaFin.getMonth() + 2)
                        fechaFin.setDate(1)
                        fechaFin.setDate(fechaFin.getDate() - 1)
                        while(fechaActual <= fechaFin){
                            if(fechaActual.getDay() === (event.id_dia - 1)){
                                if(event.hora_inicio_m && event.hora_fin_m){
                                    const [horasIM,minutosIM] = event.hora_inicio_m.split(":").map(Number)
                                    const [horasFM,minutosFM] = event.hora_fin_m.split(":").map(Number)
                                    let horaInicioM = new Date()
                                    let horaFinM = new Date()
                                    horaInicioM.setHours(horasIM,minutosIM,0,0)
                                    horaFinM.setHours(horasFM,minutosFM,0,0)
                                    let horafinturnoM = new Date()
                                    while(horaInicioM < horaFinM){
                                        horafinturnoM.setHours(horaInicioM.getHours(),horaInicioM.getMinutes(),0,0)
                                        horafinturnoM.setMinutes(horafinturnoM.getMinutes() + Number(event.intervalo_turno))
                                        const turnosEncontrados = getInfoDelTurno(horaInicioM.getHours()+":"+horaInicioM.getMinutes().toString().padStart(2, '0')+":00", fechaActual, data.turnos)
                                        if(turnosEncontrados.length != 0){
                                            turnosEncontrados.forEach(turno => {
                                                eventos.push({
                                                    classNames: [turno.clase],
                                                    title: turno.sobreturno ? "Sobreturno" : [turno.title],
                                                    start: new Date(fechaActual),
                                                    end: new Date(fechaActual),
                                                    url: `/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioM}&hora_fin=${horafinturnoM}&fecha=${fechaActual.toString()}${turno.id_turno ? `&id_turno=${turno.id_turno}` : ""}`,
                                                    location: event.eventLocation || "",
                                                    timeStart: horaInicioM.getHours()+":"+horaInicioM.getMinutes().toString().padStart(2, '0'),
                                                    timeEnd: horafinturnoM.getHours()+":"+horafinturnoM.getMinutes().toString().padStart(2, '0'),
                                                })
                                            })
                                        }else{
                                            eventos.push({
                                                classNames: ['libre'],
                                                title: "Libre",
                                                start: new Date(fechaActual),
                                                end: new Date(fechaActual),
                                                url: `/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioM}&hora_fin=${horafinturnoM}&fecha=${fechaActual.toString()}${turnosEncontrados.id_turno ? `&id_turno=${turnosEncontrados.id_turno}` : ""}`,
                                                location: event.eventLocation || "",
                                                timeStart: horaInicioM.getHours()+":"+horaInicioM.getMinutes().toString().padStart(2, '0'),
                                                timeEnd: horafinturnoM.getHours()+":"+horafinturnoM.getMinutes().toString().padStart(2, '0'),
                                            })
                                        }
                                        horaInicioM.setMinutes(horaInicioM.getMinutes() + Number(event.intervalo_turno))
                                    }
                                }
                                if(event.horario_inicio_t && event.horario_fin_t){
                                    const [horasIT,minutosIT] = event.horario_inicio_t.split(":").map(Number)
                                    const [horasFT,minutosFT] = event.horario_fin_t.split(":").map(Number)
                                    let horaInicioT = new Date()
                                    let horaFinT = new Date()
                                    horaInicioT.setHours(horasIT,minutosIT,0,0)
                                    horaFinT.setHours(horasFT,minutosFT,0,0)
                                    let horafinturnoT = new Date()
                                    while(horaInicioT < horaFinT){
                                        horafinturnoT.setHours(horaInicioT.getHours(),horaInicioT.getMinutes(),0,0)
                                        horafinturnoT.setMinutes(horafinturnoT.getMinutes() + Number(event.intervalo_turno))
                                        const turnosEncontrados = getInfoDelTurno(horaInicioT.getHours()+":"+horaInicioT.getMinutes().toString().padStart(2, '0')+":00", fechaActual, data.turnos)
                                        if(turnosEncontrados.length != 0){
                                            turnosEncontrados.forEach(turno => {
                                                eventos.push({
                                                    classNames: [turno.clase],
                                                    title: turno.sobreturno ? "Sobreturno" : [turno.title],
                                                    start: new Date(fechaActual),
                                                    end: new Date(fechaActual),
                                                    url: `/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioT}&hora_fin=${horafinturnoT}&fecha=${fechaActual.toString()}${turno.id_turno ? `&id_turno=${turno.id_turno}` : ""}`,
                                                    location: event.eventLocation || "",
                                                    timeStart: horaInicioT.getHours()+":"+horaInicioT.getMinutes().toString().padStart(2, '0'),
                                                    timeEnd: horafinturnoT.getHours()+":"+horafinturnoT.getMinutes().toString().padStart(2, '0'),
                                                })
                                            })
                                        }else{
                                            eventos.push({
                                                classNames: ['libre'],
                                                title: "Libre",
                                                start: new Date(fechaActual),
                                                end: new Date(fechaActual),
                                                url: `/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioT}&hora_fin=${horafinturnoT}&fecha=${fechaActual.toString()}${turnosEncontrados.id_turno ? `&id_turno=${turnosEncontrados.id_turno}` : ""}${turnosEncontrados.dni ? `&dni=${turnosEncontrados.dni}` : ""}`,
                                                location: event.eventLocation || "",
                                                timeStart: horaInicioT.getHours()+":"+horaInicioT.getMinutes().toString().padStart(2, '0'),
                                                timeEnd: horafinturnoT.getHours()+":"+horafinturnoT.getMinutes().toString().padStart(2, '0'),
                                            })
                                        }  
                                        horaInicioT.setMinutes(horaInicioT.getMinutes() + Number(event.intervalo_turno))
                                    }
                                }
                            }
                            fechaActual.setDate(fechaActual.getDate() + 1)
                        }
                        return eventos
                    })
                    successCallback(events)
                })
                .catch(function(error){
                    failureCallback(error)
                })
        },
        eventContent: function(info){
            return {
                html: `
                <div style="overflow: hidden;margin-top:5px;color: #ffffff;:rgb(0, 0, 0); font-size: 20px; position: relative;  cursor: pointer; font-family: 'Inter', sans-serif;">
                    <!--<div><strong>${info.event.title}</strong></div>
                    <div>Location: ${info.event.extendedProps.location}</div>
                    <div>Date: ${info.event.start.toLocaleDateString(
                        "es-US",
                        {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }
                    )}</div>-->
                    <div>${info.event.title}</div>
                    <div> ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
                </div>
                `
            }
        },

        eventMouseEnter: function(mouseEnterInfo){
            let el = mouseEnterInfo.el
            el.classList.add("relative")
            let newEl = document.createElement("div")
            let newElTitle = mouseEnterInfo.event.title
            let newElLocation = mouseEnterInfo.event.extendedProps.location
            newEl.innerHTML = `
                <!--<div
                    class="fc-hoverable-event"
                    style="position: absolute; bottom: 100%; left: 0; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;"
                >
                    <strong>${newElTitle}</strong>
                    <div>Location: ${newElLocation}</div>
                </div>-->
            `
            el.after(newEl)
        },
        eventMouseLeave: function(){
            const hoverEl = document.querySelector(".fc-hoverable-event");
            if (hoverEl) hoverEl.remove();
        }
    });
    calendar.render();
}
function getInfoDelTurno(hora, fecha, turnos) {
    try {
        console.log("getInfoDelTurno")
        const TurEncontrados = [];
        const horaCompleta = normalizarHora(hora)
        for (let i = 0; i < turnos.length; i++) {
            const turno = turnos[i];
            const fechaTurno = new Date(turno.fecha);
            if (
                turno.inicio_turno === horaCompleta &&
                fechaTurno.getDate() === fecha.getDate() &&
                fechaTurno.getMonth() === fecha.getMonth() &&
                fechaTurno.getFullYear() === fecha.getFullYear()
            ) {
                TurEncontrados.push({
                    clase: getClaseEstado(turno.id_estado_turno),
                    id_turno: turno.id_turno,
                    title: getClaseTitulo(turno.id_estado_turno),
                    sobreturno: turno.sobreturno || false
                });
            }
        }
        return TurEncontrados
    } catch (error) {
        console.log(error)
    }
}

function normalizarHora(h) {
    const [hh, mm, ss = '00'] = h.split(":");
    return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`;
}

function getClaseEstado(id_estado_turno) {
    switch (id_estado_turno) {
        case 2: return 'reservado';
        case 3: return 'confirmado';
        case 4: return 'cancelado';
        case 5: return 'ausente'
        case 6: return 'presente';
        case 7: return 'en-consulta';
        case 8: return 'atendido';
        default: return 'libre';
    }
}

function getClaseTitulo(id_estado_turno) {
    switch (id_estado_turno) {
        case 2: return "Reservado";
        case 3: return "Confirmado";
        case 4: return "Cancelado";
        case 5: return "Ausente";
        case 6: return "Presente";
        case 7: return "En consulta";
        case 8: return "Atendido";
        default: return "Libre";
    }
}