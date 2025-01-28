import { Request, Response } from "express";
import Product from "../../../models/product/Schema";


export default async function DeleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const data = await Product.findByIdAndDelete(id)
        if (!data) {
            res.status(404).json({
                success: false,
                message: "no product with this id was found"
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: `id:(${data._id}) name:(${data.name}) has been delected sucessfully`,
        });
        return
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}