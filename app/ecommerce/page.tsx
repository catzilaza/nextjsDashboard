import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Main from "./component/Main";
import Features from "./component/Features";
import Footer from "./component/Footer";

//https://github.com/ax958777/Ecommerce

export default async function EcommercePage() {
  // const products = await fetchAllProducts_Dessert();
  return (
    <>
      <Navbar />
      <Hero />
      <Main />
      <Features />
      <Footer />
    </>
  );
}
