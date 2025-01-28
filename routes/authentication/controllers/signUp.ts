import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export default async function SignUpUser(req: Request, res: Response) {
    const data = req.body
    try {
        res.status(200).json({
            sucess: false,
            message: "authicaation route is working"
        })
    } catch (error) {

    }
}