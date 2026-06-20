/**
 * SPICE ISLAND BOEREWORS - SITE CONFIGURATION
 * 
 * This file contains all the editable content for the website.
 * The owner can edit this file to update the business details, 
 * change the WhatsApp number, or add/remove products and prices.
 * 
 * Guidelines for editing:
 * - Text must be enclosed in quotes (e.g., "My Text").
 * - WhatsApp number must contain only digits (no spaces, dashes, or + signs) and include the country code.
 * - If a product does not have an image yet, leave `image: ""` or omit it.
 * - If a product does not have a price, leave `price: ""` or omit it. It will automatically show "Contact for price".
 */

export interface SiteConfig {
  businessName: string;
  tagline: string;
  aboutParagraph: string;
  // WhatsApp number must be international format, digits only, no '+' prefix or spaces.
  // Example: "255777123456" for a Zanzibar number.
  whatsappNumber: string;
  instagramUrl: string;
  location: string;
}

export interface Product {
  name: string;
  description?: string;
  price?: string;
  image?: string;
}

export const siteConfig: SiteConfig = {
  businessName: "Spice Island Boerewors",
  tagline: "Artisan South African sausages crafted in Zanzibar",
  aboutParagraph: "Bringing the authentic flavors of South African butchery to Zanzibar. Our artisan sausages are handcrafted using premium, locally-sourced meats and traditional spice blends (paprika, coriander, nutmeg, and cloves). Whether you're hosting a beach braai or prepping a hearty breakfast, we deliver premium deli-quality boerewors and sausages straight to your door across the island.",
  
  // TODO: Add your international WhatsApp phone number here (digits only, e.g., "255777000000" for Tanzania/Zanzibar)
  whatsappNumber: "TODO_ENTER_WHATSAPP_NUMBER",
  
  // TODO: Add your Instagram profile URL here (e.g., "https://instagram.com/spiceislandboerewors")
  instagramUrl: "https://instagram.com/TODO_ENTER_INSTAGRAM_USERNAME",
  
  location: "Zanzibar, Tanzania",
};

export const products: Product[] = [
  {
    name: "Ouma-style boerewors",
    description: "A traditional South African beef recipe spiced with cracked coriander seeds, cloves, and black pepper. Perfectly plump and ideal for a classic hot braai.",
    price: "", // Empty price shows "Contact for price"
    image: "", // Leave empty until photos are available
  },
  {
    name: "Farm-style boerewors",
    description: "Classic country-style recipe with a robust beef flavor, blended with warm nutmeg, coriander, and allspice for a rich, aromatic bite.",
    price: "",
    image: "",
  },
  {
    name: "Beef breakfast sausages",
    description: "Savory, slender beef sausages seasoned with a delicate herb blend. A premium addition to any cooked breakfast.",
    price: "",
    image: "",
  },
  {
    name: "Lamb chipolata breakfast sausages",
    description: "Fragrant, lean lamb breakfast sausages seasoned with rosemary, thyme, and spices. Delightfully juicy and quick to grill.",
    price: "",
    image: "",
  },
  {
    name: "Cocktail pork breakfast sausages",
    description: "Bite-sized pork sausages with a mild, sweet herb seasoning. A crowd favorite for breakfast spreads, snack platters, and kids' meals.",
    price: "",
    image: "",
  },
  {
    name: "Beef dry wors",
    description: "Authentic droëwors—traditional South African air-dried beef snack sausage cured with vinegar, coriander, and salt. Perfect high-protein snack for Zanzibar adventures.",
    price: "",
    image: "",
  },
];
