import { Router } from 'express'
import { getTurno, traerTurnos,updateCancelar,updateConfirmar, getTurno2,llevarTurno,reservarTurno} from '../controllers/turnoController.js'

const router = Router()

router.get('/darturno', getTurno)
router.post('/buscar', traerTurnos)
router.post('/tomar', reservarTurno)
router.post('/confirmar', updateConfirmar)
router.post('/cancelar', updateCancelar)
router.get('/traerTurno/:id_agenda', getTurno2)
router.get('/turnoSeleccionado',llevarTurno);

export default router