import connection from '../database/db.js'


export const insertarAgenda = async(hora_inicio_maniana, hora_fin_maniana, intervalo_turno, max_sobreTurno, estado_agenda, matricula, id_sucursal, descripcion, fecha_inicio, fecha_fin, id_clasificacion, turno, hora_inicio_tarde, hora_fin_tarde,dias) =>{
    try {
        const consulta = `
            INSERT INTO agenda(hora_inicio_maniana, hora_fin_maniana, intervalo_turno, max_sobreTurno, estado_agenda, matricula, id_sucursal, descripcion, fecha_inicio, fecha_fin, id_clasificacion, turno, hora_inicio_tarde, hora_fin_tarde) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `
        const [resultado] = await connection.execute(consulta,
            [hora_inicio_maniana, hora_fin_maniana, intervalo_turno, max_sobreTurno, estado_agenda, matricula, id_sucursal, descripcion, fecha_inicio, fecha_fin, id_clasificacion, turno, hora_inicio_tarde, hora_fin_tarde])
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

export const insertarAgendaDia = async (id_agenda, dias) => {
    const conexion = await connection.getConnection();
    try {
        const consulta = `
            INSERT INTO agenda_dia (id_dia, id_agenda) VALUES (?, ?)
        `;
        
        // Iniciar una transacción
        await conexion.beginTransaction();

        // Iterar sobre el arreglo de días e insertar cada par (id_dia, id_agenda)
        for (const dia of dias) {
            await conexion.execute(consulta, [dia, id_agenda]);
        }

        // Confirmar la transacción
        await conexion.commit();
        return { success: true, message: "Datos insertados correctamente." };
    } catch (error) {
        console.error("Error al insertar agenda_dia:", error);
        // Revertir la transacción en caso de error
        await conexion.rollback();
        return { success: false, error: error.message };
    }
};




