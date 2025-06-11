import { buscarUsuario, insertarUsuario } from "../models/usuarioModel.js";
import { insertarPersona } from "../models/personaModel.js";
import bcrypt from "bcrypt";

export const getLogin = (req,res)=>{ 
    try {
        res.render('login');
    } catch (error) {
        console.error("Error getLogin", error);
    } 
}  

export const formRegistro = async (req,res)=>{
    try {
        res.render('registrarUsuario');
    } catch (error) {
        console.error("formRegistro", error);
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
            await insertarUsuario(passwordHash,dni)
        }
        res.redirect('/inicio/login');
    } catch (error) {
        console.error("Error al crearUsuario", error);
    }
}

export const iniciarSesion = async (req,res)=>{
    try {
        const {dni,password} = req.body;
        const user = await buscarUsuario(dni);
        console.log(req.body);
        if(user){
            const passwordCorrecta = await bcrypt.compare(password, user.password);
            if(!passwordCorrecta){
                //res.redirect('/')
                console.error('Contraseña incorrecta');
                console.log('Enviando respuesta con error...');
                return res.status(401).json({ errorCredenciales: '*Credenciales incorrectas' });
            }
            req.session.usuario = {dni: user.dni,
                nombre: user.nombre,
                apellido: user.apellido,
                direccion: user.direccion,
                email: user.email,
                rol: user.rol
            }
            req.session.save((error) => {
                if (error) {
                    console.error('Error al guardar la sesión:', error);
                    return res.status(500).send('Error al guardar sesión');
                } else {
                    console.log('Sesión guardada con éxito ', req.session.user);
                    //res.render('index', { usuario: req.session.usuario });
                    return res.redirect('/'); 
                }
            });
        }else{
            console.log("No se encontro el usuario");
            return res.status(401).json({ errorCredenciales: '*Credenciales incorrectas' });
        }
    } catch (error) {
        console.error("Error iniciarSesion", error);
    }
}

export const cerrarSesion = async (req,res) =>{
    try {
        await req.session.destroy(err =>{
            res.redirect('/');
        })
        return
    } catch (error) {
        console.error("Error cerrarSesion", error);
    }
}