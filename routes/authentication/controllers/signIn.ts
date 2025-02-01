import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../../../models/user/Schema";
import { compareHashedData } from "../../../utils/authentication/bcrypt";

export default async function SignIUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).json({
            success: false,
            message: "All fields are required",
        })
        return;
    }
    try {
        const userEmail = email.trim();
        const userPassword = password.trim();

        if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(userEmail)) {
            res.status(400).json({
                success: false,
                message: "Invalid email address.",
            })
            return;
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(userPassword)) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.",
            });
            return;
        }

        const user_found = await User.findOne({ email })
        if (!user_found) {
            res.status(404).json({
                success: false,
                message: 'user now found please check credentials and try again '
            })
        }
        const hashedpassword = user_found?.password as string
        if (compareHashedData(hashedpassword, userPassword)) {
            const token = jwt.sign(
                { userId: user_found?._id, role: user_found?.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' }
            );

            res.status(200).json({
                sucess: false,
                message: "authicaation route is working",
                token
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: " an error occured"
        })
    }
}