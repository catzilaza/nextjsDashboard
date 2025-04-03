// import prisma from '@/lib/prisma'
import { products_desserts } from "@/app/lib/placeholder-data";
import { title } from "process";
import Image from "next/image";

export default async function SlugBlog({
  params,
}: {
  params: { slug: string };
}) {
  //   const blog = await prisma.post.findUnique({
  //     where: {
  //       slug: params.slug
  //     }
  //   })

  //   if (!blog) {
  //     return <p>Blog not found</p>
  //   }
  const { slug } = await params;

  // console.log("blog+++++++++++++++", slug);

  //   Find the item with name_eng: "Banana Egg Cake"

  //   function myfine() {
  //     for (let i = 0; i < products_desserts.length; i++) {
  //       if (products_desserts[i].name_eng === slug) {
  //         return products_desserts[i];
  //       }
  //     }
  //   }

  //   const myBlog = myfine();
  //   console.log("myBlog**********", myBlog?.name_eng);

  const blog = products_desserts.find(
    (item) =>
      item.name_eng.replaceAll("-", " ").toLowerCase().trim() ===
      slug.replaceAll("-", " ").toLowerCase().trim()
  );

  // Handle the case where the item is not found
  if (!blog) {
    return <p>Item not found</p>;
  }

  //   console.log("blog+++++++++++++++", blog.params.slug);

  return (
    <section className="py-24 px-8">
      <div className="container">
        <h1 className="text-4xl font-bold">{blog.name}</h1>
        <div
          className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
          dangerouslySetInnerHTML={{ __html: blog.name_eng }}
        ></div>
        <div>
          <Image
            src={blog.image_url}
            alt={blog.name_eng}
            priority
            width={500}
            height={500}
            className="rounded-lg mt-4"
            style={{ width: "auto", height: "auto" }} // Responsive image
          />
        </div>
      </div>
    </section>
  );
}
