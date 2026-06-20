import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

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

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteContent();
  return {
    title: `${config.businessName} | Artisan Sausages in Zanzibar`,
    description: `${config.tagline}. Handcrafted beef boerewors, breakfast sausages, and dry wors. Order fresh on WhatsApp for delivery in Zanzibar.`,
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
    authors: [{ name: config.businessName }],
    openGraph: {
      title: `${config.businessName} | Artisan Sausages in Zanzibar`,
      description: `${config.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors made locally and delivered across Zanzibar.`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.businessName} | Artisan Sausages in Zanzibar`,
      description: `${config.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors.`,
    },
  };
}

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
