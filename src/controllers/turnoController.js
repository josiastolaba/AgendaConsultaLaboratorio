import { obtenerTodasLasAgendasPorMatricula, obtenerTodosAgendasActuales } from "../models/agendaModel.js";
import { obtenerTodosLosPacientes } from "../models/personaModel.js";
import { selecTurno,darTurno,listarTurnosPorAgenda,estadoTurno,insertTurno,listarTodosTurnosPorAgenda,insertSobreTurno} from "../models/turnoModel.js";

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
        await insertTurno(`${hora_inicio.getHours()}:${hora_inicio.getMinutes()}`,`${hora_fin.getHours()}:${hora_fin.getMinutes()}`,motivo,dniPaciente,datosAgenda.id_agenda,fechaJs,false);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error reservarTurno", error);
    }
}
export const reservarSobreTurno = async(req,res)=>{
    try {
        const {dniPaciente,motivo} = req.body;
        const datosAgenda = req.session.agenda;
        const hora_inicio = new Date(datosAgenda.hora_inicio);
        const hora_fin = new Date(datosAgenda.hora_fin);
        const fechaJs = new Date(datosAgenda.fecha);
        await insertSobreTurno(`${hora_inicio.getHours()}:${hora_inicio.getMinutes()}`,`${hora_fin.getHours()}:${hora_fin.getMinutes()}`,motivo,dniPaciente,datosAgenda.id_agenda,fechaJs,true);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error reservarSobreTurno", error);
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
        await darTurno(id_turno,paciente,motivo);
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error updateTurno", error);
    }
}

export const updateEstadoTurno = async(req,res)=>{
    try {
        const {accion} = req.body;
        const {id_turno} = req.params;
        switch (accion) {
            case "confirmar":
                await estadoTurno(id_turno,3);
                break;
            case "cancelar":
                await estadoTurno(id_turno,4);
                break;
            case "ausente":
                await estadoTurno(id_turno,5);
                break;
            case "presente":
                await estadoTurno(id_turno,6);
                break;
            case "en-consulta":
                await estadoTurno(id_turno,7);
                break;
            case "atendido":
                await estadoTurno(id_turno,8);
                break;    
        }
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error updateEstadoTurno", error);
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

