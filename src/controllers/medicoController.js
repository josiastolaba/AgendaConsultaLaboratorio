import { obtenerTodosLosMedicos } from "../models/usuarioModel.js";
import { obtenerTodasLasEspecialidades } from "../models/especialidadModel.js";
import { crearEspeMedicoInsert } from "../models/especialidad_medicoModel.js";

export const getMedico = async (req,res)=>{
    try {
        const usuarios_m = await obtenerTodosLosMedicos();
        const especialidades = await obtenerTodasLasEspecialidades();
        res.render('medico',{usuario: req.session.usuario,usuarios_m,especialidades});
    } catch (error) {
        console.error("Error getMedico",error);
    }
}

export const crearEspecialidadMedico = async (req,res)=>{
    try {
        const {usuario,especialidad} = req.body;
        const especialidadMedico = await crearEspeMedicoInsert(usuario, especialidad);
    } catch (error) {
        console.error("Error al mostrarMedicos", error);
    }
    res.redirect('/medico/datos');
}