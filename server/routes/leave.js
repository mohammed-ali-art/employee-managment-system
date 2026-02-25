import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { addLeave ,getLeaves,getLeave ,getLeaveDetail,updateLeave,getLeavesForDepartment} from '../controllers/leaveController.js'


const router = express.Router()

router.post('/add', authMiddlware,addLeave )  
router.get('/detail/:id', authMiddlware,getLeaveDetail  )  
router.get('/:id/:role', authMiddlware, getLeave)    
router.get('/departmentHead', authMiddlware, getLeavesForDepartment);

router.get('/', authMiddlware,getLeaves )  
router.put('/:id', authMiddlware,updateLeave )  


export default router 