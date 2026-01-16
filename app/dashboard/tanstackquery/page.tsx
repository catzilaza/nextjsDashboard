"use client";

import { QueryClient, useQuery, queryOptions } from "@tanstack/react-query";
import TanstackBasic from "@/app/dashboard/components/tanstackQuery/tanstackBasic";
import TanstackGQL from "@/app/dashboard/components/tanstackQuery/tanstackGQL";
import TanStackPlayground from "@/app/dashboard/components/tanstackQuery/TanStackPlayground";

export default function page() {
  return (
    <div>
      {" "}
      <TanStackPlayground />
      <br />
      {/* <Example /> */}
      <br />
      {/* <TanstackBasic /> */}
      {/* <TanstackGQL /> */}
    </div>
  );
}

function createQueryOptionsExample() {
  return queryOptions({
    queryKey: ["repoData"],
    queryFn: () => fetchQueryExample(),
    staleTime: 5 * 1000, // 5 seconds
  });
}

async function fetchQueryExample() {
  const response = await fetch("https://api.github.com/repos/TanStack/query");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

//    queryFn: async () => {
//      const response = await fetch(
//        "https://api.github.com/repos/TanStack/query"
//      );
//      return await response.json();
//    },"

function Example() {
  //   const { status, isPending, isError, error, data, isFetching } = useQuery({
  //     ...createQueryOptions(),
  //     select: (data) => data,
  //   });
  const exampleQuery = useQuery({
    ...createQueryOptionsExample(),
    select: (data) => data,
  });

  const { status, isPending, isError, error, data, isFetching } = exampleQuery;

  if (isPending) return <span>Loading...</span>;

  if (isError) return <span>Error: {error.message}</span>;

  //   if (error) return 'An error has occurred: ' + error.message

  //   if (status === "pending") {
  //     return <span>Loading...</span>;
  //   }

  //   if (status === "error") {
  //     return <span>Error: {error.message}</span>;
  //   }

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
