import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { getMytask, updateTaskStatus } from '../controllers/employeeController.js';

const router = express.Router();

router.get("/tasks",protect,authorize("employee"),getMytask)
router.patch("/tasks/:taskId/status",protect,authorize("employee"),updateTaskStatus)

export default router;