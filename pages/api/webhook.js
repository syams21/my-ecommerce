import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res) {
    await initMongoose();
    const signinSecret = 'whsec_274561f3579d163df491687525ecd5f4fbd3cd8f7a22d85136394954f59cb25e';
    const payload = await buffer(req);
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(payload, signature, signinSecret);

    if (event.type === "checkout.session.completed") {
        const metadata = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;
        if (metadata?.orderId && paymentStatus === 'paid') {
            await Order.findByIdAndUpdate(metadata.orderId, {paid:1});
        }
    }
    res.json('ok')
};

export const config = {
    api: {
        bodyParser: false,
    }
}
