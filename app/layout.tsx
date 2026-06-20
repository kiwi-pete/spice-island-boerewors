import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

const SITE_URL = "https://spice-island-boerewors.vercel.app";

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
  const title = `${config.businessName} | Artisan Sausages in Zanzibar`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
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
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description: `${config.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors made locally and delivered across Zanzibar.`,
      type: "website",
      locale: "en_US",
      siteName: config.businessName,
      url: SITE_URL,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${config.businessName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${config.tagline}. Traditional recipe boerewors, breakfast sausages, and dry wors.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config } = await getSiteContent();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.businessName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-square-512.png`,
    image: `${SITE_URL}/og-image.png`,
    description: `${config.tagline}.`,
    ...(config.whatsappNumber && !config.whatsappNumber.includes("TODO")
      ? { telephone: `+${config.whatsappNumber.replace(/\D/g, "")}` }
      : {}),
    areaServed: config.location,
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
