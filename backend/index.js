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
app.use(express.json());

// CORS Configuration - This is the fix for your issue
app.use(cors({
    origin: [
        "https://screenshot-ai-iota.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
}));

// Additional CORS options configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});


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

app.use('/api/auth/me', getCurrentUser);
app.use("/api/auth", authRoutes);
app.use("/api/user", imageRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`💓 Server running on port ${PORT}`);
});


export default app;