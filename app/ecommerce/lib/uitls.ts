"use server";

import postgres from "postgres";
import { ProductDessertField } from "../models/dessert";
import { auth, signOut } from "@/auth";

export async function SignOut() {
  await signOut({ redirectTo: "/" });
}

export async function getSession() {
  let session = await auth();
  return session ? session : null;
}

export async function getLoginSession() {
  const session: any = await auth();
  // console.log("getLoginSession : ", session);
  return session;
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchAllProducts_Dessert() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    const products = await sql<ProductDessertField[]>`
      SELECT
        *
      FROM products_desserts
      ORDER BY name ASC
    `;

    return products;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all products_desserts.");
  }
}

export default async function checkoutAction({ myitems }: { myitems: any }) {
  // const line_items = myitems.map((item: any) => ({
  //   price_data: {
  //     currency: "usd",
  //     product_data: {
  //       name: item.name,
  //     },
  //     unit_amount: item.price * 100,
  //   },
  //   quantity: item.quantity,
  // }));
  const ttt = { myitems };
  console.log("From Check-Out Action...", myitems);
  console.log("From Check-Out Action...", ttt.myitems);
}
