import React from "react";
import { type SiteConfig } from "@/lib/site";

export default function AboutUs({ config }: { config: SiteConfig }) {
  // Hide the section entirely if there's no copy yet.
  if (!config.aboutUs || config.aboutUs.trim() === "") return null;

  return (
    <section
      id="about-us"
      className="py-20 px-6 sm:px-12 bg-cream relative overflow-hidden"
    >
      {/* Decorative spice texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#b13c23_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="font-mono text-paprika text-xs font-bold uppercase tracking-widest block mb-3">
          About Us
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-2">
          Meet the Founder
        </h2>

        {/* Typographic separator */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-12 bg-charcoal/15"></div>
          <span className="text-paprika text-lg font-serif">◈</span>
          <div className="h-px w-12 bg-charcoal/15"></div>
        </div>

        <p className="font-serif text-lg sm:text-xl text-charcoal/80 leading-relaxed">
          {config.aboutUs}
        </p>
      </div>
    </section>
  );
}
