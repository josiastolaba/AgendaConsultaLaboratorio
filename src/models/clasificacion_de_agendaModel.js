import connection from '../database/db.js'

export const obtenerTodasLasClasificaciones = async ()=>{
    try {
        const consulta = `
        SELECT * 
        FROM clasificacion_de_agenda 
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error al obtenerTodasLasClasificaciones")
    }
}