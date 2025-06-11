import { obtenerTodosLosRoles } from '../models/rolModel.js';
import { obtenerTodosLosUsuarios, modificarUsuario, insertarUsuario } from '../models/usuarioModel.js';
import { modificarPersona, insertarPersona } from '../models/personaModel.js';
import bcrypt from "bcrypt";


export const getUsuario = async (req,res)=>{
    try {
        const roles = await obtenerTodosLosRoles();
        const usuarios = await obtenerTodosLosUsuarios();
        res.render('usuario',{usuario: req.session.usuario,roles,usuarios});
    } catch (error) {
        console.error("Error getUsuario",error);
    }
}

export const updateUsuarioYPersona = async (req,res)=>{
    try {
        console.log(req.body)
        const {dni,nombre,apellido,direccion,fechaNacimiento,email,estado_usuario,rol,id_usuario} = req.body;
        await modificarPersona(dni,nombre,apellido,direccion,fechaNacimiento,email);
        await modificarUsuario(rol,estado_usuario,id_usuario);
        res.redirect("/usuario/listar");
    } catch (error) {
        console.error("Error getUsuario",error);
    }
}

export const crearUsuario = async (req,res)=>{
    try {
        const {dni,nombre,apellido,direccion,fechaNacimiento,email,password,img_doc} = req.body;
        if(!(dni && password)){
            return res.status(400);
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);
        if(await insertarPersona(dni,nombre,apellido,direccion,fechaNacimiento,email,img_doc,)===1){
            const usuarioInsert = await insertarUsuario(passwordHash,dni);
        }
        // if(usuarioInsert){
        //     res.json({nombre: nombre
        //         ,apellido: apellido
        //         ,dni: dni})
        // }else{
        //     //res.status(500).end()
        // }
        res.redirect("/turno/darturno");
    } catch (error) {
        console.error("Error al crearUsuario", error);
    }
}


