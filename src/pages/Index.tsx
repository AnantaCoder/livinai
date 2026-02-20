import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import AIShowcase from "@/components/AIShowcase";
import Statement from "@/components/Statement";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Collections />
      <AIShowcase />
      <Statement />
      <Products />
      <Footer />
    </div>
  );
};

export default Index;
