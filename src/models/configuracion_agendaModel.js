import connection from '../database/db.js'

export const crearConfigAgenda = async (intervalo_turno, max_sobreturno) => {
    try{
       const consulta= `
       INSERT INTO configuracion_agenda (intervalo_turno, max_sobreturno )
       VALUES ( ?, ?)
       `
       const [resultado] = await connection.execute(consulta,[intervalo_turno, max_sobreturno])
       const id_configuracion = resultado.insertId;
       //await connection.commit();
       return id_configuracion
    }catch (error) {
        console.error("Error al crear la configuracion de agenda", error)
    }
}

export const traerConfigAgendaPorId = async (id_configuracion) =>{
    try{
        const consulta = 
        `SELECT * 
        FROM configuracion_agenda
        WHERE id_configuracion= ?`
        const [resultado] = await connection.execute(consulta,[id_configuracion])
          return resultado
    }catch (error) {
        console.error("Error traerConfigAgendaPorId", error)
    }
}

export const traerMaxSobreTurno = async (id_configuracion) =>{
    try{
        const consulta = 
        `SELECT max_sobreturno FROM configuracion_agenda
          WHERE id_configuracion= ?`
        const [resultado] = await connection.execute(consulta,[id_configuracion])
          return resultado
    }catch (error) {
        console.error("Error al traer max sobreturno de  configuracion de agenda", error)
    }
}


export const modifMaxSobreTurno = async (id_configuracion, max_sobreturno) => {
    try{
        const consulta = `
          UPDATE configuracion_agenda
          SET max_sobreturno = ?
          WHERE id_configuracion = ?`
        const [resultado] = await connection.execute(consulta,[id_configuracion, max_sobreturno])
          return resultado
    }catch (error){
        console.error("Error al modificar max sobreturno", error)
    }
}

export const modifIntervaloTurno = async (id_configuracion, intervalo_turno) => {
    try{
        const consulta = `
          UPDATE configuracion_agenda
          SET intervalo_turno = ?
          WHERE id_configuracion = ?`
        const [resultado] = await connection.execute(consulta,[id_configuracion, intervalo_turno])
          return resultado
    }catch (error){
        console.error("Error al modificar intervalo de turno", error)
    }
}


export const borrarConfigAgenda = async (id_configuracion) => {
    try{
        const consulta = `
          DELETE configuracion_agenda
          WHERE id_configuracion = ?
        `
        const [resultado] = await connection.execute(consulta,[id_configuracion])
          return resultado
    }catch (error){
        console.error("Error al borrar max sobreturno", error)
    }
}

