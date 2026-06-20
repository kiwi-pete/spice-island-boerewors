import React from "react";
import { siteConfig } from "@/lib/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  const genericMessage = `Hi, I'd like to order from ${siteConfig.businessName}`;
  const whatsappLink = getWhatsAppLink(genericMessage);

  return (
    <section className="relative overflow-hidden bg-charcoal text-cream py-20 px-6 sm:px-12 md:py-32 flex flex-col items-center justify-center text-center border-b-4 border-paprika">
      {/* Background Subtle Spice Texture Mockup */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[radial-gradient(#b13c23_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-3xl relative z-10 flex flex-col items-center">
        {/* Origin/Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paprika/20 border border-paprika text-saffron text-sm font-semibold tracking-wider uppercase mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-saffron"></span>
          {siteConfig.location}
        </div>

        {/* Brand Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-cream">
          {siteConfig.businessName}
        </h1>

        {/* Tagline */}
        <p className="font-serif text-xl sm:text-2xl text-cream-dark italic mb-8 max-w-2xl leading-relaxed">
          "{siteConfig.tagline}"
        </p>

        {/* Short description */}
        <p className="text-base sm:text-lg text-cream/80 mb-10 max-w-xl leading-relaxed">
          Premium South African sausages handcrafted in Zanzibar. Traditional recipes, local fresh ingredients, and rich, authentic flavor cured and packaged for the ultimate grill.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 sm:px-0">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-paprika hover:bg-paprika-light text-cream font-semibold px-8 py-4 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-paprika-light text-base md:text-lg"
          >
            {/* WhatsApp Icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Order on WhatsApp</span>
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center bg-transparent hover:bg-cream/10 text-cream font-semibold px-8 py-4 rounded-md transition-all duration-300 border-2 border-cream/30 hover:border-cream text-base md:text-lg"
          >
            Explore Our Meat List
          </a>
        </div>
      </div>

      {/* Decorative Deli Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#b13c23,#b13c23_10px,#1c1a19_10px,#1c1a19_20px)]"></div>
    </section>
  );
}
