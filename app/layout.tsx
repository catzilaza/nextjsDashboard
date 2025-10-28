// import { Inter, Lusitana } from "next/font/google";
import "@/app/global.css";
import { inter } from "@/app/fonts";
import { Toaster } from "@/components/ui/sonner";
import { TanStackQueryProviders } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TanStackQueryProviders>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          {/* {children} */}
          <Toaster
            position="top-center"
            richColors={true}
            toastOptions={{
              className: "bg-white text-black w-[50px] h-[80px]",
              duration: 4000,
              style: {
                background: "#fff",
                color: "#000",
              },
            }}
          />
        </TanStackQueryProviders>
      </body>
    </html>
  );
}
