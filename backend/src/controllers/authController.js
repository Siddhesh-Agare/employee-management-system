import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerEmployee = async(req, res)=>{
    try {

        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
            message: "All fields are required"
        });
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(409).json({
                message:"User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create(
            {
            name,
            email,
            password :hashPassword,
            role:"employee",
            status:"pending"
            }
        )
        
        res.status(201).json({
            message:"User is created successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in user Registration"
        })
    }
}

export const LoginEmployee = async(req,res)=>{
    
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    if (user.status !== "active") {
        return res.status(403).json({
            message: `Account is ${user.status}`
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password  
    )

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid email and password"
        })
    }

    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"2d"}
    )

    res.status(200).json({
        message:"Login sucessful",
        token
    })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"error in user login",

        })
        
    }
} 