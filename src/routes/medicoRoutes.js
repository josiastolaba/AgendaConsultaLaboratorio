import { Router } from 'express'
import { getMedico, crearEspecialidadMedico } from '../controllers/medicoController.js'

const router = Router()

router.get('/datos', getMedico)
router.post('/crearEspeMedic', crearEspecialidadMedico)

export default router