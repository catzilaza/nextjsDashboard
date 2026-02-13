import { NextResponse } from "next/server";
import { getSession } from "@/app/(auth)/actions/auth/getSession-signOut";
import prisma from "@/app/ecommerce/lib/prisma";
import Stripe from "stripe";
import Error from "next/error";
import {
  getCurrentSession,
  getCurrentUser,
} from "@/app/betterauth/actions/users";
import { use } from "react";
import { url } from "inspector";

// - Checkout → หน้าเว็บชำระเงินสำเร็จรูป
// - Portal → หน้าเว็บสำหรับลูกค้าจัดการ subscription
// - Webhook → ช่องทางที่ Stripe แจ้ง event กลับไปยังระบบของคุณ
//  เมื่อ PaymentIntent เปลี่ยนสถานะเป็น succeeded → Stripe ส่ง webhook
//  ไปยัง API ของคุณ → ระบบอัปเดต order เป็น “Paid”
// - PaymentIntent → ตัวแทนของการชำระเงินหนึ่งครั้ง ใช้ติดตามสถาน
//  ระบบสร้าง PaymentIntent สำหรับ order 123 → ลูกค้าใส่บัตร → PaymentIntent
//  เปลี่ยนสถานะเป็น requires_confirmation → หลังยืนยันสำเร็จเปลี่ยนเป็น succeeded

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
  image_url: string | null;
  quantity: number;
  //   stock: number;
}

export async function POST(req: Request) {
  try {
    // const login_session = await getSession();
    const login_session1 = await getCurrentSession();
    let login_session = undefined;

    if (login_session1) {
      login_session = await getCurrentUser();
    }

    if (!login_session) {
      console.log("message: Unauthorized status: 401");
      return NextResponse.json({ message: "error" }, { status: 401 });
    }

    const customer = await db.customer.findUnique({
      where: {
        email: login_session.user.email,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
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
          images: [item.image_url],
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

    // const tempData = await db.product.findFirst({
    //   where: {
    //     name: cartItems[0].name,
    //     price: cartItems[0].price,
    //   },
    // });

    // if (!tempData) {
    //   return NextResponse.json({ error: "Product not found" }, { status: 404 });
    // }

    //

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-12-15.clover",
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Generate a unique order ID (In production, create an Order in DB first and use its ID)
    const orderCreateKeyPaid = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    let activeProducts = await stripe.products.list({ active: true });
    console.log(activeProducts);

    const products = [...cartItems];
    let stripeProducts = [];

    try {
      //  1. Find products from stripe that matches products from cart.
      for (const product of products) {
        const matchedProducts = activeProducts?.data?.find(
          (stripeProduct: any) =>
            stripeProduct.name.toLowerCase() === product.name.toLowerCase(),
        );

        //  2. If product didn't exist in Stripe, then add this product to stripe.
        if (matchedProducts == undefined) {
          // const prod = await stripe.products.create({
          //   name: product.name,
          //   default_price_data: {
          //     currency: "usd",
          //     unit_amount: product.price * 100,
          //   },
          // });
          console.log(
            "product didn't exist in Stripe, then add this product to stripe.",
          );
        }

        if (matchedProducts) {
          stripeProducts.push({
            price: matchedProducts?.default_price,
            quantity: product.quantity,
            // url: matchedProducts?.url,
          });
        }
      }
    } catch (error) {
      console.log("Error in creating a new product", error);
      throw error;
    }

    console.log("");
    console.log("stripeProducts : ", stripeProducts);

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
      // line_items: [
      //   {
      //     price: stripePriceId,
      //     quantity: 1,
      //   },
      // ],
      // line_items: product_line_items,
      line_items: product_line_items,
      metadata: {
        orderCreateKeyPaid: orderCreateKeyPaid,
        userId: user.id,
        note: "ลูกค้า VIP",
        cartCount: cartItems.length.toString(), // ต้องเป็น string
      },
      mode: "payment",
      success_url: `${req.headers.get("origin")}/ecommerce/success`,
      cancel_url: `${req.headers.get("origin")}/ecommerce/cancel`,
      // success_url: `${req.headers.get("origin")}/ecommerce/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${req.headers.get("origin")}/ecommerce/?cancel=true`,
    });

    // console.log(stripCheckoutSession.url);

    // คิดว่าควรลงบันทึกรายการซื้อไว้ในฐานข้อมูล จัดส่ง ว่า ซื้อสำเร็จ จ่ายเงินแล้ว กำลังดำเนินการจัดส่ง
    // Card information : 4111 1111 1111 1111
    // Expiry date : 03/26 411
    const dataOrder = cartItems.map((item: any) => ({
      customerId: customer.id as string,
      productId: item.id as string,
      stripe_session_id: stripCheckoutSession.id as string,
      price: item.price,
      quantity: item.quantity,
      paymentMethod: "card",
      status: "not paid",
    }));

    const result = await prisma.order.createMany({
      data: dataOrder,
      skipDuplicates: true,
    });

    return NextResponse.json(
      // { url: session.url },
      { url: stripCheckoutSession.url, message: "success" },
      {
        headers: corsHeaders,
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
