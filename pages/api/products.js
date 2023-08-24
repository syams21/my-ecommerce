import Product from "../../models/Product";
import { initMongoose } from "../../lib/mongoose";

export default async function handle(req, res) {
    await initMongoose();
    res.json(await Product.find().exec());
}