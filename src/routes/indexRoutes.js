import { Router } from 'express'
import { getIndex } from '../controllers/indexController.js'

const router = Router()

router.get('/', getIndex)

export default router