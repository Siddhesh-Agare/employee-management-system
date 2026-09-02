import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { approveEmployee, createManager, getPendingEmployee, rejectEmployee } from '../controllers/adminController.js';


const router = express.Router();

router.get("/employee/pending",protect,authorize("admin"),getPendingEmployee)
router.patch("/employee/:id/approve",protect,authorize("admin"),approveEmployee)
router.patch("/employee/:id/reject",protect,authorize("admin"),rejectEmployee)
router.post("/manager/create",protect,authorize("admin"),createManager)

export default router;