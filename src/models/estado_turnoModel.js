import connection from `../database/db.js`

export const traerEstadoTurno = async() =>{
    try{
        const consulta = `
        SELECT * FROM estado_turno
        `
        const [resultado] = await connection.execute(consulta)
            return resultado

    }catch (error) {
        console.error("Error al traer el estado de turno",error)
    }
}

export const modificarEstadoTurno= async(id_estado_turno, estado_turno) =>{
    try{
        const consulta = `
        UPDATE estado_turno SET estado_turno = ?
        WHERE id_estado_turno = ?
        `

        const [resultado] = await connection.execute(consulta,[id_estado_turno, estado_turno])
            return resultado

    }catch (error) {
        console.error("Error al modificar estado de turno",error)
    }
}

export const borrarEstadoTurno = async(id_estado_turno) =>{
    try{
        const consulta = `
        DELETE  FROM estado_turno
        WHERE id_estado_turno = ?
        `
        const [resultado] = await connection.execute(consulta,[id_estado_turno])
            return resultado

    }catch (error) {
        console.error("Error al borrar el estado de turno",error)
    }
}