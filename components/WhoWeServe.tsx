import React from "react";
import { type SiteConfig } from "@/lib/site";

const ICONS = ["🔥", "🎉", "🏨", "🍽️"];

export default function WhoWeServe({ config }: { config: SiteConfig }) {
  const audiences = config.audiences ?? [];
  if (audiences.length === 0) return null;

  return (
    <section
      id="who-we-serve"
      className="py-20 px-6 sm:px-12 bg-cream max-w-7xl mx-auto w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-mono text-paprika text-xs font-bold uppercase tracking-widest block mb-3">
          Who We Serve
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          From backyard braais to hotel kitchens
        </h2>
        <div className="h-0.5 w-20 bg-paprika mx-auto mb-6"></div>
        {config.serveIntro?.trim() && (
          <p className="text-sm sm:text-base text-charcoal/70">{config.serveIntro}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {audiences.map((a, i) => (
          <div
            key={`${a.title}-${i}`}
            className="bg-cream-dark/30 border border-charcoal/10 rounded-lg p-8 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span className="text-4xl mb-4" aria-hidden="true">
              {ICONS[i] ?? ICONS[ICONS.length - 1]}
            </span>
            <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
              {a.title}
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
