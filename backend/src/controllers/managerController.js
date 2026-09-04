import Task from "../models/Task.model.js";
import User from "../models/User.model.js";

export const getMyEmployee = async (req,res)=>{
    try {

        const {_id} = req.user;

        const myEmployees = await User.find({
            role:"employee",
            manager:_id
        }).select("-password")

        res.status(200).json({
            message:"Employees fetched successfully",
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

export const createTask = async(req, res)=>{
    try {

        const managerId = req.user._id;
        const {title, description, assignedTo, dueDate} = req.body;

        if(!title || !description || !assignedTo || !dueDate){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const assignedEmployee = await User.findOne(
            {
                _id:assignedTo,
                manager:managerId,
                role:"employee",
                status:"active"
            }
        );

        if(!assignedEmployee){
            return res.status(400).json({
                message:"Employee not assigned to you or not found or status is not active"
            })
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            assignedBy:managerId,
            dueDate

        })

        res.status(201).json({
            message:`task created successfully`,
            task
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in task creation"
        })
        
    }
}

export const getManagerTask = async(req, res) =>{
    try {

        const tasks = await Task.find({
            assignedBy:req.user._id,
        })

        res.status(200).json({
            message:"Your tasks",
            tasks
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in fetching manager tasks"
        })
        
    }
}


export const reviewTask = async (req, res)=>{
    try {

        const task = await Task.findOne({_id:req.params.taskId,assignedBy:req.user._id,status:"submitted"})

        if(!task){
            return res.status(404).json({
                message:"task is not found"
            })
        }

        await Task.updateOne(
            {
                _id:task._id
            },
            {
                $set:
                {
                    status:"reviewed"

                }
            }
        )

        res.status(200).json({
            message:"task reviewed successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in task review"
        })
        
    }
}

export const updateTaskStatusChangesRequired = async (req, res) => {
    try {

        const { feedback } = req.body || {};

        const task = await Task.findOne({
            _id: req.params.taskId,
            assignedBy: req.user._id,
            status: "submitted"
        });

        if (!task) {
            return res.status(404).json({
                message: "Task is not found"
            });
        }

        if (!feedback) {
            return res.status(400).json({
                message: "Feedback is required"
            });
        }

        await Task.updateOne(
            {
                _id: task._id
            },
            {
                $set: {
                    status: "changes-required",
                    feedback: feedback
                }
            }
        );

        res.status(200).json({
            message: "Task sent back for changes successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error in updating task status"
        });
    }
};