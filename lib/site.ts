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
  /** Founder / "About Us" paragraph. */
  aboutUs: string;
  /** "What is boerewors?" explainer (supports blank lines between paragraphs). */
  boereworsInfo: string;
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
  aboutUs:
    "Spice Island Boerewors was founded by Mark, an executive chef born and bred in South Africa, where boerewors is woven into everyday life. Over many years cooking in some of Zanzibar's most prestigious hotels, Mark built a reputation for precision, quality, and an uncompromising respect for proper ingredients. Today he brings that same fine-dining discipline to the food he grew up on — handcrafting every batch in small quantities using authentic South African recipes and time-honoured techniques. The result is boerewors with genuine pedigree: the taste of home, made by a professional chef who simply refuses to cut corners.",
  boereworsInfo: `Boerewors — literally "farmer's sausage" in Afrikaans — is South Africa's most beloved sausage and the heart of every braai (the South African barbecue). It's traditionally made from coarsely minced beef, seasoned with a warm, fragrant blend of toasted coriander, black pepper, nutmeg and clove, then wound into a generous spiral and grilled over open coals until it's juicy, smoky and caramelised.

Its story begins with the early Cape settlers of the 1800s, who married European sausage-making craft with local spices to create something entirely their own. To this day, South African law insists that true boerewors be at least 90% meat — no fillers, no shortcuts. That is exactly how we make ours.

More than a meal, boerewors is a ritual: friends gathered around the fire, the unmistakable scent of spice and woodsmoke, and that first sizzling bite that tastes like home.`,

  whatsappNumber: "255774337176",

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
    image: "/products/ouma-style-boerewors.svg",
  },
  {
    name: "Beef boerewors",
    description: "Classic beef boerewors, made fresh to order.",
    price: "TZS 45,000 / kg",
    image: "/products/beef-boerewors.svg",
  },
  {
    name: "Beef breakfast sausage",
    description: "Thin beef breakfast sausage.",
    price: "TZS 45,000 / kg",
    image: "/products/beef-breakfast-sausage.svg",
  },
  {
    name: "Beef dry wors",
    description: "Air-dried beef dry wors, the perfect snack. Sold in 500g packs.",
    price: "TZS 40,000 / 500g pack",
    image: "/products/beef-dry-wors.svg",
  },
];
