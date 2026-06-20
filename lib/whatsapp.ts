/**
 * Builds a WhatsApp chat link with a pre-filled message.
 * Falls back gracefully if the owner has not filled in the WhatsApp number yet.
 *
 * @param message The pre-filled message text.
 * @param whatsappNumber The owner's WhatsApp number (international format, digits only).
 * @returns The full URL to open WhatsApp.
 */
export function getWhatsAppLink(message: string, whatsappNumber: string): string {
  // If the owner hasn't set a real number yet, use a placeholder so links don't break.
  const cleanNumber =
    !whatsappNumber || whatsappNumber.includes("TODO")
      ? "255000000000"
      : whatsappNumber.replace(/\D/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
