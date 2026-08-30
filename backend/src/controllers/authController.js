import User from "../models/User.model.js";
import bcrypt from 'bcrypt'


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
                message:"User is already exist"
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