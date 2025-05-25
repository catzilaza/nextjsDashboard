import DashboardSkeleton from "@/app/ui/skeletons";
import ProductsSkeleton from "./productsSkeleton";
// import BlogSkeleton from "@/components/blog/blogSkeleton";
// import { Loader2, Loader, LoaderIcon } from "lucide-react";
// import React from "react";

export default function Loading() {
  return (
    <div>
      <h1>Loading.....</h1>
      <ProductsSkeleton />
    </div>
  );
}
