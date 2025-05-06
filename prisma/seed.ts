//import { PrismaClient, Prisma } from "../src/app/generated/prisma";
import { PrismaClient, Prisma } from "generated/prisma";
import { User } from "@/lib/placeholder-data/blog/User";
import { create } from "domain";
import { title } from "process";
import CategoryList from "@/components/blog/categorylist/CategoryList";

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

const seed = async () => {
  const authors = [
    {
      name: "J.R.R. Tolkien",
      bio: "The creator of Middle-earth and author of The Lord of the Rings.",
      books: {
        create: [
          { title: "The Hobbit" },
          { title: "The Fellowship of the Ring" },
          { title: "The Two Towers" },
          { title: "The Return of the King" },
        ],
      },
    },
    {
      name: "George R.R. Martin",
      bio: "The author of the epic fantasy series A Song of Ice and Fire.",
      books: {
        create: [{ title: "A Game of Thrones" }, { title: "A Clash of Kings" }],
      },
    },
    {
      name: "J.K. Rowling",
      bio: "The creator of the Harry Potter series.",
      books: {
        create: [
          { title: "Harry Potter and the Philosopher's Stone" },
          { title: "Harry Potter and the Chamber of Secrets" },
        ],
      },
    },
  ];
  for (const author of authors) {
    await prisma.author.create({
      data: author,
    });
  }
};

const seedUsers = async () => {
  const users = [
    {
      name: "Emily",
      email: "emily.johnson@x.dummyjson.com",
      image: "https://dummyjson.com/icon/emilys/128",
      Post: {
        create: [
          {
            title: "Fashion",
            slug: "fashion",
            img: "/blog/fashion.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "fashion", // Added required catSlug property
            categories: {
              create: [
                {
                  title: "Fashion",
                  img: "/blog/fashion.png",
                  slug: "fashion", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "emily.johnson@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Michael",
      email: "michael.williams@x.dummyjson.com",
      image: "https://dummyjson.com/icon/michaelw/128",
      Post: {
        create: [
          {
            title: "Lifestyle",
            slug: "lifestyle",
            img: "/blog/style.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "lifestyle",
            categories: {
              create: [
                {
                  title: "Lifestyle",
                  img: "/blog/style.png",
                  slug: "lifestyle", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "michael.williams@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Sophia",
      email: "sophia.brown@x.dummyjson.com",
      image: "https://dummyjson.com/icon/sophiab/128",
      Post: {
        create: [
          {
            title: "Lifestyle",
            slug: "Culture",
            img: "/blog/style.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "Culture",
            categories: {
              create: [
                {
                  title: "Lifestyle",
                  img: "/blog/style.png",
                  slug: "Culture", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "sophia.brown@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "James",
      email: "james.davis@x.dummyjson.com",
      image: "https://dummyjson.com/icon/jamesd/128",
      Post: {
        create: [
          {
            title: "Travel",
            slug: "travel",
            img: "/blog/travel.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "travel",
            categories: {
              create: [
                {
                  title: "Travel",
                  img: "/blog/travel.png",
                  slug: "travel", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "james.davis@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Emma",
      email: "emma.miller@x.dummyjson.com",
      image: "https://dummyjson.com/icon/emmaj/128",
      Post: {
        create: [
          {
            title: "Food",
            slug: "food",
            img: "/blog/food.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "food",
            categories: {
              create: [
                {
                  title: "Food",
                  img: "/blog/food.png",
                  slug: "food", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "emma.miller@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Olivia",
      email: "olivia.wilson@x.dummyjson.com",
      image: "https://dummyjson.com/icon/oliviaw/128",
      Post: {
        create: [
          {
            title: "Fitness",
            slug: "fitness",
            img: "/blog/tiktok.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "fitness",
            categories: {
              create: [
                {
                  title: "Fitness",
                  img: "/blog/tiktok.png",
                  slug: "fitness", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "olivia.wilson@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Alexander",
      email: "alexander.jones@x.dummyjson.com",
      image: "https://dummyjson.com/icon/alexanderj/128",
      Post: {
        create: [
          {
            title: "Technology",
            slug: "technology",
            img: "/blog/youtube.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "technology",
            categories: {
              create: [
                {
                  title: "Technology",
                  img: "/blog/youtube.png",
                  slug: "technology", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "alexander.jones@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Ava",
      email: "ava.taylor@x.dummyjson.com",
      image: "https://dummyjson.com/icon/avat/128",
      Post: {
        create: [
          {
            title: "Technology",
            slug: "Cat",
            img: "/blog/youtube.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "Cat",
            categories: {
              create: [
                {
                  title: "Technology",
                  img: "/blog/youtube.png",
                  slug: "Cat", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "ava.taylor@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Ethan",
      email: "ethan.martinez@x.dummyjson.com",
      image: "https://dummyjson.com/icon/ethanm/128",
      Post: {
        create: [
          {
            title: "Lifestyle",
            slug: "Fish",
            img: "/blog/style.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            catSlug: "Fish",
            categories: {
              create: [
                {
                  title: "Lifestyle",
                  img: "/blog/style.png",
                  slug: "Fish", // Added the required slug property
                },
              ],
            },
            comments: {
              create: [
                {
                  desc: "Great post!",
                  user: {
                    connect: { email: "ethan.martinez@x.dummyjson.com" }, // Replace with the appropriate user connection logic
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ];
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};

async function main() {
  console.log("Seeding database...");

  // Wait for 10 seconds
  // await delay(10000);

  // await seed();
  await seedUsers();
  // Uncomment the following line to seed authors

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
//https://www.prisma.io/docs/orm/prisma-schema/data-model/relations
//https://neon.tech/docs/guides/prisma-migrations
//node seed.js

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
// async function main() {
//   try {
//     await seed();
//     console.log('Seeding completed');
//   } catch (error) {
//     console.error('Error during seeding:', error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// main();
