import { Router } from 'express'
import { formAgenda, guardarAgenda, listarTurno, traerAgenda} from '../controllers/agendaController.js'

const router = Router()

router.get('/crearAgenda', formAgenda)
router.post('/crearAgenda', guardarAgenda)
router.post('/buscar', listarTurno)
router.get('/getAgenda/:id_agenda', traerAgenda)

export default router