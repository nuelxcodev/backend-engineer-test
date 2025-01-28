import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default async function connect_to_database() {
    const URL: any = process.env.MONGO_URI
    try {
        await mongoose.connect(URL)
        console.log("connected to mongo database successfully")
    } catch (error) {
        throw new Error("failed to connect to mongodatabase" + error)
    }
}