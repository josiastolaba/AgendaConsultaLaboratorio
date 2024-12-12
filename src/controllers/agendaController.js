import { insertarAgenda, insertarAgendaDia, obtenerTodosAgendasActuales } from "../models/agendaModel.js"
import { obtenerTodasLasMatriculas } from "../models/especialidad_medicoModel.js"
import { obtenerTodasLasSucursales } from "../models/sucursalModel.js"
import { obtenerTodasLasClasificaciones } from "../models/clasificacion_de_agendaModel.js"
import { listarTodosTurnosPorAgenda } from "../models/turnoModel.js"

export const formAgenda = async (req,res)=>{ 
    try {
        const matriculas = await obtenerTodasLasMatriculas()
        const sucursales = await obtenerTodasLasSucursales()
        const clasificaciones = await obtenerTodasLasClasificaciones()
        const agendas = await obtenerTodosAgendasActuales()
        res.render('agenda',{usuario: req.session.usuario,matriculas,sucursales,clasificaciones,agendas})
    } catch (error) {
        console.error("Error formAgenda", error)
    }
}

export const guardarAgenda = async(req,res)=>{
    try {
        const matriculas = await obtenerTodasLasMatriculas()
        const sucursales = await obtenerTodasLasSucursales()
        const agendas = await obtenerTodosAgendasActuales()
        const clasificaciones = await obtenerTodasLasClasificaciones()
        let {hora_inicio_maniana, hora_fin_maniana, intervalo_turno, max_sobreTurno, estado_agenda, matricula, id_sucursal, descripcion, fecha_inicio, fecha_fin, id_clasificacion, turno, hora_inicio_tarde, hora_fin_tarde,dias} = req.body
        switch (turno) {
            case "mañana":
                hora_fin_tarde=null
                hora_inicio_tarde=null
                break;
            case "tarde":
                hora_fin_maniana=null
                hora_inicio_maniana=null
                break;
            default:
                break;
        }
        const resultado = await insertarAgenda(hora_inicio_maniana, hora_fin_maniana, intervalo_turno, max_sobreTurno, estado_agenda, matricula, id_sucursal, descripcion, fecha_inicio, fecha_fin, id_clasificacion, turno, hora_inicio_tarde, hora_fin_tarde,dias)
        await insertarAgendaDia(resultado.insertId,dias)
        res.render('agenda', {agendaCreada: true, usuario: req.session.usuario,matriculas,sucursales,clasificaciones,agendas})
    } catch (error) {
        console.error("Error guardarAgenda",error)
    }
}

export const listarTurno = async (req,res)=>{
    try {
        const matriculas = await obtenerTodasLasMatriculas()
        const agendas = await obtenerTodosAgendasActuales()
        const sucursales = await obtenerTodasLasSucursales()
        const clasificaciones = await obtenerTodasLasClasificaciones()
        let turnos = []
        const {id_agenda}=req.body
        if(id_agenda){
            turnos = await listarTodosTurnosPorAgenda(id_agenda)
        }
        res.render('agenda',{usuario: req.session.usuario,turnos,agendas,sucursales,matriculas,clasificaciones})
    } catch (error) {
        console.error("Error traerTurnos",error)
    }
}