import React from "react";
import { type SiteConfig } from "@/lib/site";

export default function WhatIsBoerewors({ config }: { config: SiteConfig }) {
  // Hide the section entirely if there's no copy yet.
  if (!config.boereworsInfo || config.boereworsInfo.trim() === "") return null;

  return (
    <section
      id="what-is-boerewors"
      className="py-20 px-6 sm:px-12 bg-charcoal text-cream border-t-4 border-paprika relative overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-paprika/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-saffron/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="font-mono text-saffron text-xs font-bold uppercase tracking-widest block mb-3">
          New to boerewors?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-2">
          What is Boerewors?
        </h2>

        {/* Typographic separator */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-12 bg-cream/20"></div>
          <span className="text-paprika text-lg font-serif">◈</span>
          <div className="h-px w-12 bg-cream/20"></div>
        </div>

        <p className="font-serif text-lg sm:text-xl text-cream-dark leading-relaxed whitespace-pre-line text-left sm:text-center">
          {config.boereworsInfo}
        </p>
      </div>
    </section>
  );
}
