import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { approveMyEmployee, getMyEmployee } from '../controllers/managerController.js';

const router = express.Router();

router.get("/employee",protect,authorize("manager"),getMyEmployee)
router.patch("/employee/:employeeId/approve",protect,authorize("manager"),approveMyEmployee)

export default router