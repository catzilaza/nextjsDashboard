import { NextResponse } from "next/server";
import { getLoginSession } from "@/app/ecommerce/lib/uitls";
import { error } from "console";
// import { getLoginSession } from "@/app/lib/data";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export async function POST(req: Request) {
  const session = await getLoginSession();
  if (!session) {
    console.log("message: Unauthorized status: 401");
  }
  try {
    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("No cart items provided", { status: 400 });
    }

    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // console.log("cartItems : ", cartItems[0]);

    for (let i = 0; i < line_items.length; i++) {
      console.log(line_items[i]);
    }

    console.log("session : ", session);

    // const session = await stripe.checkout.sessions.create({
    //   line_items,
    //   mode: "payment",
    //   success_url: `${req.headers.get("origin")}/success`,
    //   cancel_url: `${req.headers.get("origin")}/cancel`,
    // });

    return NextResponse.json(
      //   { url: session.url },
      {
        headers: corsHeaders,
        message: "success",
        url: "/ecommerce/success",
      }
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
