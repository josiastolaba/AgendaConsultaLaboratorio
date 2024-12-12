import { obtenerTodasLasAgendasPorMatricula, obtenerTodosAgendasActuales } from "../models/agendaModel.js"
import { obtenerTodosLosPacientes } from "../models/personaModel.js"
import { darTurno, listarTurnosPorAgenda,confirmar,cancelar } from "../models/turnoModel.js"

export const getTurno = async (req,res)=>{
    try {
        const agendas = await obtenerTodosAgendasActuales()
        const pacientes = await obtenerTodosLosPacientes()
        res.render('turno',{usuario: req.session.usuario,agendas,pacientes})
    } catch (error) {
        console.error("Error getTurno",error)
    }
}

export const traerTurnos = async (req,res)=>{
    try {
        const agendas = await obtenerTodosAgendasActuales()
        const pacientes = await obtenerTodosLosPacientes()
        let turnos = []
        const {id_agenda}=req.body
        if(id_agenda){
            turnos = await listarTurnosPorAgenda(id_agenda)
        }
        res.render('turno',{usuario: req.session.usuario,turnos,agendas,pacientes})
    } catch (error) {
        console.error("Error traerTurnos",error)
    }
}

export const updateTurno = async(req,res)=>{
    try {
        const {paciente,motivo,id_turno} = req.body
        console.log(req.body)
        await darTurno(id_turno,paciente,motivo)
        res.redirect("/turno/darturno")
    } catch (error) {
        console.error("Error updateTurno", error)
    }
}

export const updateConfirmar = async(req,res)=>{
    try {
        const {id_turno} = req.body
        console.log(req.body)
        await confirmar(id_turno)
        res.redirect("/turno/darturno")
    } catch (error) {
        console.error("Error updateConfirmar", error)
    }
}

export const updateCancelar = async(req,res)=>{
    try {
        const {id_turno} = req.body
        console.log(req.body)
        await cancelar(id_turno)
        res.redirect("/turno/darturno")
    } catch (error) {
        console.error("Error updateCancelar", error)
    }
}

