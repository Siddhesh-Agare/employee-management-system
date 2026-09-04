import Task from "../models/Task.model.js";

export const getMytask = async (req, res)=>{
    try {

        const tasks = await Task.find({assignedTo:req.user._id});

        res.status(200).json({
            message:"Your tasks",
            tasks
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in getting tasks"
        })
        
    }
}