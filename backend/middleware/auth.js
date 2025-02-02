import jwt from 'jsonwebtoken';

// Middleware to verify JWT token

export const authenticateToken = (req, res, next) => {
    const wholeToken = req.header('Authorization');
    const token = wholeToken.split(' ')[1];
    console.log("WHOLE",wholeToken,"Token",token)

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
