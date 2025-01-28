import { model, Schema, SchemaTypes } from "mongoose";

const productSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        require: true
    },
    description: {
        type: SchemaTypes.String,
        require: true
    },
    cartegory: {
        type: SchemaTypes.String,
        require: true
    },
    price: {
        type: SchemaTypes.String,
        require: true
    },
    quantity: {
        type: SchemaTypes.String,
        require: true
    },
    imageUrl: {
        type: SchemaTypes.String,
        require: true
    },
    stock: {
        type: SchemaTypes.String,
        require: true
    },



})

const Product = model('Products', productSchema)
export default Product;