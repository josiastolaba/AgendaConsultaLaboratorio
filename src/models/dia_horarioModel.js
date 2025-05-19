import connection from '../database/db.js'

export const traerDiaHorarioTodo = async() =>{
    try{
      const consulta = `
       SELECT * FROM dia_horario
      `  

       const [resultado] = await connection.execute(consulta)
          return resultado
    }catch (error) {
       console.error("Error al traer los datos de dia horario", error)
    }
}

export const TraerDiaHorarioDia = async (id_dia) =>{
    try{
        const consulta = `
         SELECT * FROM dia_horario 
         WHERE id_dia = ?
        `
         const [resultado] = await connection.execute(consulta,[id_dia])
            return resultado
        }catch (error) {
            console.error("Error al traer dia horario por id_dia",error)
        }
}

export const TraerDiaHorarioConfig = async (id_configuracion) =>{
    try{
        const consulta = `
         SELECT * FROM dia_horario 
         WHERE id_configuracion = ?
        `
        const [resultado] = await connection.execute(consulta,[id_configuracion])
           return resultado
        }catch (error) {
            console.error("Error al traer dia horario por id_configuracion",error)
        }
}

export const TraerDiaHorarioHorario = async (id_horario) =>{
    try{
        const consulta = `
         SELECT * FROM dia_horario 
         WHERE id_horario = ?
        `
        const [resultado] = await connection.execute(consulta,[id_horario])
           return resultado
        }catch (error) {
            console.error("Error al traer dia horario por id_configuracion",error)
        }
}


export const relacionDiaHorario = async (id_dia, id_horario, id_configuracion) => {
    try{
    const consulta = `
     INSERT INTO dia_horario (id_dia, id_horario, id_configuracion)
     VALUES (?,?,?)
    `
    const [resultado] = await connection.execute(consulta,[id_dia, id_horario, id_configuracion])
        return resultado
    }catch (error) {
        console.error("Error al crear relacion dia horario",error)
    }
}

