import { Request, Response } from "express";
import User from "../../../models/user/Schema";
import { HashData } from "../../../utils/authentication/bcrypt";

export default async function SignUpUser(req: Request, res: Response) {
    const { username, email, password, role} = req.body;

    if (!(username && email && password)) {
        res.status(400).json({
            success: false,
            message: "All fields are required.",
        })
        return;
    }
    const userEmail = email.trim();
    const userPassword = password.trim();

    try {
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

        if (user_found) {
            res.status(404).json({
                success: false,
                message: 'user already exist.'
            })
            return;
        }
        const hashedpassword = HashData(userPassword)
        const user = new User({
            username: username,
            email: userEmail,
            password: hashedpassword,
            role
        })
        await user.save()
        res.status(200).json({
            success: true,
            message: "User signup successful! Authentication route is working.",
        });
        return;
    } catch (error) {
        console.error(`Error encountered: ${error}`);
        res.status(500).json({
            success: false,
            message: "An error occurred during sign-up. Please try again later!",
        })
        return;
    }
}
