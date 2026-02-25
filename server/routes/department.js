import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { addDepartment , getDepartments, deleteDepartment ,getDepartment,updateDepartment} from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', authMiddlware, getDepartments) 
router.post('/add', authMiddlware, addDepartment) 
router.get('/:id', authMiddlware, getDepartment) 
router.put('/:id', authMiddlware, updateDepartment) 
router.delete('/:id', authMiddlware, deleteDepartment) 


export default router