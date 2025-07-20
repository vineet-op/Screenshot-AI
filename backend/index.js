import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import { getCurrentUser } from "./controllers/userController.js";


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



mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.log("❌ Error connecting to MongoDB", err);
    });

// Health check route
app.get("/", (req, res) => {
    res.status(200).
        json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", imageRoutes);
app.use('/api/auth/me', getCurrentUser);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`💓 Server running on port ${PORT}`);
});


export default app;