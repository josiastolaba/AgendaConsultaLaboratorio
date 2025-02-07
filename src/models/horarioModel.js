import connection from `../database/db.js`

export const traerHorarios = async () =>{
    try{
        const consulta = `
         SELECT * FROM horario
        `

        const [resultado] = await connection.execute(consulta)
             return resultado
    }catch (error) {
        console.error("Error al traer datos de horario", error)
    }
}

export const traerHorarioM = async () =>{
    try{
        const consulta = `
         SELECT hora_inicio_m , hora_fin_m  FROM horario
         
        `
        const [resultado] = await connection.execute(consulta)
                   return resultado
    }catch (error) {
        console.error("Error al traer datos de horario de la mañana", error)
    }
}
 
export const traerHorarioTarde = async () =>{
    try{
        const consulta = `
         SELECT horario_inicio_t , horario_fin_t  FROM horario
         
        `
        const [resultado] = await connection.execute(consulta)
                   return resultado
    }catch (error) {
        console.error("Error al traer datos de horario de la tarde", error)
    }
}

export const traerHorarioIdMa = async (id_horario) =>{
    try{
        const consulta = `
         SELECT hora_inicio_m , hora_fin_m  FROM horario
         WHERE id_horario = ?
        `
        const [resultado] = await connection.execute(consulta,[id_horario])
                   return resultado
    }catch (error) {
        console.error("Error al traer datos de horario de la mañana por id", error)
    }
}

export const traerHorarioIdTa = async (id_horario) =>{
    try{
        const consulta = `
         SELECT horario_inicio_t , horario_fin_t  FROM horario
         WHERE id_horario = ?
        `
        const [resultado] = await connection.execute(consulta,[id_horario])
                   return resultado
    }catch (error) {
        console.error("Error al traer datos de horario de la tarde por id", error)
    }
}

export const borrarHorarioId= async (id_horario) =>{
    try{
        const consulta = `
         DELETE FROM horario
         WHERE id_horario = ?
        `
        const [resultado] = await connection.execute(consulta,[id_horario])
                   return resultado
    }catch (error) {
        console.error("Error al borrar datos de horario",error)
    }
}


export const modificarHorarioMa = async (id_horario,hora_inicio_m, hora_fin_m) =>{
    try{
        const consulta = `
         UPDATE horario SET hora_inicio_m , hora_fin_m 
         WHERE id_horario = ?
        `
         
        const [resultado] = await connection.execute(consulta,[id_horario,hora_inicio_m, hora_fin_m])
            return resultado

    }catch (error) {
        console.error("Error al modificar datos de horario de la mañana",error)
    }
}

export const modificarHorarioTa = async (id_horario,horario_inicio_t, horario_fin_t) =>{
    try{
        const consulta = `
         UPDATE horario SET horario_inicio_t , horario_fin_t 
         WHERE id_horario = ?
        `
        const [resultado] = await connection.execute(consulta,[id_horario,horario_inicio_t, horario_fin_t])
             return resultado

    }catch (error) {
        console.error("Error al modificar datos de horario de la tarde", error)
    }
}

export const insertarHorarioMa = async (hora_inicio_m, hora_fin_m) =>{
    try{
        const consulta = `
         INSERT INTO horario (hora_inicio_m, hora_fin_m)
         VALUES (?, ?)
        `
        const [resultado] = await connection.execute(consulta,[hora_inicio_m, hora_fin_m])
            return resultado
    }catch (error) {
        console.error("Error al insertar datos horario de la mañana",error)
    }
}
export const insertarHorarioTa = async (horario_inicio_t, horario_fin_t) =>{
    try{
        const consulta = `
         INSERT INTO horario (horario_inicio_t, horario_fin_t)
         VALUES (?, ?)
        `
        const [resultado] = await connection.execute(consulta,[horario_inicio_t, horario_fin_t])
                   return resultado

    }catch (error) {
        console.error("Error al insertar datos horario de la tarde",error)
    }
}

export const insertarHorarioCompleto = async (hora_inicio_m, hora_fin_m, horario_inicio_t, horario_fin_t) =>{
    try{
        const consulta = `
         INSERT INTO horario (hora_inicio_m , hora_fin_m , horario_inicio_t , horario_fin_t)
         VALUES (?, ?, ?, ?)
        `
        const [resultado] = await connection.execute(consulta,[hora_inicio_m, hora_fin_m, horario_inicio_t, horario_fin_t])
                   return resultado

    }catch (error) {
        console.error("Error al insertar datos de horario completo", error)
    }
}