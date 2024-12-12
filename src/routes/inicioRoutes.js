import { Router } from 'express'
import { crearUsuario, formRegistro, getLogin, iniciarSesion, cerrarSesion } from '../controllers/inicioController.js'

const router = Router()

router.get('/login', getLogin)
router.get('/formRegistro', formRegistro)
router.post('/crearUsuario', crearUsuario)
router.post('/autenticar', iniciarSesion)
router.post('/cerrarSesion', cerrarSesion)

export default router