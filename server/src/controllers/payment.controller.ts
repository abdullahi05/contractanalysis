import { Request, Response } from "express";
import Stripe from "stripe"
import User, { IUser } from "../models/user.model";
import { sendPremiumConfirmationEmail } from "../services/email.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia"
}) 

export const createCheckoutSession = async (req:Request, res:Response) => {
    const user = req.user as any;

    try {
       const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data:{
                        name: "Lifetime Subscription"
                    },
                    unit_amount: 1000, // $1
                },
                quantity: 1
            }
         ],
         customer_email :user.email,
        //  if you want subscription change the mode to subscription
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        client_reference_id: user._id.toString(),
       });

       res.json({sessionId: session.id});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Payment Failed pls Try Again"})
    }
};

export const handleWebhook = async (req:Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.log(error);
        res.status(400).send(`webhook Error: ${error.message}`)
        return;
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;

        if(userId){
            const user = await User.findByIdAndUpdate(userId, 
                {isPremium: true },
                {new: true}
            );

            if(user && user.email) {
                await sendPremiumConfirmationEmail(user.email, user.displayName)
            }
        }
    }

    res.json({ received: true})
}

export const getPremiumStatus = async (req: Request, res: Response) => {
    const user = req.user as IUser;
    if(user.isPremium) {
        res.json({status: "active"})
    } else{ 
        res.json({status: "inactive"})
    }
}

