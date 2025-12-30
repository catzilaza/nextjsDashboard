import { getLoginSession } from "@/app/ecommerce/lib/uitls";
// import { stripe } from "@/app/ecommerce/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/ecommerce/lib/prisma";
import Stripe from "stripe";

const db = prisma;

export async function POST(request: NextRequest) {
  try {
    const login_session = await getLoginSession();

    if (!login_session || !login_session.isLoggedIn || !login_session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: login_session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 401 }
      );
    }

    // const portalSession = await (Stripe as any).billingPortal.sessions.create({
    //   customer: user.stripeCustomerId,
    //   return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    // });
    // console.log(portalSession.url);
    // return NextResponse.json({ url: portalSession.url });
    return NextResponse.json({});
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
