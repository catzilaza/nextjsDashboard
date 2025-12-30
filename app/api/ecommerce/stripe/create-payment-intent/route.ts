import { NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const calculateOrderAmount = (items: any) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item: any) => {
    total += item.amount;
  });
  return total;
};

export async function POST(req: Request) {
  const { items } = await req.json();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  // return NextResponse.json({});
}

// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req: Request) {
//   try {
//     const { currency, paymentMethodType, paymentMethodOptions } = await req.json();

//     let orderAmount = 5999;
//     let params: Stripe.PaymentIntentCreateParams;

//     params = {
//       payment_method_types: paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
//       amount: orderAmount,
//       currency,
//     };

//     if (paymentMethodType === "acss_debit") {
//       params.payment_method_options = {
//         acss_debit: {
//           mandate_options: {
//             payment_schedule: "sporadic",
//             transaction_type: "personal",
//           },
//         },
//       };
//     }

//     if (paymentMethodOptions) {
//       params.payment_method_options = paymentMethodOptions;
//     }

//     const paymentIntent = await stripe.paymentIntents.create(params);

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//       nextAction: paymentIntent.next_action,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
