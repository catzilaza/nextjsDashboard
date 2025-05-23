import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import Search from "@/app/ui/search";
import { CreateProduct } from "@/app/ui/products/button";
import { ProductsCardSkeleton } from "@/app/ui/skeletons";
import { fetchProducts_DessertPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
// import Card from "@/app/ui/products/card";
import ProductCard from "@/app/ui/products/card";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProducts_DessertPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductsCardSkeleton />}>
        <ProductCard query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
