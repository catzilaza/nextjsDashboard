import { getLoginSession } from "@/app/ecommerce/lib/uitls";
// import { stripe } from "@/app/ecommerce/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/ecommerce/lib/prisma";
// import { Stripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const db = prisma;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed: ", error);
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // case "checkout.session.completed": {
      //   const session = event.data.object as Stripe.Checkout.Session;
      //   const userId = session.metadata?.userId;
      //   const priceId = session.metadata?.priceId;

      //   if (userId && priceId) {
      //     const subscription = await Stripe.subscriptions.retrieve(
      //       session.subscription as string
      //     );

      //     await db.user.update({
      //       where: { id: userId },
      //       data: {
      //         stripeSubscriptionId: subscription.id,
      //         stripePriceId: priceId,
      //         stripeCurrentPeriodEnd: new Date(
      //           subscription.items.data[0].current_period_end * 1000
      //         ),
      //         plan: priceId === "premium" ? "premium" : "pro",
      //       },
      //     });
      //   }
      //   break;
      // }
      // case "customer.subscription.updated": {
      //   const subscription = event.data.object as Stripe.Subscription;
      //   const customerId = subscription.customer as string;

      //   const user = await db.user.findFirst({
      //     where: { stripeCustomerId: customerId },
      //   });

      //   if (user) {
      //     await db.user.update({
      //       where: { id: user.id },
      //       data: {
      //         stripeCurrentPeriodEnd: new Date(
      //           subscription.items.data[0].current_period_end * 1000
      //         ),
      //         plan:
      //           subscription.status === "active"
      //             ? user.stripePriceId === "premium"
      //               ? "premium"
      //               : "pro"
      //             : "free",
      //       },
      //     });
      //   }
      //   break;
      // }

      // case "customer.subscription.deleted": {
      //   const subscription = event.data.object as Stripe.Subscription;
      //   const customerId = subscription.customer as string;

      //   const user = await db.user.findFirst({
      //     where: { stripeCustomerId: customerId },
      //   });

      //   if (user) {
      //     await db.user.update({
      //       where: { id: user.id },
      //       data: {
      //         stripeSubscriptionId: null,
      //         stripePriceId: null,
      //         stripeCurrentPeriodEnd: null,
      //         plan: "free",
      //       },
      //     });
      //   }
      //   break;
      // }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook: ", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// export const config = {
//   api: {
//     bodyParser: false, // ต้องปิด bodyParser เพื่อใช้ raw body
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).end("Method Not Allowed");
//   }

//   const sig = req.headers["stripe-signature"] as string;

//   let event: Stripe.Event;

//   try {
//     const buf = await new Promise<Buffer>((resolve, reject) => {
//       const chunks: Buffer[] = [];
//       req.on("data", (chunk) => chunks.push(chunk));
//       req.on("end", () => resolve(Buffer.concat(chunks)));
//       req.on("error", reject);
//     });

//     event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err: any) {
//     console.error("Webhook signature verification failed.", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const piSucceeded = event.data.object as Stripe.PaymentIntent;
//       console.log("💰 Payment captured!", piSucceeded.id);
//       break;
//     case "payment_intent.payment_failed":
//       const piFailed = event.data.object as Stripe.PaymentIntent;
//       console.log("❌ Payment failed.", piFailed.id);
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.json({ received: true });
// }
