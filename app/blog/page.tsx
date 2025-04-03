import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
// import prisma from '@/lib/prisma'

// export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const productsDir = path.join(process.cwd(), "public", "products");

  const imageFiles = fs.readdirSync(productsDir).filter(
    (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file) // Filter for image files
  );

  const imagePaths = imageFiles.map((file) => `/products/${file}`);

  const posts = imagePaths.map((item, index) => {
    const fileName = item.split("/").pop()?.split(".")[0]; // Extract the file name from the path
    //item.match(/\/([^/]+)\.jpg$/)
    return {
      id: index,
      slug: fileName,
      title: fileName,
      image: item,
    };
  });

  if (!posts) {
    return <div>No posts found.</div>;
  }

  // console.log(posts);

  // Fetch image data from the Picsum API
  //   const res = await fetch("https://picsum.photos/v2/list?page=1&limit=10");
  //   const images = await res.json();

  //   console.log(images);

  //******************************** */
  //   const posts = await prisma.post.findMany({
  //     orderBy: {
  //       createdAt: 'desc'
  //     }
  //   })

  //   if (!posts) {
  //     return <div>No posts found.</div>
  //   }

  return (
    // <section className="py-24">
    //   <div className="container">
    //     <h1 className="text-3xl font-bold">Product Images</h1>
    //     <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //       {posts.map((item, index) => (
    //         <li key={index} className="relative w-full h-64">
    //           <Image
    //             src={item.image} // Use the download URL from the API response
    //             width={200} // Set width to 100% for responsive design
    //             height={100} // Set height to 100% for responsive design
    //             priority
    //             alt={"Product ${index + 1}"}
    //             className="rounded-md"
    //             style={{ width: "auto", height: "auto" }} // Responsive image
    //           />
    //           <Link href={""}>{item.name}</Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </section>

    <section className="py-24 px-8">
      <div className="container">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <ul className="mt-6 flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              {/* <Link href={""}>{post.title}</Link> */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
