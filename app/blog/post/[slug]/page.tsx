import Menu from "@/components/blog/Menu/Menu";
import styles from "./postPage.module.css";
import Image from "next/image";
// import Comments from "@/components/comments/Comments";

// const getData = async (slug:any) => {
//   const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// const PostPage = async ({ params }: { params: any }) => {
//   const { slug } = params;

//   //   const data = await getData(slug);
//   const data = {
//     _id: "1",
//     title: "Fashion",
//     slug: "fashion",
//     img: "/blog/fashion.png",

//     createdAt: "2023-10-01",
//     catSlug: "fashion",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     user: {
//       name: "John Doe",
//       image: "/custom/amy-burns.png",
//     },
//   };

//   return (
//     <>
//     <h1>BLOG === POST ==== SLUG ==== PAGE === {slug}</h1>
//     </>
//     // <div className={styles.container}>
//     //   <div className={styles.infoContainer}>
//     //     <div className={styles.textContainer}>
//     //       <h1 className={styles.title}>{data?.title}</h1>
//     //       <div className={styles.user}>
//     //         {data?.user?.image && (
//     //           <div className={styles.userImageContainer}>
//     //             <Image
//     //               src={data.user.image}
//     //               alt=""
//     //               fill
//     //               className={styles.avatar}
//     //             />
//     //           </div>
//     //         )}
//     //         <div className={styles.userTextContainer}>
//     //           <span className={styles.username}>{data?.user.name}</span>
//     //           <span className={styles.date}>01.01.2024</span>
//     //         </div>
//     //       </div>
//     //     </div>
//     //     {data?.img && (
//     //       <div className={styles.imageContainer}>
//     //         <Image src={data.img} alt="" fill className={styles.image} />
//     //       </div>
//     //     )}
//     //   </div>
//     //   <div className={styles.content}>
//     //     <div className={styles.post}>
//     //       <div
//     //         className={styles.description}
//     //         dangerouslySetInnerHTML={{ __html: data?.desc }}
//     //       />
//     //       <div className={styles.comment}>
//     //         {/* <Comments postSlug={slug}/> */}
//     //       </div>
//     //     </div>
//     //     <Menu />
//     //   </div>
//     // </div>
//   );
// };

// export default PostPage;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <p>PostPage Slug : {slug} </p>
    </>
  );
}
