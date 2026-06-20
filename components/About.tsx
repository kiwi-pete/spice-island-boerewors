import React from "react";
import { type SiteConfig } from "@/lib/site";

export default function About({ config }: { config: SiteConfig }) {
  return (
    <section className="py-20 px-6 sm:px-12 bg-charcoal text-cream border-y-4 border-paprika relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-paprika/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="font-mono text-saffron text-xs font-bold uppercase tracking-widest block mb-3">
          Our Heritage
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-6">
          The Spice Island Story
        </h2>
        
        {/* Typographic separator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-cream/20"></div>
          <span className="text-paprika text-lg font-serif">◈</span>
          <div className="h-px w-12 bg-cream/20"></div>
        </div>

        {/* Short paragraph from config */}
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-cream-dark italic leading-relaxed max-w-3xl mx-auto px-4">
          {config.aboutParagraph}
        </p>

        {/* Highlight badge grid for Zanzibari context */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="p-4 border border-cream/10 rounded bg-cream/5 flex flex-col items-center">
            <span className="text-2xl mb-2">🇿🇦</span>
            <h4 className="font-serif font-bold text-saffron text-sm uppercase tracking-wide mb-1">Authentic Recipes</h4>
            <p className="text-xs text-cream/70">Genuine South African butchery guidelines</p>
          </div>
          <div className="p-4 border border-cream/10 rounded bg-cream/5 flex flex-col items-center">
            <span className="text-2xl mb-2">🌴</span>
            <h4 className="font-serif font-bold text-saffron text-sm uppercase tracking-wide mb-1">Zanzibar Spiced</h4>
            <p className="text-xs text-cream/70">Locally hand-blended aromatic spices</p>
          </div>
          <div className="p-4 border border-cream/10 rounded bg-cream/5 flex flex-col items-center">
            <span className="text-2xl mb-2">🔥</span>
            <h4 className="font-serif font-bold text-saffron text-sm uppercase tracking-wide mb-1">Braai Ready</h4>
            <p className="text-xs text-cream/70">Coarse-ground, juicy, and perfect for coals</p>
          </div>
        </div>
      </div>
    </section>
  );
}
