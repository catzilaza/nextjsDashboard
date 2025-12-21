import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import NavbarLanding from "@/components/landing/NavbarLanding";

export const metadata = {
  title: "Landing - Acme",
  description: "Simple Tailwind landing page example",
};

export default function MainLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <NavbarLanding />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
