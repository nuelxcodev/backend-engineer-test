import { Router, Request, Response } from 'express';
import getallProduct from './controllers/get';
import DeleteProduct from './controllers/delete';
import UpdateProduct from './controllers/update';
import createProduct from './controllers/add';
;
const productsRoute = Router();

// get request
productsRoute.get('/products', getallProduct);

// post request
productsRoute.post('/products', createProduct);

// update request
productsRoute.put('/products/:id', UpdateProduct);

// delete reques
productsRoute.delete('/products/:id', DeleteProduct);

export default productsRoute; 
