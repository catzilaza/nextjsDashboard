"use client";

import React, { use } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// const persister = createAsyncStoragePersister({
//   storage: window.localStorage,
// });

type Post = {
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Array<Post>> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

function createQueryOptionsPosts() {
  return {
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 1000, // 5 seconds
  };
}

function usePosts() {
  return useQuery({ ...createQueryOptionsPosts(), select: (data) => data });
}
// function usePosts() {
//   return useQuery({
//     queryKey: ["posts"],
//     queryFn: fetchPosts,
//   });
// }

function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

function createQueryOptionsPost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId, // Only run the query if postId is truthy
  });
}

function usePost(postId: number) {
  return createQueryOptionsPost(postId);
}

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          <div
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
              display: "inline-block",
              cursor: "pointer",
              width: "fit-content",
              height: "fit-content",
              border: "1px solid blue",
              padding: "0.5rem",
            }}
          >
            <span style={{ color: "blue" }}>← Back to Posts</span>
          </div>
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default function tanstackBasic() {
  const [postId, setPostId] = React.useState(-1);
  const [persister, setPersister] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPersister(
        createAsyncStoragePersister({ storage: window.localStorage })
      );
    }
  }, []);

  if (!persister) return null; // Or a loading spinner

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </PersistQueryClientProvider>
  );
}
