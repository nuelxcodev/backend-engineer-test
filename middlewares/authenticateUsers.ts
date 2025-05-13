import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


interface AuthenticatedRequest extends Request {
    user?: { userId: string; role: string };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.header('Authorization')?.split(' ')[1];
    

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' })
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
        req.user = decoded;
        next()
    } catch (error) {
        console.error('JWT verification error:', error); 
        res.status(400).json({ message: 'Invalid token or expired token' })
        return;
    }
}
