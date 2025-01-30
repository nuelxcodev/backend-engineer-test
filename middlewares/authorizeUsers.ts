import { Request, Response, NextFunction } from "express";

interface authRequest extends Request {
    user?: { role: string }
}

export function authorization(role: string) {
    return (req: authRequest, res: Response, next: NextFunction): void => {
        if (!req.user || req.user.role !== role) {
            res.status(403).json({ message: "Access denied. Admins only." })
            return;
        }
        next();
    };
}
