import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import connectDB from "./src/config/db.js";
import managerRouter from "./src/routes/managerRoutes.js";
import employeeRouter from "./src/routes/employeeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Response from backend");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/manager", managerRouter);
app.use("/api/employee", employeeRouter);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});