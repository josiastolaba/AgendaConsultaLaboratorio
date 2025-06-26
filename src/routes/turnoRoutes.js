import { Router } from 'express'
import { updateEstadoTurno,traerTurno,getTurno, traerTurnos,getTurno2,llevarTurno,reservarTurno} from '../controllers/turnoController.js'

const router = Router()

router.get('/darturno', getTurno)
router.post('/buscar', traerTurnos)
router.post('/tomar', reservarTurno)
router.get('/traerTurno/:id_agenda', getTurno2)
router.get('/turnoSeleccionado',llevarTurno);
router.get('/turnoSeleccionado/:id_turno',traerTurno);
router.post('/updateEstado/:id_turno', updateEstadoTurno);

export default router