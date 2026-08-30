import User from "../models/User.model.js"

export const getCurrentUser = async(req,res)=>{

    try {
     
    const {name, email, role, status} = req.user;

    res.status(200).json({
        message:"user data",
        name,
        email,
        role,
        status,
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in user dashboard"
        })
        
    }



}