import connection from '../database/db.js'

export const obtenerTodasLasSucursales = async ()=> {
    try {
        const consulta = `
        SELECT * 
        FROM sucursal
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodasLasSucursales")
    }
}