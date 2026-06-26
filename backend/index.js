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
        "https://screenshots.vineetop.com/",
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
}));


const mongoUri = process.env.MONGODB_URI?.trim();

function buildMongoUri(uri) {
    if (!uri) return null;
    if (uri.includes("?")) return uri;
    const base = uri.replace(/\/$/, "");
    return `${base}/screenshot-ai?retryWrites=true&w=majority`;
}

const resolvedMongoUri = buildMongoUri(mongoUri);

mongoose.set("bufferCommands", false);

if (!resolvedMongoUri || resolvedMongoUri.includes("<db_password>")) {
    console.error("❌ MONGODB_URI is missing or still contains the <db_password> placeholder.");
    console.error("   Update backend/.env with your Atlas connection string and restart the server.");
} else {
    mongoose
        .connect(resolvedMongoUri, {
            serverSelectionTimeoutMS: 10000,
            autoSelectFamily: false,
        })
        .then(() => {
            console.log("✅ Connected to MongoDB");
        })
        .catch((err) => {
            console.error("❌ Error connecting to MongoDB:", err.message);
            console.error("   Fix in MongoDB Atlas:");
            console.error("   1. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0) for dev");
            console.error("   2. Database Access → confirm user/password match your connection string");
            console.error("   3. Clusters → ensure the cluster is not paused");
        });
}

export const isDbConnected = () => mongoose.connection.readyState === 1;

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