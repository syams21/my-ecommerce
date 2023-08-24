import Product from "../../models/Product";
import { initMongoose } from "../../lib/mongoose";

export async function findAllProducts() {
    return Product.find().exec();
}

export default async function handle(req, res) {
    await initMongoose();
    res.json(await findAllProducts());
}