import { Router } from 'express'
import { getTurno, traerTurnos, updateTurno,updateCancelar,updateConfirmar} from '../controllers/turnoController.js'

const router = Router()

router.get('/darturno', getTurno)
router.post('/buscar', traerTurnos)
router.post('/tomar', updateTurno)
router.post('/confirmar', updateConfirmar)
router.post('/cancelar', updateCancelar)

export default router