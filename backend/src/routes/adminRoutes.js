import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { getPendingEmployee } from '../controllers/adminController.js';

const router = express.Router();

router.get("/employee/pending",protect,authorize("admin"),getPendingEmployee)

export default router;