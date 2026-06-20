# Spice Island Boerewors Website Management Guide

Welcome to your website! This website is a single-page marketing page designed to load extremely fast on mobile screens and connect your customers directly to your WhatsApp.

There is no complex database or admin panel. All details on the website are managed through **one single file**: `lib/site.ts`.

Whenever you edit this file and push your changes to GitHub, Vercel will automatically rebuild and update your live website in a few seconds.

---

## How to Edit Content

Open the file [lib/site.ts](file:///Users/peter.grant/Antigravity/Spice%20Island%20Boerewors/lib/site.ts) in your code editor.

### 1. Update your WhatsApp Number
Look for this line in `siteConfig`:
```typescript
whatsappNumber: "TODO_ENTER_WHATSAPP_NUMBER",
```
Replace `"TODO_ENTER_WHATSAPP_NUMBER"` with your international phone number **using digits only**.
- **Do not** include spaces, dashes, or the `+` sign.
- **Do** include the country code.
- *Example (Tanzania/Zanzibar):* `whatsappNumber: "255777000000",`

### 2. Update your Instagram link
Look for this line in `siteConfig`:
```typescript
instagramUrl: "https://instagram.com/TODO_ENTER_INSTAGRAM_USERNAME",
```
Replace the placeholder with your actual Instagram profile link.
- *Example:* `instagramUrl: "https://instagram.com/spiceislandboerewors",`

### 3. Update Product Prices
Inside the `products` list, each item looks like this:
```typescript
{
  name: "Ouma-style boerewors",
  description: "A traditional South African beef recipe...",
  price: "", // Empty price shows "Contact for price"
  image: "", // Leave empty until photos are available
},
```
- **To add a price:** Type the price between the quotes.
  *Example:* `price: "TZS 18,000 / kg",`
- **To hide the price:** Keep the quotes empty: `price: "",`. The website will automatically show **"Contact for price"**.

### 4. Add Product Images
When you have product photos:
1. Place the image file (e.g., `ouma-wors.jpg`) inside the `public/` folder of this project.
2. In the `lib/site.ts` file, update the `image` path for that product:
   `image: "/ouma-wors.jpg",`
3. If an image is left empty (`image: ""`), the website will show a beautiful typographic label instead of a broken image box, so the page always looks complete!

---

## Local Development (For Developers)

To run the site locally on your computer:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Deploying to Vercel

1. Push this project to a new repository on your GitHub account.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your GitHub repository.
4. Vercel will auto-detect Next.js. Click **Deploy**.
5. Every time you push edits to `lib/site.ts` on GitHub, Vercel will deploy the update automatically!
