import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { addSalary,getSalary } from '../controllers/salaryContoller.js'


const router = express.Router()

router.post('/add', authMiddlware, addSalary)  
router.get('/:id/:role', authMiddlware, getSalary)  


export default router 