"use client";

import { useRouter, redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import {} from "next/navigation";
import styles from "./pagination.module.css";

const Pagination = ({
  page,
  hasPrev,
  hasNext,
}: {
  page: any;
  hasPrev: any;
  hasNext: any;
}) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} hover:bg-red-500`}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={`${styles.button} hover:bg-red-500`}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
