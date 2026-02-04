import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { getDataBlogAction } from "@/app/blog/actions/blogAction";
import { list } from "@vercel/blob";

const CategoryList = async () => {
  // const data = await getDataBlogAction();
  const data = [
    {
      _id: "1",
      title: "Fashion",
      slug: "fashion",
      img: "/blog/fashion.png",
    },
    {
      _id: "2",
      title: "Lifestyle",
      slug: "lifestyle",
      img: "/blog/style.png",
    },
    {
      _id: "3",
      title: "Travel",
      slug: "travel",
      img: "/blog/travel.png",
    },
    {
      _id: "4",
      title: "Food",
      slug: "food",
      img: "/blog/food.png",
    },
    {
      _id: "5",
      title: "Fitness",
      slug: "fitness",
      img: "/blog/tiktok.png",
    },
    {
      _id: "6",
      title: "Technology",
      slug: "technology",
      img: "/blog/youtube.png",
    },
  ];

  // const blobs = await list();
  // console.log("Response from Vercel Blob:", blobs.blobs);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item: any) => (
          <Link
            // href={`/blog?cat=${item.slug}`}
            href="/"
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt="error"
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
