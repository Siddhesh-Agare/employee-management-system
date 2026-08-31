import User from "../models/User.model.js"

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