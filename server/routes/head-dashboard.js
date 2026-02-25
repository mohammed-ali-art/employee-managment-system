import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import {getDepartmentHeadSummary} from '../controllers/dashboardController.js'


const router = express.Router()


router.get('/summary', authMiddleware, getDepartmentHeadSummary);


export default router  