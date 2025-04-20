//import { PrismaClient, Prisma } from "../src/app/generated/prisma";
import { PrismaClient, Prisma } from "generated/prisma";

const prisma = new PrismaClient();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayWithCountdown(seconds: number): Promise<void> {
  for (let i = 1; i <= seconds; i++) {
    console.log(`${i} second${i > 1 ? "s" : ""}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  }
}

async function main() {
  console.log("Seeding database...");

  // Wait for 10 seconds
  // await delay(10000);

  // Display countdown for 10 seconds
  await delayWithCountdown(10);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// "prisma": {
//   "seed": "npx tsx ./prisma/seed.ts"
// }

// const sampleData = {
//   users: [
//     {
//       id: "1",
//       name: "John Doe",
//       email: "john@example.com",
//       password: "hashed_password",
//       status: "active",
//       role: "admin",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       password: "hashed_password",
//       status: "active",
//       role: "user",
//     },
//   ],
//   products: [
//     {
//       id: "1",
//       name: "Product 1",
//       price: "100",
//       status: "available",
//     },
//     {
//       id: "2",
//       name: "Product 2",
//       price: "200",
//       status: "available",
//     },
//   ],
// };

// async function main() {
//   console.log("Seeding database...");

//   // Debug sampleData
//   // console.log("sampleData.users:", sampleData.users);

//   // Ensure sampleData.users is an array
//   if (!Array.isArray(sampleData.users)) {
//     throw new Error("sampleData.users is not an array or is undefined.");
//   }

//   // Seed users
//   for (const user of sampleData.users) {
//     await prisma.user.create({
//       data: {
//         user_id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         status: user.status,
//         role: user.role,
//         date: Date(), // Ensure 'date' is included in the user data
//       },
//     });
//   }

//   // Seed products
//   for (const product of sampleData.products) {
//     await prisma.product.create({
//       data: {
//         prod_id: product.id,
//         name: product.name,
//         price: product.price,
//         slug: "", // Ensure slug is provided
//         category: "", // Ensure category is provided
//         brand: "", // Ensure brand is provided
//         description: "", // Ensure description is provided
//         stock: 0, // Ensure stock is provided
//       },
//     });
//   }

//   console.log("Database seeded successfully!");
// }

// main();

// const userData: Prisma.UserWebCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Join the Prisma Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
// ];

// export async function main() {
//   console.log("Seeding database...");

//   for (const u of userData) {
//     await prisma.userWeb.create({ data: u });
//   }

//   console.log("Seeding completed.");
// }

// main();

//npx tsx ./prisma/seed
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
