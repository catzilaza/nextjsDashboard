import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }: { item: any }) => {
  return (
    <div className={styles.container} key={item._id}>
      {item.img && (
        <div
          className={`${styles.imageContainer}`}
          style={{ position: "relative", width: "300px", height: "400px" }}
        >
          <Image
            src={item.img}
            alt="error"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(item.createdAt).toISOString().substring(0, 10) + " "}
            {new Date(item.createdAt).toLocaleDateString()}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(item.createdAt))}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/blog/post/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.desc.substring(0, 60)}</p>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }}
        />
        <Link href={`/blog/post/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
