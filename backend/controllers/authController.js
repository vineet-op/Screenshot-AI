import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from "../Model/userSchema.js";


const TOKEN_EXPIRY = '7h';
const COOKIE_MAX_AGE = 7 * 60 * 60 * 1000;


// Authentication Routes
export const register = async (req, res) => {

    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                error: "Database unavailable. Check MongoDB Atlas Network Access (whitelist your IP).",
            });
        }

        const { email, name, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: COOKIE_MAX_AGE
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
}

export const login = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                error: "Database unavailable. Check MongoDB Atlas Network Access (whitelist your IP).",
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: COOKIE_MAX_AGE
        });

        res.status(200).json({
            message: "Login successful",
            userId: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
}

export const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
