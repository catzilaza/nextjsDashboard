import Stripe from "stripe";
import prisma from "./prisma";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

if (!stripe) {
  console.error(
    "Stripe Secret Key is not set. Please set STRIPE_SECRET_KEY in your environment variables."
  );
  process.exit(1);
}
//npx tsx ./app/ecommerce/lib/create-stripe-products.ts
async function main() {
  // fakeapi.platzi.com/en/products
  //   const res = await fetch(
  //     "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  //   );

  //   if (!res.ok) {
  //     console.error("Error fetching products:", res.statusText);
  //     return;
  //   }
  //   const products = await res.json();

  const products = await prisma.products_desserts.findMany();

  for (const product of products) {
    try {
      // 1. create price & product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.name_eng,
        images: product.image_url ? [product.image_url] : [],
      });

      // 2. create price with product id
      const stripePrice = await stripe.prices.create({
        unit_amount: parseInt(product.price),
        currency: "thb",
        product: stripeProduct.id,
      });

      if (!stripePrice || !stripeProduct) {
        console.error("Error creating Stripe product or price");
        continue;
      }

      // 3. insert to supabase database.
      // const data = await prisma.product.create({
      //   data: {
      //     name: product.name,
      //     description: product.name_eng,
      //     price: parseInt(product.price),
      //     images: product.image_url,
      //     stripe_product_id: stripeProduct.id,
      //     stripe_price_id: stripePrice.id,
      //   },
      // });

      // if (!data) {
      //   console.error(
      //     "Error inserting product into Prisma in Product Database:"
      //   );
      //   continue;
      // }
    } catch (createError) {
      console.error(createError);
      process.exit(1);
    }
  }
}

main().catch(console.error);
