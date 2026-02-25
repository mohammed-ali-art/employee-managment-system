import express  from 'express'
import {getAttendance ,updateAttendance,attendanceRebort} from '../controllers/attendanceController.js'
import authMiddlware from '../middleware/authMiddlware.js'
import defaultAttendance from '../middleware/defaultAttendance.js'


const router = express.Router()
router.get('/',authMiddlware,defaultAttendance,getAttendance )
router.put('/update/:employeeId',authMiddlware,updateAttendance )
router.get('/report',authMiddlware,attendanceRebort )
export default router