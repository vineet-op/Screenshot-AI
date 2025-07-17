import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "../routes/authRoutes.js";
import imageRoutes from "../routes/imageRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

//connect to mongodb
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.log("❌ Error connecting to MongoDB", err);
    });

// Health check route
app.get("/health", (req, res) => {
    res.status(200).send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", imageRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
