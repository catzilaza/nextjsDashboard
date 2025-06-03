import DashboardSkeleton from "@/app/ui/skeletons";
import ProductsSkeleton from "./productsSkeleton";
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, Loader, LoaderIcon } from "lucide-react";
// import BlogSkeleton from "@/components/blog/blogSkeleton";
// import React from "react";

export default function Loading() {
  return (
    <div>
      {/* <Loader2 className="mx-auto my-16 animate-spin" /> */}
      <h1>Loading.....</h1>
      <ProductsSkeleton />
      {/* <LoadingSkeleton /> */}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[16rem] w-full" />
        // <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}