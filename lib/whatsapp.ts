import { siteConfig } from "./site";

/**
 * Builds a WhatsApp chat link with a pre-filled message.
 * Falls back gracefully if the owner has not filled in the WhatsApp number yet.
 * 
 * @param message The pre-filled message text.
 * @returns The full URL to open WhatsApp.
 */
export function getWhatsAppLink(message: string): string {
  const number = siteConfig.whatsappNumber;
  
  // If the owner hasn't replaced the placeholder yet, use a mock/invalid number or handle it gracefully
  const cleanNumber = number.includes("TODO") ? "255000000000" : number.replace(/\D/g, "");
  
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
