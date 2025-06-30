import connection from '../database/db.js'


export const insertarAgenda = async(estado_agenda, matricula, id_sucursal, descripcion, id_clasificacion,id_configuracion) =>{
    try {
        const consulta = `
            INSERT INTO agenda(estado_agenda, matricula, id_sucursal, descripcion, id_clasificacion,id_configuracion) 
            VALUES (?,?,?,?,?,?)
            `
        const [resultado] = await connection.execute(consulta,
            [estado_agenda, matricula, id_sucursal, descripcion, id_clasificacion,id_configuracion])
        return resultado
    } catch (error) {
        console.error("Error insertarAgenda", error)   
    }
}

export const obtenerTodasLasAgendas = async ()=> {
    try {
        const consulta = `
            SELECT * 
            FROM agenda
        `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodasLasAgendas")
    }
}

export const obtenerTodasLasAgendasPorMatricula = async (matricula)=> {
    try {
        const consulta = `
            SELECT a.* 
            FROM agenda a
            WHERE a.matricula = ?
        `
        const [resultado] = await connection.execute(consulta,[matricula])
        return resultado
    } catch (error) {
        console.error("Error obtenerTodasLasAgendasPorMatricula")
    }
}

export const obtenerTodosAgendasActuales = async () =>{
    try {
        const consulta = `
            SELECT u.id_usuario,u.id_rol,u.estado_usuario, p.*,em.*,e.nombre_especialidad,a.*
            FROM usuario u 
            JOIN persona p ON u.dni = p.dni
            JOIN especialidad_medico em ON u.dni = em.dni
            JOIN especialidad e ON em.id_especialidad = e.id_especialidad
            JOIN agenda a ON em.matricula = a.matricula
            WHERE u.id_rol = 2
            `
        const [resultado] = await connection.execute(consulta)
        return resultado
    } catch (error) {
        console.error("Error obtenerTodosLosMedicos", error)   
    }
}

export const obtenerTodasLasAgendasPorId = async (id_agenda)=> {
    try {
        const consulta = `
            SELECT a.* 
            FROM agenda a
            WHERE a.id_agenda = ?
        `
        const [resultado] = await connection.execute(consulta,[id_agenda])
        return resultado
    } catch (error) {
        console.error("Error obtenerTodasLasAgendasPorId")
    }
}





