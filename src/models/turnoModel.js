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
            AND DATE(NOW()) <= DATE(t.fecha) 
            AND (DATE(NOW()) != DATE(t.fecha) OR TIME(NOW()) <= TIME(t.inicio_turno));
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

export const estadoTurno = async(id_turno, estado)=>{
    try {
        const consulta = `
            UPDATE turno SET id_estado_turno = ?
            WHERE turno.id_turno = ?
        `
        const [resultado] = await connection.execute(consulta,[estado,id_turno])
        return resultado
    } catch (error) {
        console.error("Error estadoTurno", error)
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

export const insertSobreTurno = async(inicio_turno,fin_turno,motivo_consulta, dni,id_agenda,fecha, sobreturno)=>{
    try {
        const consulta = `
            INSERT INTO turno(inicio_turno, fin_turno, id_estado_turno, motivo_consulta, dni, id_agenda, fecha, sobreturno) VALUES (?,?,?,?,?,?,?,?)
        `
        const [resultado] = await connection.execute(consulta,[inicio_turno,fin_turno,2,motivo_consulta,dni,id_agenda,fecha,sobreturno])
        return resultado
    } catch (error) {
        console.error("Error insertSobreTurno", error)
    }
}

export const selecTurno = async(id_turno)=>{
    try {
        const consulta = `
            SELECT t.*
            FROM turno t 
            WHERE t.id_turno = ?
        `
        const [resultado] = await connection.execute(consulta,[id_turno])
        return resultado[0]
    } catch (error) {
        console.error("Error selecTurno", error)
    }
}

export const buscarSobreTurno = async(inicio_turno,fecha,id_agenda)=>{
    try {
        const consulta = `
            SELECT * FROM turno t
            WHERE t.sobreturno = 1 AND t.id_estado_turno NOT IN (4,5,6,7,8) AND t.inicio_turno = ? AND t.fecha = ? AND t.id_agenda = ?
        `
        const [resultado] = await connection.execute(consulta,[inicio_turno,fecha,id_agenda])
        return resultado[0]
    } catch (error) {
        console.error("Error buscarSobreTurno", error)
    }
}

export const buscarTurnoPorHorario = async(agenda,inicio_turno,fecha)=>{
    try {
        const consulta = `
            SELECT t.* 
            FROM turno t 
            WHERE t.id_agenda = ? AND t.inicio_turno = ? AND t.fecha = ? AND t.sobreturno != 1
        `
        const [resultado] = await connection.execute(consulta,[agenda,inicio_turno,fecha])
        return resultado[0]
    } catch (error) {
        console.error("Error buscarTurnoPorHorario", error)
    }
}

export const pasarSobreATurno = async(id_turno)=>{
    try {
        const consulta = `
            UPDATE turno SET sobreturno = 0
            WHERE id_turno = ?
        `
        const [resultado] = await connection.execute(consulta,[id_turno])
        return resultado[0]
    } catch (error) {
        console.error("Error pasarSobreATurno", error)
    }
}