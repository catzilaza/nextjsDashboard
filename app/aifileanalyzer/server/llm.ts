// import { SqlDatabase } from "langchain/sql_db";
// import { SqlDatabaseChain } from "langchain/chains/sql_db";
// import { OpenAI } from "@langchain/openai";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// const db = await SqlDatabase.fromPool(pool);
// const llm = new OpenAI({ modelName: "gpt-3.5-turbo" });

// const chain = new SqlDatabaseChain({ llm, database: db, verbose: true });

// const response = await chain.run("แสดงสินค้าที่ราคามากกว่า 1000 บาท");
// console.log(response);
