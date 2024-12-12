import { Router } from 'express'
import { getUsuario, updateUsuarioYPersona, crearUsuario } from '../controllers/usuarioController.js'

const router = Router()

router.get('/listar', getUsuario)
router.post('/modificar', updateUsuarioYPersona)
router.post('/crear', crearUsuario)

export default router