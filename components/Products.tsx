import React from "react";
import { products, Product } from "@/lib/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

function ProductCard({ product }: { product: Product }) {
  // Build a specific WhatsApp order message for this product
  const orderMessage = `Hi, I'd like to order: ${product.name}`;
  const whatsappLink = getWhatsAppLink(orderMessage);
  
  // Format price display
  const priceDisplay = product.price && product.price.trim() !== "" 
    ? product.price 
    : "Contact for price";

  return (
    <div className="group relative bg-cream border border-charcoal/10 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1">
      {/* Product Image or Beautiful Culinary Label Placeholder */}
      {product.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
        </div>
      ) : (
        /* Typographic Deli Stamp Placeholder (Elegantly replaces missing images) */
        <div className="relative aspect-[4/3] w-full bg-cream-dark flex flex-col items-center justify-center p-6 border-b border-charcoal/10 select-none overflow-hidden">
          {/* Subtle background monogram */}
          <div className="absolute font-serif text-[12rem] font-bold text-charcoal/5 leading-none translate-y-2 pointer-events-none select-none">
            {product.name.charAt(0)}
          </div>
          
          {/* Label style border */}
          <div className="w-full h-full border-2 border-dashed border-paprika/30 rounded-md p-4 flex flex-col items-center justify-center text-center relative">
            <span className="font-serif text-saffron text-xs font-bold tracking-widest uppercase mb-1">
              Spice Island
            </span>
            <span className="font-serif text-charcoal text-sm font-semibold tracking-wide uppercase px-2 py-0.5 border-y border-charcoal/20">
              Artisan Sausage
            </span>
            <span className="text-[10px] text-charcoal/50 mt-2 font-mono">
              Handcrafted in Zanzibar
            </span>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name and Price */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-paprika transition-colors duration-200">
            {product.name}
          </h3>
          <span className={`shrink-0 inline-block px-2.5 py-1 rounded text-xs font-semibold tracking-wider ${
            product.price && product.price.trim() !== ""
              ? "bg-paprika/10 text-paprika border border-paprika/20"
              : "bg-saffron/15 text-saffron-light/90 border border-saffron/30"
          }`}>
            {priceDisplay}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-charcoal/70 leading-relaxed mb-6 flex-grow">
            {product.description}
          </p>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t border-charcoal/5">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-paprika text-cream font-semibold py-3 px-4 rounded-md transition-all duration-300 text-sm tracking-wide"
          >
            {/* WhatsApp Small Icon */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="py-20 px-6 sm:px-12 bg-cream-dark/30 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          Our Handcrafted Sausage List
        </h2>
        <div className="h-0.5 w-20 bg-paprika mx-auto mb-6"></div>
        <p className="text-sm sm:text-base text-charcoal/70">
          Our products are freshly made to order. Since prices depend on batch size and market ingredients in Zanzibar, contact us for current pricing or place a direct query on WhatsApp.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
