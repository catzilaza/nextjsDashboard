import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayWithCountdown(seconds: number): Promise<void> {
  for (let i = 1; i <= seconds; i++) {
    console.log(`${i} second${i > 1 ? "s" : ""}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  }
}

// const hashedPassword = await bcrypt.hash(user.password, 10);
// const hashedPassword = await bcrypt.hash("123456admin!", 10);
// const seedUser = async () => {
//   const users = [
//     {
//       name: "Admin",
//       email: "admin@nextmail.com",
//       image_url: "/customers/evil-rabbit.png",
//       image: "/customers/evil-rabbit.png",
//       password: await bcrypt.hash("123456admin!", 10),
//       role: "admin",
//     },
//     {
//       name: "User",
//       email: "user@nextmail.com",
//       image_url: "/customers/evil-rabbit.png",
//       image: "/customers/evil-rabbit.png",
//       password: await bcrypt.hash("123456user!", 10),
//     },
//     {
//       name: "Emily",
//       email: "emily.johnson@x.dummyjson.com",
//       image_url: "https://dummyjson.com/icon/emilys/128",
//       image: "https://dummyjson.com/icon/emilys/128",
//       password: await bcrypt.hash("123456emily!", 10),
//     },
//     {
//       name: "Michael",
//       email: "michael.williams@x.dummyjson.com",
//       image_url: "https://dummyjson.com/icon/michaelw/128",
//       image: "https://dummyjson.com/icon/michaelw/128",
//       password: await bcrypt.hash("123456michael!", 10),
//     },
//     {
//       name: "Sophia",
//       email: "sophia.brown@x.dummyjson.com",
//       image_url: "https://dummyjson.com/icon/sophiab/128",
//       image: "https://dummyjson.com/icon/sophiab/128",
//       password: await bcrypt.hash("123456sophia!", 10),
//     },
//   ];
//   for (const user of users) {
//     await prisma.user.create({
//       data: user,
//     });
//   }
// };

// const seedDataCateBlog = async () => {
//   const cateBlogs = [
//     {
//       title: "Fashion",
//       slug: "fashion",
//       img: "/blog/fashion.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Lifestyle",
//       slug: "lifestyle",
//       img: "/blog/style.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Travel",
//       slug: "travel",
//       img: "/blog/travel.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Food",
//       slug: "food",
//       img: "/blog/food.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Fitness",
//       slug: "fitness",
//       img: "/blog/tiktok.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Technology",
//       slug: "technology",
//       img: "/blog/youtube.png",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//   ];

//   for (const cateBlog of cateBlogs) {
//     await prisma.category.create({
//       data: cateBlog,
//     });
//   }
// };

const seedCustomers = async () => {
  const customers = [
    {
      name: "Evil Rabbit",
      email: "evil@rabbit.com",
      image_url: "/customers/evil-rabbit.png",
      invoices: {
        create: [
          {
            amount: 15795,
            status: "pending",
          },
          {
            amount: 666,
            status: "pending",
          },
        ],
      },
    },
    {
      name: "Delba de Oliveira",
      email: "delba@oliveira.com",
      image_url: "/customers/delba-de-oliveira.png",
      invoices: {
        create: [
          {
            amount: 20348,
            status: "pending",
          },
          {
            amount: 32545,
            status: "paid",
          },
        ],
      },
    },
    {
      name: "Lee Robinson",
      email: "lee@robinson.com",
      image_url: "/customers/lee-robinson.png",
      invoices: {
        create: [
          {
            amount: 3040,
            status: "paid",
          },
          {
            amount: 1250,
            status: "paid",
          },
        ],
      },
    },
    {
      name: "Michael Novotny",
      email: "michael@novotny.com",
      image_url: "/customers/michael-novotny.png",
      invoices: {
        create: [
          {
            amount: 44800,
            status: "paid",
          },
          {
            amount: 8546,
            status: "paid",
          },
        ],
      },
    },
    {
      name: "Amy Burns",
      email: "amy@burns.com",
      image_url: "/customers/amy-burns.png",
      invoices: {
        create: [
          {
            amount: 34577,
            status: "pending",
          },
        ],
      },
    },
    {
      name: "Balazs Orban",
      email: "balazs@orban.com",
      image_url: "/customers/balazs-orban.png",
      invoices: {
        create: [
          {
            amount: 54246,
            status: "pending",
          },
          {
            amount: 1000,
            status: "paid",
          },
          {
            amount: 500,
            status: "paid",
          },
          {
            amount: 8945,
            status: "paid",
          },
        ],
      },
    },
  ];
  for (const customer of customers) {
    await prisma.customers.create({
      data: customer,
    });
  }
};

const seedProducts_Dessert = async () => {
  const products_desserts = [
    {
      name_eng: "Banana Egg Cake",
      name: "ขนมไข่กล้วยหอม",
      image: "/products/banana-egg-cake.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Lamphun Flower Pastry",
      name: "ขนมดอกลำพูน",
      image: "/products/lamphun-flower-pastry.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/lamphun-flower-pastry.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Raisin Bread",
      name: "ขนมปังลูกเกด",
      image: "/products/raisin-bread.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/raisin-bread.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Pandan Custard Bread",
      name: "ขนมปังสังขยา",
      image: "/products/pandan-custard-bread.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pandan-custard-bread.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Tuna Stuffed Bread",
      name: "ขนมปังไส้ทูน่า",
      image: "/products/tuna-stuffed-bread.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/tuna-stuffed-bread.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Mochi",
      name: "ขนมโมจิ",
      image: "/products/mochi.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/mochi.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Thai Custard",
      name: "ขนมหม้อแกง",
      image: "/products/thai-custard.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/thai-custard.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Eclair",
      name: "ขนมเอแคล",
      image: "/products/eclair.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/eclair.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Black Sesame Cookie",
      name: "ขนมคุ๊กกี้งาดำ",
      image: "/products/black-sesame-cookie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Chocolate Chip Cookie",
      name: "ขนมคุ๊กกี้ช็อกโกแลตชิฟ",
      image: "/products/chocolate-chip-cookie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chocolate-chip-cookie.jpgg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Viennese Cookie",
      name: "ขนมคุ๊กกี้เวียนนา",
      image: "/products/viennese-cookie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/viennese-cookie.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Singapore Cookie",
      name: "ขนมคุ๊กกี้สิงคโปร์",
      image: "/products/singapore-cookie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/singapore-cookie.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Fortune Cookie",
      name: "ขนมคุ๊กกี้เสี่ยงทาย",
      image: "/products/fortune-cookie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/fortune-cookie.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Swiss Roll Cake",
      name: "ขนมเค้กโรล",
      image: "/products/swiss-roll-cake.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/swiss-roll-cake.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Young Coconut Chiffon",
      name: "ขนมชิฟฟรอนมะพร้าวอ่อน",
      image: "/products/young-coconut-chiffon.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/young-coconut-chiffon.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Brownie",
      name: "ขนมบราวนี่",
      image: "/products/brownie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/brownie.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Pineapple Pie",
      name: "ขนมพายสับปะรด",
      image: "/products/pineapple-pie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pineapple-pie.jpg",
      price: 30,
      stock: 50,
    },
    {
      name_eng: "Chicken Pie",
      name: "ขนมพายไส้ไก่",
      image: "/products/chicken-pie.jpg",
      image_url:
        "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chicken-pie.jpg",
      price: 30,
      stock: 50,
    },
  ];
  for (const product_dessert of products_desserts) {
    await prisma.products_desserts.create({
      data: product_dessert,
    });
  }
};

async function main() {
  try {
    console.log("Seeding database...");

    // await seedUser();
    // await seedDataCateBlog();
    // await delayWithCountdown(10);
    // await seedRevenes();
    // await seedCustomers();
    await seedProducts_Dessert();

    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main();
//https://www.prisma.io/docs/orm/prisma-schema/data-model/relations
//https://neon.tech/docs/guides/prisma-migrations
//node seed.js

// "prisma": {
//   "seed": "npx tsx ./prisma/seed.ts"
// }

{
  // const seed = async () => {
  //   const authors = [
  //     {
  //       name: "J.R.R. Tolkien",
  //       bio: "The creator of Middle-earth and author of The Lord of the Rings.",
  //       books: {
  //         create: [
  //           { title: "The Hobbit" },
  //           { title: "The Fellowship of the Ring" },
  //           { title: "The Two Towers" },
  //           { title: "The Return of the King" },
  //         ],
  //       },
  //     },
  //     {
  //       name: "George R.R. Martin",
  //       bio: "The author of the epic fantasy series A Song of Ice and Fire.",
  //       books: {
  //         create: [{ title: "A Game of Thrones" }, { title: "A Clash of Kings" }],
  //       },
  //     },
  //     {
  //       name: "J.K. Rowling",
  //       bio: "The creator of the Harry Potter series.",
  //       books: {
  //         create: [
  //           { title: "Harry Potter and the Philosopher's Stone" },
  //           { title: "Harry Potter and the Chamber of Secrets" },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const author of authors) {
  //     await prisma.author.create({
  //       data: author,
  //     });
  //   }
  // };
  // const seedUsers = async () => {
  //   const users = [
  //     {
  //       name: "Emily",
  //       email: "emily.johnson@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/emilys/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Fashion",
  //             slug: "fashion",
  //             img: "/blog/fashion.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "fashion", // Added required catSlug property
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Michael",
  //       email: "michael.williams@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/michaelw/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "lifestyle",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "lifestyle",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Sophia",
  //       email: "sophia.brown@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/sophiab/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "Culture",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Culture",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "James",
  //       email: "james.davis@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/jamesd/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Travel",
  //             slug: "travel",
  //             img: "/blog/travel.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "travel",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Emma",
  //       email: "emma.miller@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/emmaj/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Food",
  //             slug: "food",
  //             img: "/blog/food.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "food",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Olivia",
  //       email: "olivia.wilson@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/oliviaw/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Fitness",
  //             slug: "fitness",
  //             img: "/blog/tiktok.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "fitness",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Alexander",
  //       email: "alexander.jones@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/alexanderj/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Technology",
  //             slug: "technology",
  //             img: "/blog/youtube.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "technology",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Ava",
  //       email: "ava.taylor@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/avat/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Technology",
  //             slug: "Cat",
  //             img: "/blog/youtube.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Cat",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Ethan",
  //       email: "ethan.martinez@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/ethanm/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "Fish",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Fish",
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const user of users) {
  //     await prisma.post.create({
  //       data: user,
  //     });
  //   }
  // };
}

{
  // const seedCustomers = async () => {
  //   const customers = [
  //     {
  //       name: "Evil Rabbit",
  //       email: "evil@rabbit.com",
  //       image_url: "/customers/evil-rabbit.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 15795,
  //             status: "pending",
  //           },
  //           {
  //             amount: 666,
  //             status: "pending",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Delba de Oliveira",
  //       email: "delba@oliveira.com",
  //       image_url: "/customers/delba-de-oliveira.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 20348,
  //             status: "pending",
  //           },
  //           {
  //             amount: 32545,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Lee Robinson",
  //       email: "lee@robinson.com",
  //       image_url: "/customers/lee-robinson.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 3040,
  //             status: "paid",
  //           },
  //           {
  //             amount: 1250,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Michael Novotny",
  //       email: "michael@novotny.com",
  //       image_url: "/customers/michael-novotny.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 44800,
  //             status: "paid",
  //           },
  //           {
  //             amount: 8546,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Amy Burns",
  //       email: "amy@burns.com",
  //       image_url: "/customers/amy-burns.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 34577,
  //             status: "pending",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Balazs Orban",
  //       email: "balazs@orban.com",
  //       image_url: "/customers/balazs-orban.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 54246,
  //             status: "pending",
  //           },
  //           {
  //             amount: 1000,
  //             status: "paid",
  //           },
  //           {
  //             amount: 500,
  //             status: "paid",
  //           },
  //           {
  //             amount: 8945,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const customer of customers) {
  //     await prisma.customers.create({
  //       data: customer,
  //     });
  //   }
  // };
}

{
  //   const seedRevenes = async () => {
  //   const revenues = [
  //     { month: "Jan", revenue: 2000 },
  //     { month: "Feb", revenue: 1800 },
  //     { month: "Mar", revenue: 2200 },
  //     { month: "Apr", revenue: 2500 },
  //     { month: "May", revenue: 2300 },
  //     { month: "Jun", revenue: 3200 },
  //     { month: "Jul", revenue: 3500 },
  //     { month: "Aug", revenue: 3700 },
  //     { month: "Sep", revenue: 2500 },
  //     { month: "Oct", revenue: 2800 },
  //     { month: "Nov", revenue: 3000 },
  //     { month: "Dec", revenue: 4800 },
  //   ];
  //   for (const revenue of revenues) {
  //     await prisma.revenue.create({
  //       data: revenue,
  //     });
  //   }
  // };
}
