import connection from '../database/db.js'

export const insertarUsuario = async (password,dni) =>{
    try {
        const consulta = `
            INSERT INTO usuario(password,dni) VALUES (?,?)
            `
        const [resultado] = await connection.execute(consulta,[password,dni])
        return resultado.insertId
    } catch (error) {
        console.error("Error insertarUsuario", error)   
    }
}

export const buscarUsuario = async (dni) =>{
    try {
        const consulta = `
            SELECT u.*, p.*, r.*
            FROM usuario u 
            JOIN persona p ON u.dni = p.dni
            JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.dni = ? `
        const [resultado] = await connection.execute(consulta,[dni])
        return resultado[0]
    } catch (error) {
        console.error("Error buscarUsuario", error)
    }
}

export const obtenerTodosLosUsuarios = async () =>{
    try {
        const consulta = `
            SELECT u.id_usuario, u.dni, u.id_rol, u.estado_usuario , p.*,r.*
            FROM usuario u 
            JOIN persona p ON u.dni = p.dni
            JOIN rol r ON u.id_rol = r.id_rol
            `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodosLosUsuarios", error)   
    }
}

export const modificarUsuario = async (id_rol,estado_usuario,id_usuario) =>{
    try {
        const consulta = `
            UPDATE usuario
            SET id_rol=?, estado_usuario=? 
            WHERE usuario.id_usuario = ?
            `
        const [resultado] = await connection.execute(consulta,[id_rol,estado_usuario,id_usuario])

        return resultado
    } catch (error) {
        console.error("Error modificarUsuario", error)   
    }
}

export const obtenerTodosLosMedicos = async () =>{
    try {
        const consulta = `
            SELECT u.*, p.*,em.*
            FROM usuario u 
            JOIN persona p ON u.dni = p.dni
            JOIN especialidad_medico em ON u.dni = em.dni
            JOIN especialidad e ON em.id_especialidad = e.id_especialidad
            WHERE u.id_rol = 2
            `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodosLosMedicos", error)   
    }
}
