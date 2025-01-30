import { Router } from "express";
import getallProduct from "./controllers/get";
import DeleteProduct from "./controllers/delete";
import UpdateProduct from "./controllers/update";
import createProduct from "./controllers/add";
import { authorization } from "../../middlewares/authorizeUsers";
import { authenticate } from "../../middlewares/authenticateUsers";

const productsRoute = Router();

// 🔍 GET: Public access
productsRoute.get("/products", getallProduct);


productsRoute.post("/products", authenticate, authorization("admin"), createProduct);


productsRoute.put("/products/:id", authenticate, authorization("admin"), UpdateProduct);


productsRoute.delete("/products/:id", authenticate, authorization("admin"), DeleteProduct);

export default productsRoute;
