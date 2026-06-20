import React from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhoWeServe from "@/components/WhoWeServe";
import About from "@/components/About";
import AboutUs from "@/components/AboutUs";
import WhatIsBoerewors from "@/components/WhatIsBoerewors";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { getSiteContent } from "@/lib/content";

// Re-fetch from the database at most every 5 minutes as a fallback; admin edits
// also trigger on-demand revalidation via revalidatePath('/').
export const revalidate = 300;

export default async function Home() {
  const { config, products } = await getSiteContent();

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans selection:bg-paprika selection:text-cream">
      {/* Decorative top border */}
      <div className="w-full h-1.5 bg-saffron"></div>

      <main className="flex-grow flex flex-col">
        {/* 1. Hero Section */}
        <Hero config={config} />

        {/* 2. Products Grid */}
        <Products products={products} config={config} />

        {/* 3. Who We Serve */}
        <WhoWeServe config={config} />

        {/* 4. About Paragraph */}
        <About config={config} />

        {/* 4. About Us / Founder */}
        <AboutUs config={config} />

        {/* 5. What is Boerewors? (explainer for newcomers) */}
        <WhatIsBoerewors config={config} />
      </main>

      {/* 4. Footer Section */}
      <Footer config={config} />

      {/* Floating Sticky WhatsApp button for mobile scroll conversion */}
      <StickyWhatsApp config={config} />
    </div>
  );
}
