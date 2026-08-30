import express from 'express'
import  mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRoutes.js';

const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("response from backned");
})

app.use("/api/auth",authRouter)
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDb connected")
}).catch((error)=>{
    console.log("Error in MongoDb connection",error);
    
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

