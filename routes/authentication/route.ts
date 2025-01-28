import { Router } from "express";
import SignIUser from "./controllers/signIn";
import SignUpUser from "./controllers/signUp";
import ResetPassword from "./controllers/resetpss";

const AuthicationRoute = Router()


AuthicationRoute.post("/signup", SignUpUser)

AuthicationRoute.post("/signin", SignIUser)

AuthicationRoute.post("/resetpassword", ResetPassword)


export default AuthicationRoute


