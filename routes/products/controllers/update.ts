import { Request, Response } from "express";
import Product from "../../../models/product/Schema";

export default async function UpdateProduct(req: Request, res: Response) {
    const { id } = req.params
    try {
        const product: any = await Product.findById(id)
        const Update = req.body;
        const upda_mss: string[] = []
        for (const key in Update) {
            if (Update.hasOwnProperty(key) && product[key] !== Update[key]) {
                upda_mss.push(`${key} was changed from ${product[key]} to ${Update[key]} \n`)
            }
        }
        Object.assign(product, Update)
        product.save()
        res.status(200).json({
            message: `product (${product._id}) was updated sucessfull \n datail: [ ${upda_mss.join(' and ')}]`,
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: `an erro ocurred while updating product. please try again: ${error}`
        })
    }

}