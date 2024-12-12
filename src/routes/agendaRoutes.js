import { Router } from 'express'
import { formAgenda, guardarAgenda,listarTurno} from '../controllers/agendaController.js'

const router = Router()

router.get('/crearAgenda', formAgenda)
router.post('/crearAgenda', guardarAgenda)
router.post('/buscar', listarTurno)

export default router