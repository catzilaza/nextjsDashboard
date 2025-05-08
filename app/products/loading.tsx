import DashboardSkeleton from "@/app/ui/skeletons";
import BlogSkeleton from "@/components/blog/blogSkeleton";

export default function Loading() {
  return (
    <>
      <div>
        <h1>Loading........!</h1>
      </div>
      <DashboardSkeleton />;
    </>
  );
}
