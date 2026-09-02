import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import adminRouter from './src/routes/adminRoutes.js';
import connectDB from './src/config/db.js';
import managerRouter from './src/routes/managerRoutes.js';

const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("response from backned");
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/manager",managerRouter)

connectDB();

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

