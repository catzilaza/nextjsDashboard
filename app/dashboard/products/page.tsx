import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import Search from "@/app/ui/search";
import { CreateProduct } from "@/app/ui/products/button";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search products..." /> */}
        <CreateProduct />
      </div>
      {/* <Suspense>
        <h1>Cards Products</h1>
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <h1>Paginations</h1>
      </div>
    </div>
  );
}
