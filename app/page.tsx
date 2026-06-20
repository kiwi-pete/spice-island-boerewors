import React from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans selection:bg-paprika selection:text-cream">
      {/* Decorative top border */}
      <div className="w-full h-1.5 bg-saffron"></div>

      <main className="flex-grow flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Products Grid */}
        <Products />

        {/* 3. About Paragraph */}
        <About />
      </main>

      {/* 4. Footer Section */}
      <Footer />

      {/* Floating Sticky WhatsApp button for mobile scroll conversion */}
      <StickyWhatsApp />
    </div>
  );
}
