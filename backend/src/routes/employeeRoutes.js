import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { getMytask } from '../controllers/employeeController.js';

const router = express.Router();

router.get("/tasks",protect,authorize("employee"),getMytask)

export default router;