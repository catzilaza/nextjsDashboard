import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Toaster } from "@/components/ui/sonner";
// import { Inter, Lusitana } from "next/font/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <Homeheader /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
