import connection from '../database/db.js'

export const obtenerTodasLasMatriculas = async ()=>{
    try {
        const consulta = `
        SELECT em.*, p.*, e.*
        FROM especialidad_medico em
        JOIN especialidad e ON em.id_especialidad = e.id_especialidad
        JOIN persona p ON em.dni = p.dni
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error al obtenerTodasLasMatriculas")
    }
}

export const crearEspeMedicoInsert = async (usuario,especialidad)=>{
    try {
        const consulta = `INSERT INTO especialidad_medico (dni, id_especialidad) VALUES (?,?)`
        const [resultado] = await connection.execute(consulta,[usuario,especialidad])
        return resultado
    } catch (error) {
        console.error("Error al crearMedicosInsert", error)
        return false
    }
}