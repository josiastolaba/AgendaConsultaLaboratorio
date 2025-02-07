import connection from `../database/db.js`

export const traerDiasNoLaborables = async () => {
    try{
       const consulta = `
        SELECT * FROM dia_no_laboral
       `
       const [resultado] = await connection.execute(consulta)
    return resultado
    
    }catch (error) {
        console.error( " Error al traer dias no laborables",error)
    }
   
}

export const traerDiaNoLaboralPorConfig = async (id_configuracion) => {
    try{
        const consulta = `
        SELECT * FROM dia_no_laboral
        WHERE id_configuracion = ?
        `
        const [resultado] = await connection.execute(consulta,[id_configuracion])
    return resultado
    }catch (error) {
        console.error("Error al traer dias no laborales por id_config")
    }
    
}

export const CrearDiaNoLaboral = async (fecha_inicio_laboral, fecha_fin_laboral, id_configuracion) => {
     try{
        const consulta= `
        INSERT INTO dia_no_laboral (fecha_inicio_laboral, fecha_fin_laboral, id_configuracion)
        VALUES (?, ?, ?)
        `
        const [resultado] = await connection.execute(consulta,[fecha_inicio_laboral, fecha_fin_laboral, id_configuracion])
        return resultado
     }catch(error){
        console.error("Error al insertar en dia no laboral", error)
     }
}
export const modificarDiaNoLaboral = async (fecha_inicio_laboral, fecha_fin_laboral, id_configuracion) =>{
    try{
        const consulta = `
        UPDATE dia_no_laboral SET fecha_inicio_laboral = ? ,fecha_fin_laboral = ? 
        WHERE id_configuracion = ?
        `
        const [resultado] = await connection.execute(consulta,[fecha_inicio_laboral, fecha_fin_laboral, id_configuracion])
        return resultado
    }catch (error){
        console.error("Error al modificar dia no laboral por id_configuracion ",error)
    }

}

export const borrarDiaNoLaboral = async (id_configuracion) =>{
    try{
        const consulta = `
        DELETE FROM dia_no_laboral 
        WHERE id_configuracion = ?
        `
        const [resultado] = await connection.execute(consulta,[id_configuracion])
        return resultado
    }catch (error) {
        console.error("Error al borar dia no laboral",error)
    }
}