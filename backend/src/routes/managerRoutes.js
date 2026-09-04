import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { approveMyEmployee, createTask, getManagerTask, getMyEmployee, rejectMyEmployee } from '../controllers/managerController.js';

const router = express.Router();

router.get("/employee",protect,authorize("manager"),getMyEmployee)
router.patch("/employee/:employeeId/approve",protect,authorize("manager"),approveMyEmployee)
router.patch("/employee/:employeeId/reject",protect,authorize("manager"),rejectMyEmployee)
router.post("/tasks/create",protect,authorize("manager"),createTask);
router.get("/tasks",protect,authorize("manager"),getManagerTask)

export default router