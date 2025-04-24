import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {children}
      {/* <Toaster
        toastOptions={{
          className: "bg-white text-black",
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
          },
        }}
      /> */}
    </div>
  );
}
