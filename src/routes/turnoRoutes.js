import { Router } from 'express'
<<<<<<< Updated upstream
import { getTurno, traerTurnos, updateTurno,updateCancelar,updateConfirmar} from '../controllers/turnoController.js'
=======
import { getTurno, traerTurnos,updateCancelar,updateConfirmar, getTurno2,llevarTurno,reservarTurno} from '../controllers/turnoController.js'
>>>>>>> Stashed changes

const router = Router()

router.get('/darturno', getTurno)
router.post('/buscar', traerTurnos)
router.post('/tomar', reservarTurno)
router.post('/confirmar', updateConfirmar)
router.post('/cancelar', updateCancelar)
<<<<<<< Updated upstream
=======
router.get('/traerTurno/:id_agenda', getTurno2)
router.get('/turnoSeleccionado',llevarTurno);
>>>>>>> Stashed changes

export default router