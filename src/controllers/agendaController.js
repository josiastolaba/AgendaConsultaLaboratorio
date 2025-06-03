import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;
import { insertarAgenda, obtenerTodosAgendasActuales } from "../models/agendaModel.js"
import { obtenerTodasLasMatriculas } from "../models/especialidad_medicoModel.js"
import { obtenerTodasLasSucursales } from "../models/sucursalModel.js"
import { obtenerTodasLasClasificaciones } from "../models/clasificacion_de_agendaModel.js"
import { listarTodosTurnosPorAgenda, listarTurnosPorAgenda } from "../models/turnoModel.js"
import { traerDias } from "../models/diaModel.js"
import { crearConfigAgenda } from "../models/configuracion_agendaModel.js"
import { insertarHorarioCompleto, traerHxAgenda } from "../models/horarioModel.js"
import { relacionDiaHorario } from "../models/dia_horarioModel.js"

export const formAgenda = async (req,res)=>{ 
    try {
        const matriculas = await obtenerTodasLasMatriculas()
        const sucursales = await obtenerTodasLasSucursales()
        const clasificaciones = await obtenerTodasLasClasificaciones()
        const agendas = await obtenerTodosAgendasActuales()
        const dias = await traerDias()
        res.render('agenda',{usuario: req.session.usuario,matriculas,sucursales,clasificaciones,agendas,dias})
    } catch (error) {
        console.error("Error formAgenda", error)
    }
}

export const guardarAgenda = async(req,res)=>{
    try {
        console.log(req.body)
        const matriculas = await obtenerTodasLasMatriculas()
        const sucursales = await obtenerTodasLasSucursales()
        const agendas = await obtenerTodosAgendasActuales()
        const clasificaciones = await obtenerTodasLasClasificaciones()
        const dias = await traerDias()
        let {idSucursal,idMatricula,intervalo,sobreturno,estadoAgenda,idClasificacion,descripcion,horarioSelec} = req.body
        const id_configuracion = await crearConfigAgenda(intervalo,sobreturno)
        for (const horario of horarioSelec){
            let id_horario = await insertarHorarioCompleto(horario.inicioManana, horario.finManana, horario.inicioTarde, horario.finTarde)
            await relacionDiaHorario(horario.id_dia,id_horario,id_configuracion)
        };
        console.log(req.body)
        const resultado = await insertarAgenda(estadoAgenda, idMatricula, idSucursal, descripcion,idClasificacion,id_configuracion)
        //res.render('agenda', {agendaCreada: true, usuario: req.session.usuario,matriculas,sucursales,clasificaciones,agendas,dias})
        res.status(302).redirect('/agendas/crearAgenda');
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
        const dias = await traerDias()
        let turnos = []
        const {id_agenda}=req.body
        if(id_agenda){
            turnos = await listarTodosTurnosPorAgenda(id_agenda)
        }
        res.render('agenda',{usuario: req.session.usuario,turnos,agendas,sucursales,matriculas,clasificaciones,dias})
    } catch (error) {
        console.error("Error traerTurnos",error)
    }
}

export const traerAgenda = async (req,res)=>{
    try {
        const {id_agenda} = req.params
        const turnos = await listarTurnosPorAgenda(id_agenda)
        console.log("KJFDSJAJSDFJDSAIFJDSAJFIDOSJAOFIJDSOIAFJDIOSJAFIDJSIAFJDIOSAJFOIDSA")
        console.log(turnos)
        const agenda = await traerHxAgenda(id_agenda)
        return res.json({agenda,turnos})
    } catch (error) {
        console.error("Error traerAgenda",error)
    }
}