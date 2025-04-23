import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Toaster } from "@/components/ui/sonner";
// import { Inter, Lusitana } from "next/font/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} antialiased`}>
      {children}
      <Toaster />
    </div>
  );
}
