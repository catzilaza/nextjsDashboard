// import { PrismaNeon } from '@prisma/adapter-neon';
// import { neonConfig } from '@neondatabase/serverless';
// import { PrismaClient } from '@prisma/client';
// import 'dotenv/config';

// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaNeon({ connectionString });
// const prisma = global.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// export default prisma;

import { PrismaClient } from "./../generated/prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }
// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma
// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
