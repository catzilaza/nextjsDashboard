import { NextResponse } from "next/server";
import { getLoginSession } from "@/app/ecommerce/lib/uitls";
import prisma from "@/app/ecommerce/lib/prisma";
// import { stripe } from "@/app/ecommerce/lib/stripe";
import Stripe from "stripe";
import Error from "next/error";

const db = prisma;

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
  try {
    const login_session = await getLoginSession();

    if (!login_session) {
      console.log("message: Unauthorized status: 401");
      return NextResponse.json({ message: "error" }, { status: 401 });
    }

    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("No cart items provided", { status: 400 });
    }

    const product_line_items = cartItems.map((item: any) => ({
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

    for (let i = 0; i < product_line_items.length; i++) {
      console.log(product_line_items[i]);
    }

    const user = await db.user.findUnique({
      where: { email: login_session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //    let customerId = user.stripeCustomerId

    // if (!customerId) {
    //   const customer = await stripe.customers.create({
    //     email: user.email,
    //     metadata: {
    //       userId: user.id,
    //     },
    //   })
    //   customerId = customer.id

    //   await db.user.update({
    //     where: { id: user.id },
    //     data: { stripeCustomerId: customerId },
    //   })
    // }

    console.log("login_session : ", login_session);
    // console.log("user : ", user);
    // คิดว่าควรลงบันทึกรายการซื้อไว้ในฐานข้อมูล คำสั่งซื้อ ว่ามี รายการอะไรบ้าง และยังไม่จ่าย

    // const session = await stripe.checkout.sessions.create({
    // await (Stripe as any).checkout.sessions.create

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-12-15.clover",
    });

    const stripCheckoutSession = await stripe.checkout.sessions.create({
      // customer: customerId!,
      // payment_method_types: ["card"],
      // line_items: [
      //   {
      //     price: STRIPE_PRICE_IDS[priceId as keyof typeof STRIPE_PRICE_IDS], // This line is commented out in the original code
      //     quantity: 1,
      //   },
      // ],
      // mode: "subscription",
      // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/ecommerce/success`,

      // cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ecommerce/cancel`,
      // metadata: {
      //   userId: user.id,
      //   priceId,
      // },
      line_items: product_line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/ecommerce/success`,
      cancel_url: `${req.headers.get("origin")}/ecommerce/cancel`,
    });

    console.log(stripCheckoutSession.url);

    // คิดว่าควรลงบันทึกรายการซื้อไว้ในฐานข้อมูล คำสั่งซื้อ ว่า ซื้อสำเร็จ จ่ายเงินแล้ว

    const dataOrder = cartItems.map((item: any) => ({
      // id: item.id as string,
      // stripeSessionId: stripCheckoutSession.id as string,
      stripeSessionId: stripCheckoutSession.id as string,
      userName: user.name as string,
      userEmail: user.email as string,
      productId: item.id as string,
      productName: item.name as string,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));

    const result = await prisma.orderDessert.createMany({
      data: dataOrder,
      skipDuplicates: true,
    });

    // คิดว่าควรลงบันทึกรายการซื้อไว้ในฐานข้อมูล จัดส่ง ว่า ซื้อสำเร็จ จ่ายเงินแล้ว กำลังดำเนินการจัดส่ง

    return NextResponse.json(
      // { url: session.url },
      // { url: stripCheckoutSession.url },

      {
        headers: corsHeaders,
        message: "success",
        url: stripCheckoutSession.url,
        // url: "/ecommerce/success",
      }
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
