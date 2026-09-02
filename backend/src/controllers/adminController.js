import User from "../models/User.model.js"
import bcrypt from 'bcrypt'

export const getPendingEmployee = async(req,res)=>{
    
    try {
        const pendingEmployees = await User.find({
            role:"employee",
            status:"pending"
        }).select("-password");

       

        res.status(200).json(
            {
                message:"employee list",
               pendingEmployees
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in finding pending employees"
        })
        
        
    }


}


export const approveEmployee = async(req,res)=>{
    try {
        const empId = req.params.id;

       const employee = await User.findOne({
            _id:empId,
            role:"employee"
       })

        if(!employee){
            return res.status(404).json({
                message:"employee is not exist"
            })
        }

        if(employee.status !== "pending" && employee.status !== "rejected"){
            return res.status(409).json({
                 message:`Employee account is already ${employee.status}`
            })
        }

        await User.updateOne(
            {
                _id:empId,
                role: "employee",
                status: 
                { 
                    $in:
                     ["pending", "rejected"] 
                    }
                },
                {
                    $set:
                    {
                        status:"active"
                    }
                },
                {
                    runValidators: true
                }
            )

        res.status(200).json({
           message:'employee approved'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in employee approval"
        })
    }
}

export const rejectEmployee = async(req,res)=>{
    try {

        const empId = req.params.id;

       const employee = await User.findOne({
            _id:empId,
            role:"employee"
       })

       if(!employee){
        return res.status(404).json({
            message:"Employee not exist"
        })
       }

       if(employee.status !== "pending"){
        return res.status(409).json({
                 message:`Employee account is already ${employee.status}`
            })
       }

       await User.updateOne(
            {
                _id:employee._id,
                status:"pending",
                role:"employee"
            },
            {
                $set:{
                    status:"rejected"
                }
            },
             {
                runValidators: true
            }
        )

        res.status(200).json({
           message:'employee rejected successfully'
        })



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Erros in employee rejaction"
        })
        
    }
}


export const createManager = async (req,res)=>{
    try {
        
        const {name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are requied"
            })
        }

        const user = await User.findOne({email});

        if(user){
           return res.status(409).json({
            message:"User is already exist"
           }) 
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password:hashPassword,
            role:"manager",
            status:"active"
        })

        res.status(201).json({
            message:"Manager Id createded successfully"
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in manager creation"
        })
    }
}

export const getMangers = async(req,res)=>{
    try {

        const managers = await User.find({
            role:"manager"
        }).select("-password")


        res.status(200).json({
            message:"managers list",
            managers
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in getting managers"
        })
    }
}