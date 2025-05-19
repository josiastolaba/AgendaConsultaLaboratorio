const card=`<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    
  </div>
</div>`
const htmlHorarioManiana = `<div class="turno">
      <h2>Turno Mañana</h2>
      <div class="form-group">
        <label for="inicioManana">Inicio:</label>
        <input type="time" class="inicioManana" name="inicioManana" required>
      </div>
      <div class="form-group">
        <label for="finManana">Fin:</label>
        <input type="time" class="finManana" name="finManana" required>
      </div>
    </div>`
    const htmlHorarioTarde= `<div class="turno">
      <h2>Turno Tarde</h2>
      <div class="form-group">
        <label for="inicioTarde">Inicio:</label>
        <input type="time" class="inicioTarde" name="inicioTarde" required>
      </div>
      <div class="form-group">
        <label for="finTarde">Fin:</label>
        <input type="time" class="finTarde" name="finTarde" required>
      </div>
    </div>`
const manejarDia =()=> {
    const dias = getDiaSelec()
   const elementDiv = document.getElementById("containerDia")
   elementDiv.innerHTML= " "
   dias.forEach(dia=>{ 
    elementDiv.innerHTML+= `<div class="card bg-primary mb-3 turnoDia" id_dia=${dia.valor} style="max-width: 18rem;">
  <div class="card-header">${dia.nombre_dia}</div>
  <div class="card-body">
    ${(dia.turno ==="mañana") ? htmlHorarioManiana : " "}
     ${(dia.turno ==="tarde") ? htmlHorarioTarde : " "}
      ${(dia.turno ==="ambos") ? htmlHorarioManiana.concat(htmlHorarioTarde) : " "}
  </div>
</div>`})
}

const getDiaSelec = ()=>{
    let diasSeleccionados = [];
    document.querySelectorAll('input[type="checkbox"][name="dias"]:checked')
    .forEach(checkbox => {
      // Buscamos el <select> asociado usando el valor del checkbox
      const turnoSelect = document.querySelector(`select[name="turno_${checkbox.value}"]`);

      diasSeleccionados.push({
        valor: checkbox.value,
        nombre_dia: checkbox.getAttribute('nombre_dia'),
        turno: turnoSelect ? turnoSelect.value : null  // Obtenemos el turno, o null si no se encontró
      });
    });
    return diasSeleccionados
}

let horarioSelec = []

const cardDias = ()=>{
  horarioSelec = []
  const container = document.getElementById('containerDia')
  const cards = container.querySelectorAll('.turnoDia')
  cards.forEach(card=>{
    horarioSelec.push({
      id_dia: card.getAttribute('id_dia') || null
      ,inicioManana: card.querySelector('.inicioManana')?.value || null
      ,finManana: card.querySelector('.finManana')?.value || null
      ,inicioTarde: card.querySelector('.inicioTarde')?.value || null
      ,finTarde: card.querySelector('.finTarde')?.value || null
    })
  })
  console.log(horarioSelec)
  return horarioSelec
}

const manejarAgenda = async ()=>{
  const idSucursal = document.getElementById('id_sucursal').value
  const idMatricula = document.getElementById('matricula').value
  const intervalo = document.getElementById('intervalo_turno').value
  const sobreturno = document.getElementById('max_sobreTurno').value
  const estadoAgenda = document.getElementById('estado_agenda').value
  const idClasificacion = document.getElementById('id_clasificacion').value
  const descripcion = document.getElementById('descripcion').value
  const agenda = {idSucursal,idMatricula,intervalo,sobreturno,estadoAgenda,idClasificacion,descripcion,horarioSelec}
  const response = await fetch('/agendas/crearAgenda',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(agenda),
  })
  if(response.redirected){
    window.location.href=response.url
  }
}