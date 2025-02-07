import connection from '../database/db.js'

export const traerDias = async() =>{
   
    try{
        const consulta= `
        SELECT * FROM dias
        `

        const [resultado] = await connection.execute(consulta)
            return resultado

    }catch (error) {
        console.error("Error para traer dias", error) 
    }
}
export const traerDiasESP = async() =>{
   
    try{
        const consulta= `
        SELECT dia_espanol FROM dias
        `

        const [resultado] = await connection.execute(consulta)
            return resultado

    }catch (error) {
        console.error("Error para traer dias en español", error) 
    }
}

export const agregarDia = async(dia_espanol, dia_ingles) => {
    try{
        const consulta= `
        INSERT INTO dias (dia_espanol, dia_ingles)
        VALUES (?,?)
        `

        const [resultado] = await connection.execute(consulta,[dia_espanol, dia_ingles])

            return resultado

        }catch (error){
            console.error("Error  para agregar dia", error)
        }
}

export const modificarDiaPorId = async() => {
    try{
        const consulta= `
        UPDATE dias SET dia_espanol = ?, dia_ingles = ?
        WHERE id_dia = ?
        `
        const [resultado] = await connection.execute(consulta,[id_dia, dia_espanol, dia_ingles])
            return resultado

    }catch (error) {
        console.error("Error al modifcar dia", error)
    }
}

export const borrarDia = async (id_dia) =>{
try{
    const consulta= `
    DELETE FROM dias
    WHERE id_dia = ?
    `
    const [resultado] = await connection.execute(consulta,[id_dia])
         return resultado

}catch (error){
    console.error("Error para borrar dia", error)
}
}