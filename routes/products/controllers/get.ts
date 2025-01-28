import { Request, Response } from "express";
import Product from "../../../models/product/Schema";


export default async function getallProduct(req: Request, res: Response) {
    const page = parseInt(req.query.page as string)
    const Itemsperpage = 3
    try {
        const product_list = await Product.find()
            .skip(page * Itemsperpage)
            .limit(Itemsperpage)
        const total = await Product.countDocuments();
        const tot_num_page = Math.ceil(total / Itemsperpage)
        res.status(200).json({
            meta: {
                page,
                total,
                next_page: page < tot_num_page ? `${process.env.BASE_URL}products?page=${page + 1}` : null,
                previous_page: page > 1 ? `${process.env.BASE_URL}products?page=${page - 1}` : null
            },
            product_list
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: " an error occured! please try again!"
        })
    }

}