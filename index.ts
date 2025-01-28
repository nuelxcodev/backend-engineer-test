import express, { Application, Request, Response } from "express"
import productsRoute from "./routes/products/route";
import dotenv from "dotenv"
import connect_to_database from "./utils/dbconnection";
import AuthicationRoute from "./routes/authentication/route";
// import cors from "cors"
dotenv.config()
const app: Application = express()

const PORT: any = process.env.PORT || 5000;
const ApiRoute: string = "/api/v1"

app.use(express.json())
app.use((req: Request, res: Response, next) => {
    console.log(`${req.method}${req.path}`)
    next()
})
app.use(ApiRoute, productsRoute)
app.use(ApiRoute, AuthicationRoute)

app.listen(PORT, async () => {
    try {
        await connect_to_database()
        console.log(`server now running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})


