import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["assigned", "in-progress", "submitted","changes-required", "reviewed"],
            default: "assigned",
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        response: {
            type: String,
            default: ""
        },

        feedback: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;