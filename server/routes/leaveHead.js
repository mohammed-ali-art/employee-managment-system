import express from 'express'
import authMiddlware from '../middleware/authMiddlware.js'
import { getLeaves,getLeave ,getLeaveDetail,updateLeave,getLeavesForDepartment} from '../controllers/leaveController.js'


const router = express.Router()

router.get('/detail/:id', authMiddlware,getLeaveDetail  )  
router.get('/departmentHead', authMiddlware,getLeavesForDepartment )    
router.put('/:id', authMiddlware,updateLeave )  


export default router  