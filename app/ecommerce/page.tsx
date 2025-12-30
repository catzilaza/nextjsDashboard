import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Main from "./component/Main";
import Features from "./component/Features";
import Footer from "./component/Footer";

//https://github.com/ax958777/Ecommerce
//https://www.youtube.com/watch?v=H278hWKtCIs&list=PLl6EcvA_AoxGRajEfrzYedWQM-L4EmROQ&index=9
//https://github.com/stripe-samples/accept-a-payment/blob/main/custom-payment-flow/server/node-typescript/src/server.ts
//https://github.com/burakorkmez/full-stripe-tutorial,https://www.youtube.com/watch?v=_YCC9Osq6y4

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
