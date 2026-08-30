import express from 'express'
import { LoginEmployee, registerEmployee } from '../controllers/authController.js';

const router = express.Router();

router.post("/register",registerEmployee);
router.post("/login",LoginEmployee);

export default router;