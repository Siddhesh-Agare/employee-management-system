import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import User from "../models/User.model.js";


const createAdmin = async () => {

    try {

        // Connect to MongoDB
        await connectDB();

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Check if Admin already exists
        const adminExist = await User.findOne({
            role: "admin"
        });

        // If Admin exists → update
        if (adminExist) {

            await User.updateOne(
                { _id: adminExist._id },
                {
                    $set: {
                        email: email,
                        password: hashPassword
                    }
                }
            );

            console.log("Admin updated successfully");
            console.log("Email:", email);

            return;
        }

        // If Admin doesn't exist → create
        await User.create({
            name: "Admin",
            email: email,
            password: hashPassword,
            role: "admin",
            status: "active"
        });

        console.log("Admin created successfully");
        console.log("Email:", email);

    } catch (error) {

        console.log("Error creating/updating admin:", error);

    } finally {

        await mongoose.connection.close();

    }
};


createAdmin();
