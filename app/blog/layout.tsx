// import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/blog/navbar/Navbar";
import Footer from "@/components/blog/footer/Footer";
import styles from "./blogPage.module.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { ThemeContextProvider } from "@/context/ThemeContext";
import AuthProvider from "@/providers/AuthProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <div className={styles.blogBody}>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
}

{
  /* <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
<Navbar />
{children}
<Toaster
  toastOptions={{
    className: "bg-white text-black",
    duration: 3000,
    style: {
      background: "#fff",
      color: "#000",
    },
  }}
/>
</div> */
}
