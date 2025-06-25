import { obtenerTodasLasAgendasPorMatricula, obtenerTodosAgendasActuales } from "../models/agendaModel.js";
import { obtenerTodosLosPacientes } from "../models/personaModel.js";
import { selecTurno,darTurno,listarTurnosPorAgenda,confirmar,cancelar,insertTurno,listarTodosTurnosPorAgenda} from "../models/turnoModel.js";

export const getTurno = async (req,res)=>{
    try {
        const agendas = await obtenerTodosAgendasActuales();
        const pacientes = await obtenerTodosLosPacientes();
        res.render('turno',{usuario: req.session.usuario,agendas,pacientes});
    } catch (error) {
        console.error("Error getTurno",error);
    }
}

export const getTurno2 = async (req,res)=>{
    try{
        const turnos = await listarTodosTurnosPorAgenda(req.params.id_agenda);
        console.log(turnos);
        res.json(turnos);
    }catch(error){
        console.log(error);
    }
}

export const traerTurno = async (req,res)=>{
    try{
        const turno = await selecTurno(req.params.id_turno);
        res.json(turno);
    }catch(error){
        console.log(error);
    }
}

export const reservarTurno = async(req,res)=>{
    try {
        const {dniPaciente,motivo} = req.body;
        const datosAgenda = req.session.agenda;
        const hora_inicio = new Date(datosAgenda.hora_inicio);
        const hora_fin = new Date(datosAgenda.hora_fin);
        const fechaJs = new Date(datosAgenda.fecha);
        console.log(req.body, datosAgenda.hora_inicio);
        await insertTurno(`${hora_inicio.getHours()}:${hora_inicio.getMinutes()}`,`${hora_fin.getHours()}:${hora_fin.getMinutes()}`,motivo,dniPaciente,datosAgenda.id_agenda,fechaJs,false);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error reservarTurno", error);
    }
}

export const traerTurnos = async (req,res)=>{
    try {
        const agendas = await obtenerTodosAgendasActuales();
        const pacientes = await obtenerTodosLosPacientes();
        let turnos = [];
        const {id_agenda}=req.body;
        if(id_agenda){
            turnos = await listarTurnosPorAgenda(id_agenda);
        }
        res.render('turno',{usuario: req.session.usuario,turnos,agendas,pacientes});
    } catch (error) {
        console.error("Error traerTurnos",error);
    }
}

export const updateTurno = async(req,res)=>{
    try {
        const {paciente,motivo,id_turno} = req.body;
        console.log(req.body);
        await darTurno(id_turno,paciente,motivo);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error updateTurno", error);
    }
}

export const updateConfirmar = async(req,res)=>{
    try {
        const {id_turno} = req.body;
        console.log(req.body);
        await confirmar(id_turno);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error updateConfirmar", error);
    }
}

export const updateCancelar = async(req,res)=>{
    try {
        const {id_turno} = req.body;
        console.log(req.body);
        await cancelar(id_turno);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error updateCancelar", error);
    }
}

export const llevarTurno =  async (req, res) => {
    try {
        const { id_agenda, hora_inicio, hora_fin, fecha, id_turno} = req.query;
        const pacientes = await obtenerTodosLosPacientes();
        let turno = ""
        if (id_turno) turno = await selecTurno(id_turno)
        req.session.agenda={ id_agenda, hora_inicio, hora_fin, fecha };
        req.session.save((error) => {
                if (error) {
                    console.error('Error al guardar la sesión:', error);
                    return res.status(500).send('Error al guardar sesión');
                } else {
                    console.log('Sesión guardada con éxito ', req.session.usuario);
                    console.log(id_agenda, hora_inicio, hora_fin, fecha);
                    return res.render('crearTurno',{usuario: req.session.usuario,pacientes,turno});
                }
        });
    } catch (error) {
        console.error("Error llevarTurno", error);
    }
}

