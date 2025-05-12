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
const seedUser = async () => {
  const users = [
    {
      name: "Admin",
      email: "admin@admin.com",
      image_url: "/customers/evil-rabbit.png",
      password: await bcrypt.hash("123456admin!", 10),
      role: "admin",
    },
    {
      name: "User",
      email: "user@user.com",
      image_url: "/customers/evil-rabbit.png",
      password: "123456user!",
    },
    {
      name: "Emily",
      email: "emily.johnson@x.dummyjson.com",
      image_url: "https://dummyjson.com/icon/emilys/128",
      password: "123456emily!",
    },
    {
      name: "Michael",
      email: "michael.williams@x.dummyjson.com",
      image_url: "https://dummyjson.com/icon/michaelw/128",
      password: "123456michael!",
    },
    {
      name: "Sophia",
      email: "sophia.brown@x.dummyjson.com",
      image_url: "https://dummyjson.com/icon/sophiab/128",
      password: "123456sophia!",
    },
  ];
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};

async function main() {
  try {
    console.log("Seeding database...");

    await seedUser();
    await delayWithCountdown(10);

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
