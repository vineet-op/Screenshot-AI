import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../Model/userSchema.js";

// Authentication Routes
export const register = async (req, res) => {

    try {
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
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true on HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
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
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
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
