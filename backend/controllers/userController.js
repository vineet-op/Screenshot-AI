import jwt from 'jsonwebtoken';

export const getCurrentUser = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ userId: decoded.userId, email: decoded.email });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
