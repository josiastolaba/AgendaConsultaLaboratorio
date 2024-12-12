import connection from '../database/db.js'

export const insertarPersona = async(dni,nombre,apellido,direccion,fechaNacimiento,email,img_doc) =>{
    try {
        const consulta = `
            INSERT INTO persona(dni, nombre, apellido, direccion, fechaNacimiento, email, img_doc) VALUES (?,?,?,?,?,?,?)
            `
        const [resultado] = await connection.execute(consulta,[dni,nombre,apellido,direccion,fechaNacimiento,email,img_doc])
        return 1
    } catch (error) {
        console.error("Error insertarPersona", error)   
    }
}

export const modificarPersona = async(dni,nombre,apellido,direccion,fechaNacimiento,email) =>{
    try {
        const consulta = `
            UPDATE persona 
            SET nombre=?,apellido=?,direccion=?,fechaNacimiento=?,email=?
            WHERE dni = ?
            `
        const [resultado] = await connection.execute(consulta,[nombre,apellido,direccion,fechaNacimiento,email,dni])
        return resultado
    } catch (error) {
        console.error("Error modificarPersona", error)   
    }
}

export const obtenerTodosLosPacientes = async ()=> {
    try {
        const consulta = `
            SELECT u.*, p.* 
            FROM usuario u 
            JOIN persona p ON u.dni = p.dni
            WHERE id_rol = 1
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodosLosPacientes",error)
    }
}