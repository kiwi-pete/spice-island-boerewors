/**
 * SPICE ISLAND BOEREWORS - DEFAULT SITE CONTENT
 *
 * This file defines the content shapes and the DEFAULT (fallback / seed) values.
 *
 * Live content is now stored in Supabase and edited from the /admin screen.
 * These defaults are used only when the database is empty or unreachable, so the
 * site always renders something sensible. See `lib/content.ts` for the loader.
 */

export interface SiteConfig {
  businessName: string;
  tagline: string;
  /** Short paragraph shown under the tagline in the hero. */
  heroBlurb: string;
  aboutParagraph: string;
  // WhatsApp number must be international format, digits only, no '+' prefix or spaces.
  // Example: "255777123456" for a Zanzibar number.
  whatsappNumber: string;
  instagramUrl: string;
  location: string;
}

export interface Product {
  /** Database id (empty for not-yet-saved rows). */
  id?: string;
  name: string;
  description?: string;
  price?: string;
  image?: string;
}

export const defaultSiteConfig: SiteConfig = {
  businessName: "Spice Island Boerewors",
  tagline: "Artisan South African sausages crafted in Zanzibar",
  heroBlurb:
    "Premium South African sausages handcrafted in Zanzibar. Traditional recipes, local fresh ingredients, and rich, authentic flavor cured and packaged for the ultimate grill.",
  aboutParagraph:
    "Freshly made in small batches, bringing the authentic flavors of South African butchery to Zanzibar. We make beef boerewors, beef breakfast sausage, and air-dried beef dry wors to order. Delivery is available in the Nungwi area of Zanzibar, and orders are taken by WhatsApp.",

  // TODO: Set the WhatsApp number from the /admin screen (digits only, e.g., "255777000000").
  whatsappNumber: "TODO_ENTER_WHATSAPP_NUMBER",

  // TODO: Set the Instagram profile URL from the /admin screen.
  instagramUrl: "https://instagram.com/TODO_ENTER_INSTAGRAM_USERNAME",

  location: "Zanzibar, Tanzania",
};

export const defaultProducts: Product[] = [
  {
    name: "Ouma-style boerewors",
    description:
      "Traditional South African Ouma-style beef boerewors, freshly made in small batches.",
    price: "TZS 45,000 / kg",
  },
  {
    name: "Beef boerewors",
    description: "Classic beef boerewors, made fresh to order.",
    price: "TZS 45,000 / kg",
  },
  {
    name: "Beef breakfast sausage",
    description: "Thin beef breakfast sausage.",
    price: "TZS 45,000 / kg",
  },
  {
    name: "Beef dry wors",
    description: "Air-dried beef dry wors, the perfect snack. Sold in 500g packs.",
    price: "TZS 40,000 / 500g pack",
  },
];
