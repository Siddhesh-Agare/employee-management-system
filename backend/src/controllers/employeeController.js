import { response } from "express";
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

export const updateTaskStatus = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.taskId,
            assignedTo: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task is not found"
            });
        }

        // assigned → in-progress
        if (task.status === "assigned" || task.status === "changes-required") {
            await Task.updateOne(
                {
                    _id: task._id
                },
                {
                    $set: {
                        status: "in-progress"
                    }
                }
            );

            return res.status(200).json({
                message: "Task moved to in-progress successfully"
            });
        }

        // in-progress → submitted
        if (task.status === "in-progress") {

             const { response } = req.body || {};

            if (!response) {
                return res.status(400).json({
                    message: "Response is required before submitting the task"
                });
            }

            await Task.updateOne(
                {
                    _id: task._id
                },
                {
                    $set: {
                        status: "submitted",
                        response: response
                    }
                }
            );

            return res.status(200).json({
                message: "Task submitted successfully"
            });
        }

        // submitted/reviewed → employee cannot change
        if (task.status === "submitted" || task.status === "reviewed") {
            return res.status(403).json({
                message: "You cannot change the status of this task"
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error in updating status"
        });
    }
};