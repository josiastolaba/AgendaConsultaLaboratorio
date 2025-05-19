import { Router } from 'express'
import { getTurno, traerTurnos, updateTurno,updateCancelar,updateConfirmar, getTurno2} from '../controllers/turnoController.js'

const router = Router()

router.get('/darturno', getTurno)
router.post('/buscar', traerTurnos)
router.post('/tomar', updateTurno)
router.post('/confirmar', updateConfirmar)
router.post('/cancelar', updateCancelar)
router.get('/traerTurno/:id_agenda', getTurno2)
router.get('/turnoSeleccionado', (req, res) => {
    const { id_agenda, hora_inicio_m, hora_fin_m, fecha } = req.query;
    console.log(id_agenda, hora_inicio_m, hora_fin_m, fecha);
});

export default router