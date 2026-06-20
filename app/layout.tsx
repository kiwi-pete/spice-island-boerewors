import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.businessName} | Artisan Sausages in Zanzibar`,
  description: `${siteConfig.tagline}. Handcrafted traditional Ouma and Farm-style boerewors, breakfast beef/lamb/pork sausages, and dried droëwors. Order fresh on WhatsApp for delivery in Zanzibar.`,
  keywords: [
    "Boerewors Zanzibar",
    "South African sausage Tanzania",
    "Artisan butchers Zanzibar",
    "Ouma boerewors",
    "Droewors dry wors Zanzibar",
    "Breakfast sausages Zanzibar",
    "Spice Island Boerewors",
    "Handcrafted meat Zanzibar",
  ],
  authors: [{ name: siteConfig.businessName }],
  openGraph: {
    title: `${siteConfig.businessName} | Artisan Sausages in Zanzibar`,
    description: `${siteConfig.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors made locally and delivered across Zanzibar.`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Artisan Sausages in Zanzibar`,
    description: `${siteConfig.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        {children}
      </body>
    </html>
  );
}
