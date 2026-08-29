import express from 'express'
import  mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("response from backned");
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDb connected")
}).catch((error)=>{
    console.log("Error in MongoDb connection",error);
    
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

