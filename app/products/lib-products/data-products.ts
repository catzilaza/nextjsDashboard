import postgres from "postgres";
import { ProductDessertField } from "./definition-products";

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
