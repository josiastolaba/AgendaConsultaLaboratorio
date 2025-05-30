document.addEventListener('DOMContentLoaded',cargarCalendario)
let request_calendar = "/events.json"
function cargarCalendario(){

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        
        events:function(info, successCallback, failureCallback){
            fetch("http://localhost:3000/agendas/getAgenda/" + document.getElementById("agenda").value)
                .then(function(response){
                    console.log(response.status)
                    return response.json()
                })
                .then(function(data){
                    console.log(data)
                    const eventos = []
                    let events = eventos
                    let datos = data.map(function(event){
                        const fechaActual = new Date()
                        const fechaFin = new Date(fechaActual)
                        fechaFin.setMonth(fechaFin.getMonth() + 2)
                        fechaFin.setDate(1)
                        fechaFin.setDate(fechaFin.getDate() - 1)
                        while(fechaActual <= fechaFin){
                            //console.log(fechaActual.getDay(),"--",event.id_dia)
                            //console.log(event)
                            if(fechaActual.getDay() === (event.id_dia - 1)){
                                const [horasIM,minutosIM] = event.hora_inicio_m.split(":").map(Number)
                                const [horasFM,minutosFM] = event.hora_fin_m.split(":").map(Number)
                                let horaInicioM = new Date()
                                let horaFinM = new Date()
                                horaInicioM.setHours(horasIM,minutosIM,0,0)
                                horaFinM.setHours(horasFM,minutosFM,0,0)
                                while(horaInicioM < horaFinM){
                                    eventos.push({
                                        title: ".",
                                        start: new Date(fechaActual),
                                        end: new Date(fechaActual),
                                        url:`/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioM}&hora_fin=${horaFinM}&fecha=${fechaActual}`,
                                        location: event.eventLocation || "",
                                        timeStart: horaInicioM.getHours()+":"+horaInicioM.getMinutes(),
                                        timeEnd: horaFinM.getHours()+":"+horaFinM.getMinutes(),
                                        
                                    })
                                    horaInicioM.setMinutes(horaInicioM.getMinutes() + Number(event.intervalo_turno))
                                }
                                if(event.horario_inicio_t && event.horario_fin_t){
                                    const [horasIT,minutosIT] = event.horario_inicio_t.split(":").map(Number)
                                    const [horasFT,minutosFT] = event.horario_fin_t.split(":").map(Number)
                                    let horaInicioT = new Date()
                                    let horaFinT = new Date()
                                    horaInicioT.setHours(horasIT,minutosIT,0,0)
                                    horaFinT.setHours(horasFT,minutosFT,0,0)
                                    while(horaInicioT < horaFinT){
                                        eventos.push({
                                            title: ".",
                                            start: new Date(fechaActual),
                                            end: new Date(fechaActual),
                                            url:`/turno/turnoSeleccionado?id_agenda=${event.id_agenda}&hora_inicio=${horaInicioT}&hora_fin=${horaFinT}&fecha=${fechaActual}`,
                                            location: event.eventLocation || "",
                                            timeStart: horaInicioT.getHours()+":"+horaInicioT.getMinutes(),
                                            timeEnd: horaFinT.getHours()+":"+horaFinT.getMinutes(),
                                        
                                        })
                                    horaInicioT.setMinutes(horaInicioT.getMinutes() + Number(event.intervalo_turno))
                                    }
                                }
                                
                                
                            }
                            fechaActual.setDate(fechaActual.getDate() + 1)
                        }
                        console.log(eventos)
                        return eventos
                    })
                    successCallback(events)
                })
                .catch(function(error){
                    failureCallback(error)
                })
        },
        eventContent: function(info){
            console.log("Hola Mundo!")
            return {
                html: `
                <div style="overflow: hidden;margin-top:5px; font-size: 20px; positon: relative;  cursor: pointer; font-family: 'Inter', sans-serif;">
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
                    <div> ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
                </div>
                `
            }
        },

        eventMouseEnter: function(mouseEnterInfo){
            console.log(mouseEnterInfo)
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
            document.querySelector(".fc-hoverable-event").remove()
        }
    });
    
    calendar.render();
}

function saludo(){
    console.log("HOLA MUNDO!!")
}