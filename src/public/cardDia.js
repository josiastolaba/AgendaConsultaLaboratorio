const card=`<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    
  </div>
</div>`
const htmlHorarioManiana = `<div class="turno">
      <h2>Turno Mañana</h2>
      <div class="form-group">
        <label for="inicioManana">Inicio:</label>
        <input type="time" id="inicioManana" name="inicioManana" required>
      </div>
      <div class="form-group">
        <label for="finManana">Fin:</label>
        <input type="time" id="finManana" name="finManana" required>
      </div>
    </div>`
    const htmlHorarioTarde= `<div class="turno">
      <h2>Turno Tarde</h2>
      <div class="form-group">
        <label for="inicioTarde">Inicio:</label>
        <input type="time" id="inicioTarde" name="inicioTarde" required>
      </div>
      <div class="form-group">
        <label for="finTarde">Fin:</label>
        <input type="time" id="finTarde" name="finTarde" required>
      </div>
    </div>`
const manejarDia =()=> {
    const dias = getDiaSelec()
   const elementDiv = document.getElementById("containerDia")
   elementDiv.innerHTML= " "
   dias.forEach(dia=>{ 
    elementDiv.innerHTML+= `<div class="card bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">${dia.valor}</div>
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
        dia_id: checkbox.getAttribute('dia_id'),
        turno: turnoSelect ? turnoSelect.value : null  // Obtenemos el turno, o null si no se encontró
      });
    });
    return diasSeleccionados
}