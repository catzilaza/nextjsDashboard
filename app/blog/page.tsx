import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/blog/header";
import Footer from "@/components/blog/footer";
import ContentForm from "@/components/blog/content-form";
import { UploadImageForm } from "@/components/blog/upload-image-form";
import { Images } from "@/components/blog/images";
// import { revalidatePath } from "next/cache";
// import styles from "./page.module.css";
import styles from "@/components/blog/blogStyle/blog.module.css";
// import prisma from '@/lib/prisma'
// import { list } from "@vercel/blob";

// export const dynamic = 'force-dynamic'

//https://www.youtube.com/watch?v=-HSFV9ILFuk
//https://github.com/HamedBahram/next-novel/blob/main/app/blog/%5Bslug%5D/page.tsx

export default async function BlogPage() {
  const productsDir = path.join(process.cwd(), "public", "products");
  // const response = await list();

  // console.log("Response from Vercel Blob:", response.blobs);

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

  return (
    <>
      {/* "flex min-h-screen w-full flex-col p-6"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
     */}
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className={styles.blogForm}>
            <h1 className="text-3xl font-bold">Write a blog</h1>
            <ContentForm />
            <UploadImageForm />
            <div className="h-1/3"></div>
            <Footer />
          </div>
          <div className={styles.blogList}>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
              <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/2 md:px-20">
                <section className="py-24 px-8">
                  <div className="container">
                    <h1 className={styles.blogTitle}>Blogs</h1>
                    <ul className="mt-6 flex flex-col gap-2">
                      {posts.map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className={styles.blogLink}
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
              <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-6">
                <div>
                  <Images />
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="flex min-h-screen w-full flex-col p-6">
<div className="flex h-20 shrink-0 items-center rounded-lg bg-blue-500 p-4 md:h-32">
  <Header />
</div>
<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
  <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
    <h1 className="text-3xl font-bold">Write a blog</h1>
    <ContentForm />
    <UploadImageForm />
    <div className="h-1/3"></div>
    <Footer />
  </div>
  <div className="flex items-center justify-center p-6 md:w-2/5 md:px-28 md:py-6">
    <section className="py-24 px-8">
      <div className="container">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <ul className="mt-6 flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <br />
    <div>
      {response.blobs.map((blob) => (
        <a key={blob.pathname} href={blob.downloadUrl}>
          {blob.pathname}
        </a>
      ))}
    </div>
    <div>
      <Images />
    </div>
  </div>
</div>
</div> */
}

{
  /* <section className="py-24 px-8">
<div className="container">
  <h1 className="text-3xl font-bold">Blogs</h1>
  <ul className="mt-6 flex flex-col gap-2">
    {posts.map((post) => (
      <li key={post.id}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>       
      </li>
    ))}
  </ul>
</div>
</section> */
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

//https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/img106_p40-iyAWfAVbCWfwxbFW0aRkqqBepQNG0m.jpg

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
