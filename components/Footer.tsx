import React from "react";
import { type SiteConfig } from "@/lib/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { LogoMark } from "@/components/Logo";

export default function Footer({ config }: { config: SiteConfig }) {
  const currentYear = new Date().getFullYear();
  const genericMessage = `Hi, I'd like to order from ${config.businessName}`;
  const whatsappLink = getWhatsAppLink(genericMessage, config.whatsappNumber);

  return (
    <footer className="bg-charcoal text-cream-dark border-t-2 border-charcoal/30 py-16 px-6 sm:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand/Location */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
            <LogoMark className="w-9 h-9 text-cream shrink-0" />
            <h3 className="font-serif text-2xl font-bold text-cream">
              {config.businessName}
            </h3>
          </div>
          <p className="text-sm text-cream-dark/60 flex items-center justify-center md:justify-start gap-1.5">
            {/* Map pin icon */}
            <svg
              className="w-4 h-4 text-paprika"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            {config.location}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cream text-cream-dark/80 transition-colors py-1 border-b border-transparent hover:border-cream/30 text-sm font-semibold tracking-wider uppercase"
          >
            WhatsApp Order
          </a>
          {config.instagramUrl &&
            config.instagramUrl.trim() !== "" &&
            !config.instagramUrl.includes("TODO") && (
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cream text-cream-dark/80 transition-colors py-1 border-b border-transparent hover:border-cream/30 text-sm font-semibold tracking-wider uppercase"
              >
                Instagram
              </a>
            )}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-cream-dark/40">
          <p className="mb-1">
            &copy; {currentYear} {config.businessName}. All rights reserved.
          </p>
          <p>
            Artisanal quality sausages crafted with love in Zanzibar, Tanzania.
          </p>
        </div>
      </div>
    </footer>
  );
}
