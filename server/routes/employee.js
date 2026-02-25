import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { addEmployee,upload ,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId} from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMiddlware, getEmployees) 
router.post('/add', authMiddlware,upload.single('image'), addEmployee) 
router.get('/:id', authMiddlware, getEmployee) 
router.put('/:id', authMiddlware, updateEmployee) 
router.get('/department/:id', authMiddlware, fetchEmployeesByDepId) 


export default router 