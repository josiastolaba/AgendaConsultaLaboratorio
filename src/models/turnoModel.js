import connection from '../database/db.js'

export const listarTurnosPorAgenda = async (id_agenda) =>{
    try {
        const consulta = `
            SELECT t.*, et.*
            FROM turno t 
            JOIN agenda a ON t.id_agenda = a.id_agenda 
            JOIN estado_turno et ON t.id_estado_turno = et.id_estado_turno
            LEFT JOIN persona p ON p.dni = t.dni
            WHERE a.id_agenda = ?
            /*AND DATE(NOW()) <= DATE(t.fecha) 
            AND (DATE(NOW()) != DATE(t.fecha) OR TIME(NOW()) <= TIME(t.inicio_turno))*/;
            `
        const [resultado] = await connection.execute(consulta,[id_agenda])
        return resultado
    } catch (error) {
        console.error("Error listarTurnosPorAgenda")
    }
}

export const listarTodosTurnosPorAgenda = async (id_agenda) =>{
    try {
        const consulta = `
            SELECT t.*, et.*
            FROM turno t 
            JOIN agenda a ON t.id_agenda = a.id_agenda 
            JOIN estado_turno et ON t.id_estado_turno = et.id_estado_turno
            LEFT JOIN persona p ON p.dni = t.dni
            WHERE a.id_agenda = ?
            `
        const [resultado] = await connection.execute(consulta,[id_agenda])
        return resultado
    } catch (error) {
        console.error("Error listarTodosTurnosPorAgenda")
    }
}

export const darTurno = async(id_turno, dni, motivo)=>{
    try {
        const consulta = `
            UPDATE turno SET motivo_consulta=?, dni=?,id_estado_turno=2
            WHERE turno.id_turno=?
        `
        const [resultado] = await connection.execute(consulta,[motivo,dni, id_turno])
        return resultado
    } catch (error) {
        console.error("Error darTurno", error)
    }
}

export const confirmar = async(id_turno)=>{
    try {
        const consulta = `
            UPDATE turno SET id_estado_turno=3
            WHERE turno.id_turno=?
        `
        const [resultado] = await connection.execute(consulta,[id_turno])
        return resultado
    } catch (error) {
        console.error("Error confirmar", error)
    }
}

export const cancelar = async(id_turno)=>{
    try {
        const consulta = `
            UPDATE turno SET id_estado_turno=4
            WHERE turno.id_turno=?
        `
        const [resultado] = await connection.execute(consulta,[id_turno])
        return resultado
    } catch (error) {
        console.error("Error cancelar", error)
    }
}

export const insertTurno = async(inicio_turno,fin_turno,motivo_consulta, dni,id_agenda,fecha, sobreturno)=>{
    try {
        const consulta = `
            INSERT INTO turno(inicio_turno, fin_turno, id_estado_turno, motivo_consulta, dni, id_agenda, fecha, sobreturno) VALUES (?,?,?,?,?,?,?,?)
        `
        const [resultado] = await connection.execute(consulta,[inicio_turno,fin_turno,2,motivo_consulta,dni,id_agenda,fecha,sobreturno])
        return resultado
    } catch (error) {
        console.error("Error insertTurno", error)
    }
}