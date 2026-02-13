import Stripe from "stripe";
import prisma from "./prisma";
import "dotenv/config";

// const products_desserts = [
//   {
//     dessert_id: "d6e15727-9fe1-0001-8c5b-ea44a9bd81aa",
//     name_eng: "Banana Egg Cake",
//     name: "ขนมไข่กล้วยหอม",
//     image_url: "/products/banana-egg-cake.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0002-8c5b-ea44a9bd81aa",
//     name_eng: "Lamphun Flower Pastry",
//     name: "ขนมดอกลำพูน",
//     image_url: "/products/lamphun-flower-pastry.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0003-8c5b-ea44a9bd81aa",
//     name_eng: "Raisin Bread",
//     name: "ขนมปังลูกเกด",
//     image_url: "/products/raisin-bread.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0004-8c5b-ea44a9bd81aa",
//     name_eng: "Pandan Custard Bread",
//     name: "ขนมปังสังขยา",
//     image_url: "/products/pandan-custard-bread.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0005-8c5b-ea44a9bd81aa",
//     name_eng: "Tuna Stuffed Bread",
//     name: "ขนมปังไส้ทูน่า",
//     image_url: "/products/tuna-stuffed-bread.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0006-8c5b-ea44a9bd81aa",
//     name_eng: "Mochi",
//     name: "ขนมโมจิ",
//     image_url: "/products/mochi.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0007-8c5b-ea44a9bd81aa",
//     name_eng: "Thai Custard",
//     name: "ขนมหม้อแกง",
//     image_url: "/products/thai-custard.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0008-8c5b-ea44a9bd81aa",
//     name_eng: "Eclair",
//     name: "ขนมเอแคล",
//     image_url: "/products/eclair.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0009-8c5b-ea44a9bd81aa",
//     name_eng: "Black Sesame Cookie",
//     name: "ขนมคุ๊กกี้งาดำ",
//     image_url: "/products/black-sesame-cookie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0010-8c5b-ea44a9bd81aa",
//     name_eng: "Chocolate Chip Cookie",
//     name: "ขนมคุ๊กกี้ช็อกโกแลตชิฟ",
//     image_url: "/products/chocolate-chip-cookie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0011-8c5b-ea44a9bd81aa",
//     name_eng: "Viennese Cookie",
//     name: "ขนมคุ๊กกี้เวียนนา",
//     image_url: "/products/viennese-cookie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0012-8c5b-ea44a9bd81aa",
//     name_eng: "Singapore Cookie",
//     name: "ขนมคุ๊กกี้สิงคโปร์",
//     image_url: "/products/singapore-cookie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0013-8c5b-ea44a9bd81aa",
//     name_eng: "Fortune Cookie",
//     name: "ขนมคุ๊กกี้เสี่ยงทาย",
//     image_url: "/products/fortune-cookie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0014-8c5b-ea44a9bd81aa",
//     name_eng: "Swiss Roll Cake",
//     name: "ขนมเค้กโรล",
//     image_url: "/products/swiss-roll-cake.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0015-8c5b-ea44a9bd81aa",
//     name_eng: "Young Coconut Chiffon",
//     name: "ขนมชิฟฟรอนมะพร้าวอ่อน",
//     image_url: "/products/young-coconut-chiffon.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0016-8c5b-ea44a9bd81aa",
//     name_eng: "Brownie",
//     name: "ขนมบราวนี่",
//     image_url: "/products/brownie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0017-8c5b-ea44a9bd81aa",
//     name_eng: "Pineapple Pie",
//     name: "ขนมพายสับปะรด",
//     image_url: "/products/pineapple-pie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
//   {
//     dessert_id: "d6e15727-9fe1-0018-8c5b-ea44a9bd81aa",
//     name_eng: "Chicken Pie",
//     name: "ขนมพายไส้ไก่",
//     image_url: "/products/chicken-pie.jpg",
//     price: "30",
//     amount: 50,
//     status: "avialable",
//     date: "2024-02-26",
//   },
// ];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

if (!stripe) {
  console.error(
    "Stripe Secret Key is not set. Please set STRIPE_SECRET_KEY in your environment variables.",
  );
  process.exit(1);
}

//npx tsx app/ecommerce/lib/create-stripe-products.ts
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

  // console.log("Products to be created in Stripe:", products.length);
  // for (const product of products) {
  //   console.log("Creating product in Stripe:", product.name);
  //   console.log("Creating product in Stripe:", product.name_eng);
  //   console.log(
  //     "Creating product in Stripe:",
  //     product.image_url.replace("/products/", ""),
  //   );
  // }

  for (const product of products) {
    // const imageUrl = product.image_url
    //   ? `${process.env.NEXT_PUBLIC_APP_URL}/public/products/${product.image_url.replace(
    //       "/products/",
    //       "",
    //     )}`
    //   : "";
    try {
      // 1. create price & product
      const stripeProduct = await stripe.products.create({
        name: product.name as string,
        description: product.name_eng as string,
        // images: [imageUrl]
        url: product.image_url,
        images: product.image_url ? [product.image_url] : [],
        // default_price_data: {
        //   currency: "thb",
        //   unit_amount: product.price as unknown as number,
        // },
      });

      // 2. create price with product id
      const stripePrice = await stripe.prices.create({
        // unit_amount: parseInt(product.price),
        unit_amount: product.price as unknown as number,
        currency: "thb",
        product: stripeProduct.id,
      });

      if (!stripePrice || !stripeProduct) {
        console.error("Error creating Stripe product or price");
        continue;
      }

      // 3. insert to supabase database.
      const data = await prisma.product.create({
        data: {
          name: product.name,
          name_eng: product.name_eng,
          description: product.name_eng,
          price: product.price,
          // price: parseInt(product.price),
          image: product.image,
          image_url: product.image_url,
          stripePriceId: stripePrice.id,
          stripeProductId: stripeProduct.id,
        },
      });

      if (!data) {
        console.error(
          "Error inserting product into Prisma in Product Database:",
        );
        continue;
      }
    } catch (createError) {
      console.error(createError);
      process.exit(1);
    }
  }
}
//npx tsx app/ecommerce/lib/create-stripe-products.ts
main().catch(console.error);
