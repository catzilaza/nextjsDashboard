import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Navbar from "../ui/navbar";
import ProductList from "@/components/products/product-list";
import { fetchProducts_Dessert } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import styles from "@/app/ui/home.module.css";
import { Suspense } from "react";
import DashboardSkeleton from "../ui/skeletons";
import { Divide, Loader2 } from "lucide-react";
import ProductsSkeleton from "./productsSkeleton";

// Build A Complete E-Commerce Website (Next.js 15, React Query, Tailwind CSS, TypeScript, Wix Studio)
// https://www.youtube.com/watch?v=gr--RC_naa0
// https://github.com/codinginflow/nextjs-15-wix-store/blob/Final-Project/src/app/page.tsx

export default async function ProductsPage() {
  const products = await fetchProducts_Dessert();
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/*<div className={styles.shape} />*/}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        <AcmeLogo />
      </div>
      <div className="flex h-20 shrink-0 justify-center rounded-lg bg-slate-200 p-4 md:h-22">
        <Navbar />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-6">
          <ProductList products={products} />
        </div>
      </div>
    </main>
  );
}
