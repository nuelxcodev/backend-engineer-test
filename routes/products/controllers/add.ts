import { Request, Response } from "express";
import Product from "../../../models/product/Schema";

type Products = {
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    stock: number
}
function isProduct(data: any): data is Products {
    return (
        typeof data.name === "string" &&
        typeof data.description === "string" &&
        typeof data.price === "number" &&
        typeof data.imageUrl === "string" &&
        typeof data.stock === "number"
    );
}
export default async function CreateProduct(req: Request, res: Response) {
    const data = req.body;
    const empty_keys: string[] = []
    const errors: string[] = [];
    const check = isProduct(data)
    try {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].length === 0) {
                    empty_keys.push(`${key} cant be empty`)
                }
            }
        }
        if (empty_keys.length === 0) {
            if (!isProduct(data)) {
                res.status(401).json({
                    success: false,
                    mesage: 'invalid type, pleas try again NB:(name, description, category and imageUrl should be String'
                })
                return;
            }
            await Product.insertMany(data)
            res.status(200).json({
                message: `new product with name:${data.name}`,
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: `${empty_keys.join(',')}`
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'an error occured during the process of creating this product. please try again'
        })
    }




    // console.log(data)

}