//https://github.com/AustinDavisTech/TanStackPlayground
//https://www.youtube.com/watch?v=KkxPtimqaew

import { queryOptions, useQuery } from "@tanstack/react-query";
import React from "react";
import { z } from "zod";
// import { fetchProducts_Dessert } from "@/app/lib/data";

const userSchema = z.object({
  name: z.string(),
  _id: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type User = z.infer<typeof userSchema>;

const GetUsersParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

type GetUsersOptions = z.infer<typeof GetUsersParamsSchema>;

async function getUsers(params?: GetUsersOptions) {
  const { page = 1, limit = 10 } = params || {};
  console.log("Getting users with params:", { page, limit });

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

    // Check for HTTP errors (e.g., 404 Not Found, 500 Internal Server Error)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // โครงสร้างใหม่ของข้อมูลที่มีฟิลด์ครบถ้วน
    const res: [User] = data.map((item: any) => ({
      name: item.name,
      _id: randomId(),
      email: randomEmail(item.name),
      age: randomAge(),
      createdAt: randomDate(),
      updatedAt: randomDate(),
    }));

    return res;
  } catch (error) {
    // Handle network errors (e.g., no internet connection, DNS issues)
    // or errors thrown from the `if (!response.ok)` block
    if (error instanceof Error) {
      console.error("Error fetching user data:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return null; // Return null or handle the error in another way
  }

  //   return await fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
  //     res.json()
  //   );
}

function createUsersQueryOptions(params?: GetUsersOptions) {
  return queryOptions({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
}

export default function TanStackPlayground() {
  const { data } = useQuery(createUsersQueryOptions());
  return (
    <div>
      <h1 className="text-center text-2xl">TanStackPlayground</h1>
      {data?.map((user: any) => (
        <div key={user._id} className="border p-4 m-2 rounded-lg shadow">
          <p>Id : {user._id}</p>
          <p>Name {user.name}</p>
          <p>Email {user.email}</p>
          <p>Age {user.age}</p>
          <p>CreatedAt {user.createdAt}</p>
          <p>UpdatedAt {user.updatedAt}</p>
        </div>
      ))}
    </div>
  );
}

// ฟังก์ชันสุ่มข้อมูล
function randomId() {
  return Math.random().toString(36).substring(2, 10);
}
function randomEmail(name: string) {
  return `${name}${Math.floor(Math.random() * 1000)}@example.com`;
}
function randomAge() {
  return Math.floor(Math.random() * 60) + 18;
}
function randomDate() {
  return new Date(
    Date.now() - Math.floor(Math.random() * 10000000000),
  ).toISOString();
}
