import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export default async function ResetPassword(req: Request, res: Response) {
    try {
res.status(200).json({
    sucess: false,
    message: "authicaation route is working"
})
    } catch (error) {

    }
}