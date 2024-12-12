import connection from '../database/db.js'

export const obtenerTodosLosRoles = async ()=> {
    try {
        const consulta = `
        SELECT * FROM rol
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodosLosRoles")
    }
}