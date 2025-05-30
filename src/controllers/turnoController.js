import { obtenerTodasLasAgendasPorMatricula, obtenerTodosAgendasActuales } from "../models/agendaModel.js"
import { obtenerTodosLosPacientes } from "../models/personaModel.js"
import { darTurno, listarTurnosPorAgenda,confirmar,cancelar,insertTurno } from "../models/turnoModel.js"

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

export const reservarTurno = async(req,res)=>{
    try {
        const {dniPaciente,motivo} = req.body
        const datosAgenda = req.session.agenda
        const prueba = new Date(datosAgenda.hora_inicio)
        console.log(req.body, datosAgenda.hora_inicio)
        await insertTurno(`${prueba.getHours()}:${prueba.getMinutes()}`,datosAgenda.hora_fin,motivo,dniPaciente,datosAgenda.id_agenda,datosAgenda.fecha,false)
        res.redirect("/turno/darturno")
    } catch (error) {
        console.error("Error reservarTurno", error)
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

export const llevarTurno =  async (req, res) => {
    const { id_agenda, hora_inicio, hora_fin, fecha } = req.query;
    const pacientes = await obtenerTodosLosPacientes()
    req.session.agenda={ id_agenda, hora_inicio, hora_fin, fecha }
    req.session.save((error) => {
            if (error) {
                console.error('Error al guardar la sesión:', error);
                return res.status(500).send('Error al guardar sesión');
            } else {
                console.log('Sesión guardada con éxito ', req.session.usuario);
                //res.render('index', { usuario: req.session.usuario });
                console.log(id_agenda, hora_inicio, hora_fin, fecha);
                return res.render('crearTurno',{usuario: req.session.usuario,pacientes});
            }
    });
    
}

