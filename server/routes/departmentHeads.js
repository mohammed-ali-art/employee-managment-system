import express from 'express';
import {getDepartmentHeads,promoteToDepartmentHead,demoteFromDepartmentHead ,getEmployees,getAttendanceByDepartmentHead,attendanceReportByDepartmentHead} from '../controllers/departmentHeadsController.js'
import authMiddlware from '../middleware/authMiddlware.js'
import defaultAttendance from '../middleware/defaultAttendance.js'
import {updateAttendance} from '../controllers/attendanceController.js'



const router = express.Router();

router.get('/', authMiddlware, getDepartmentHeads);
router.get('/departmentHead', authMiddlware,getEmployees) 
router.put('/promote/:id', authMiddlware, promoteToDepartmentHead);
router.post('/demote/:id', authMiddlware, demoteFromDepartmentHead);
router.get('/attendance-head', authMiddlware,defaultAttendance, getAttendanceByDepartmentHead);
router.get('/update/:employeeId', authMiddlware, updateAttendance);
router.get('/attendanceReport-head', authMiddlware, attendanceReportByDepartmentHead);
export default router;



