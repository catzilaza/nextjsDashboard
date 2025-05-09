import Image from "next/image";
import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ withImage }: { withImage: any }) => {
  return (
    <div className={styles.items}>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div
            className={styles.imageContainer}
            style={{ position: "relative", width: "300px", height: "200px" }}
          >
            <Image
              src="/blog/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>Travel</span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div
            className={styles.imageContainer}
            style={{ position: "relative", width: "300px", height: "200px" }}
          >
            <Image
              src="/blog/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.culture}`}>
            Culture
          </span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div
            className={styles.imageContainer}
            style={{ position: "relative", width: "300px", height: "200px" }}
          >
            <Image
              src="/blog/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.food}`}>Food</span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div
            className={styles.imageContainer}
            style={{ position: "relative", width: "300px", height: "200px" }}
          >
            <Image
              src="/blog/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.fashion}`}>
            Fashion
          </span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
