import dummydata from "./dummydata";
import Product from "./models/product/Schema";
import connect_to_database from "./utils/dbconnection";

async function seed() {
    try {
        console.log("connecting to database")
        await connect_to_database();
        console.log("connected to database")

        console.log("cleaning up database")
        await Product.deleteMany({});

        console.log("inserting data into database")
        await Product.insertMany(dummydata);
        console.log("Data seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding data:", (error as Error).message);
        process.exit(1);
    }
}

seed();
