import styles from "./cardlist.module.css";
import Card from "@/components/blog/card/Card";

//https://nextjs.org/blog/building-apis-with-nextjs
//https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

const getData = async (page: any, cat: any) => {
  const res = await fetch(
    `http://localhost:3000/api/blog/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async (params: any) => {
  const page = parseInt(params.page);
  const cat = params.cat || "fashion";

  console.log("++++++ page", page);
  console.log("++++++ cat", cat);

  const { posts, count } = await getData(page, cat);
  // console.log("++++++ posts", posts);
  // const posts = [
  //   {
  //     _id: "1",
  //     title: "Fashion",
  //     slug: "fashion",
  //     img: "/blog/fashion.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "fashion",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     _id: "2",
  //     title: "Lifestyle",
  //     slug: "lifestyle",
  //     img: "/blog/style.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "lifestyle",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     _id: "3",
  //     title: "Travel",
  //     slug: "travel",
  //     img: "/blog/travel.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "travel",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     _id: "4",
  //     title: "Food",
  //     slug: "food",
  //     img: "/blog/food.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "food",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     _id: "5",
  //     title: "Fitness",
  //     slug: "fitness",
  //     img: "/blog/tiktok.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "fitness",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     _id: "6",
  //     title: "Technology",
  //     slug: "technology",
  //     img: "/blog/youtube.png",
  //     createdAt: "2023-10-01",
  //     catSlug: "technology",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  // ];

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item: any, index: any) => (
          <Card item={item} key={index} />
        ))}
        <p>posts?.map</p>
      </div>
      {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
    </div>
  );
};

export default CardList;
