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
        <Toaster
          toastOptions={{
            className: "bg-white text-black w-[50px] h-[80px]",
            duration: 4000,
            style: {
              background: "#fff",
              color: "#000",
            },
          }}
        />
      </body>
    </html>
  );
}
