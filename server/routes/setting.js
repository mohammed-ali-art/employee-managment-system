import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { chagePassword } from '../controllers/settingController.js'


const router = express.Router()

router.put('/change-password', authMiddlware, chagePassword)  


export default router 