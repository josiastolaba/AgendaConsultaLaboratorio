import connection from '../database/db.js'


export const crearRelacionAgendaDia = async (id_agenda, id_dia) => {
    try{
       const consulta = `
            INSERT INTO agenda_dia(id_dia, id_agenda) 
            VALUES (?,?)
            `

         const [resultado] = await connection.execute(consulta,[id_agenda, id_dia])
            return resultado

    }catch (error) {
        console.error("Error al insertar en agenda dias", error)   
    }
}

export const eliminarRelacionAgendaDia = async (id_agenda, id_dia) => {
    try{
       const consulta = `
        DELETE FROM agenda_dia WHERE id_agenda = ? AND id_dia = ?
            `
        const [resultado] = await connection.execute(consulta,[id_agenda, id_dia])
            return resultado

    }catch (error) {
        console.error("Error al eliminar en agenda dias", error)   
    }
}

export const obtenerAgendaDia = async (id_agenda, id_dia) => {
    try{
       const consulta = `
        SELECT * FROM agenda_dia WHERE id_agenda = ? AND id_dia = ?
            `

        const [resultado] = await connection.execute(consulta,[id_agenda, id_dia])
           return resultado    
    }catch (error) {
        console.error("Error al obtener datos de agenda dias", error)   
    }
}
