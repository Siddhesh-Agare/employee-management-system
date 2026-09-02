import User from "../models/User.model.js";

export const getMyEmployee = async (req,res)=>{
    try {

        const {_id} = req.user;

        const myEmployees = await User.find({
            role:"employee",
            manager:_id
        }).select("-password")

        res.status(200).json({
            message:"List of your employees",
            myEmployees
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in getting employee"
        })
        
    }
}

export const approveMyEmployee = async(req,res)=>{
    try {

        const managerId = req.user._id;
        const employeeId = req.params.employeeId;

        const employee = await User.findOne(
            {
                _id:employeeId,
                role:"employee",
                manager:managerId,
                status: { $in: ["pending", "rejected"] }
            }
        );
        if(!employee){
            return res.status(404).json({
                message:"Employee does not found or not assigned to you"
            })
        }

        await User.updateOne(
            {
                _id:employeeId,
            },
        {
            $set:{
                status:"active"
            }
        })

        res.status(200).json({
            message:"employee approve successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Erros in manager employee approval "
        })
        
    }
}


export const rejectMyEmployee = async(req,res)=>{
    try {

        const managerId = req.user._id;
        const employeeId = req.params.employeeId;

        const employee = await User.findOne(
            {
                _id:employeeId,
                role:"employee",
                manager:managerId,
                status: "pending"
            }
        );
        if(!employee){
            return res.status(404).json({
                message:"Employee does not found or not assigned to you"
            })
        }

        await User.updateOne(
            {
                _id:employeeId,
            },
        {
            $set:{
                status:"rejected"
            }
        })

        res.status(200).json({
            message:"employee rejected successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Erros in manager employee rejection "
        })
        
    }
}