"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig, Product } from "@/lib/site";
import type { ProductRow } from "@/lib/content";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { saveAll, uploadProductPhoto, type EditableProduct } from "./actions";

function rowToEditable(r: ProductRow): EditableProduct {
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? "",
    price: r.price ?? "",
    image_url: r.image_url ?? "",
    is_available: r.is_available,
  };
}

function editableToProduct(p: EditableProduct, i: number): Product {
  return {
    id: p.id ?? `new-${i}`,
    name: p.name,
    description: p.description || undefined,
    price: p.price || undefined,
    image: p.image_url || undefined,
  };
}

/* ---- small reusable field controls ---- */

function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-charcoal/15 bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-paprika focus:ring-1 focus:ring-paprika"
      />
      {hint && <span className="block text-xs text-charcoal/40 mt-1">{hint}</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-charcoal/15 bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-paprika focus:ring-1 focus:ring-paprika resize-y"
      />
    </label>
  );
}

export default function AdminEditor({
  initialConfig,
  initialProducts,
}: {
  initialConfig: SiteConfig;
  initialProducts: ProductRow[];
}) {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [products, setProducts] = useState<EditableProduct[]>(
    initialProducts.map(rowToEditable)
  );
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );
  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);

  function setConfigField<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
  }

  function updateProduct(i: number, patch: Partial<EditableProduct>) {
    setProducts((list) => list.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }

  function addProduct() {
    setProducts((list) => [
      ...list,
      { name: "", description: "", price: "", image_url: "", is_available: true },
    ]);
  }

  function removeProduct(i: number) {
    setProducts((list) => {
      const target = list[i];
      if (target?.id) setDeletedIds((d) => [...d, target.id!]);
      return list.filter((_, idx) => idx !== i);
    });
  }

  function move(i: number, dir: -1 | 1) {
    setProducts((list) => {
      const j = i + dir;
      if (j < 0 || j >= list.length) return list;
      const copy = [...list];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  async function onPickPhoto(i: number, file: File) {
    setUploadingIndex(i);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadProductPhoto(fd);
      if (res.ok) {
        updateProduct(i, { image_url: res.url });
      } else {
        setMessage({ kind: "err", text: res.error });
      }
    } catch {
      setMessage({ kind: "err", text: "Upload failed. Please try again." });
    } finally {
      setUploadingIndex(null);
    }
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await saveAll({ config, products, deletedIds });
      if (res.ok) {
        setProducts(res.products.map(rowToEditable));
        setDeletedIds([]);
        setMessage({ kind: "ok", text: "Saved. Your live site is updated." });
      } else {
        setMessage({ kind: "err", text: res.error });
      }
    } catch {
      setMessage({ kind: "err", text: "Save failed. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  // Live preview uses only the products marked visible, matching the public site.
  const previewProducts = useMemo(
    () => products.filter((p) => p.is_available).map(editableToProduct),
    [products]
  );

  return (
    <div className="min-h-screen bg-cream-dark/40">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-charcoal text-cream border-b border-paprika/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <h1 className="font-serif text-lg sm:text-xl font-bold">
            Spice Island — Editor
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            {message && (
              <span
                className={`hidden sm:inline text-sm ${
                  message.kind === "ok" ? "text-saffron" : "text-paprika-light"
                }`}
              >
                {message.text}
              </span>
            )}
            <button
              onClick={logout}
              className="text-sm text-cream/70 hover:text-cream px-3 py-2 rounded-md border border-cream/20"
            >
              Log out
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="bg-paprika hover:bg-paprika-light disabled:opacity-50 text-cream font-semibold text-sm px-4 py-2 rounded-md transition-colors"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`sm:hidden px-4 pb-2 text-sm ${
              message.kind === "ok" ? "text-saffron" : "text-paprika-light"
            }`}
          >
            {message.text}
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---- Editor column ---- */}
        <div className="flex flex-col gap-8">
          {/* Site text */}
          <section className="bg-white rounded-xl border border-charcoal/10 p-5 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-charcoal mb-4">
              Website text
            </h2>
            <div className="flex flex-col gap-4">
              <TextField
                label="Business name"
                value={config.businessName}
                onChange={(v) => setConfigField("businessName", v)}
              />
              <TextField
                label="Tagline"
                value={config.tagline}
                onChange={(v) => setConfigField("tagline", v)}
              />
              <TextField
                label="Location"
                value={config.location}
                onChange={(v) => setConfigField("location", v)}
              />
              <TextArea
                label="Hero blurb (under the tagline)"
                value={config.heroBlurb}
                onChange={(v) => setConfigField("heroBlurb", v)}
              />
              <TextArea
                label="About paragraph"
                value={config.aboutParagraph}
                onChange={(v) => setConfigField("aboutParagraph", v)}
                rows={4}
              />
              <TextField
                label="WhatsApp number"
                value={config.whatsappNumber}
                onChange={(v) => setConfigField("whatsappNumber", v)}
                placeholder="255777123456"
                hint="Digits only, with country code (no +, spaces or dashes)."
              />
              <TextField
                label="Instagram URL"
                value={config.instagramUrl}
                onChange={(v) => setConfigField("instagramUrl", v)}
                placeholder="https://instagram.com/yourname"
              />
            </div>
          </section>

          {/* Products */}
          <section className="bg-white rounded-xl border border-charcoal/10 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-charcoal">Products</h2>
              <button
                onClick={addProduct}
                className="text-sm font-semibold text-paprika hover:text-paprika-light border border-paprika/30 rounded-md px-3 py-1.5"
              >
                + Add product
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {products.map((p, i) => (
                <div
                  key={p.id ?? `new-${i}`}
                  className="rounded-lg border border-charcoal/10 p-4 bg-cream-dark/20"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-charcoal/40">
                      #{i + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="px-2 py-1 text-charcoal/50 hover:text-charcoal disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === products.length - 1}
                        aria-label="Move down"
                        className="px-2 py-1 text-charcoal/50 hover:text-charcoal disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeProduct(i)}
                        className="px-2 py-1 text-paprika hover:text-paprika-light text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <TextField
                      label="Name"
                      value={p.name}
                      onChange={(v) => updateProduct(i, { name: v })}
                    />
                    <TextField
                      label="Price"
                      value={p.price}
                      onChange={(v) => updateProduct(i, { price: v })}
                      placeholder="TZS 45,000 / kg"
                      hint="Leave empty to show “Contact for price”."
                    />
                    <TextArea
                      label="Description"
                      value={p.description}
                      onChange={(v) => updateProduct(i, { description: v })}
                    />

                    {/* Photo */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">
                        Photo
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-16 rounded-md overflow-hidden bg-cream-dark border border-charcoal/10 flex items-center justify-center shrink-0">
                          {p.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image_url}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-charcoal/40">
                              No photo
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <input
                            ref={(el) => {
                              fileInputs.current[i] = el;
                            }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) onPickPhoto(i, f);
                              e.target.value = "";
                            }}
                          />
                          <button
                            onClick={() => fileInputs.current[i]?.click()}
                            disabled={uploadingIndex === i}
                            className="text-sm font-semibold text-charcoal border border-charcoal/20 rounded-md px-3 py-1.5 hover:bg-charcoal/5 disabled:opacity-50"
                          >
                            {uploadingIndex === i
                              ? "Uploading…"
                              : p.image_url
                                ? "Replace photo"
                                : "Upload photo"}
                          </button>
                          {p.image_url && (
                            <button
                              onClick={() => updateProduct(i, { image_url: "" })}
                              className="text-xs text-paprika hover:text-paprika-light text-left"
                            >
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <label className="flex items-center gap-2 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.is_available}
                        onChange={(e) =>
                          updateProduct(i, { is_available: e.target.checked })
                        }
                        className="w-4 h-4 accent-paprika"
                      />
                      <span className="text-sm text-charcoal/80">
                        Show on the live site
                      </span>
                    </label>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <p className="text-sm text-charcoal/50">
                  No products yet. Click “Add product” to create one.
                </p>
              )}
            </div>
          </section>

          <p className="text-xs text-charcoal/40">
            Changes are only stored once you press <strong>Save changes</strong>.
          </p>
        </div>

        {/* ---- Live preview column ---- */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
              Live preview
            </span>
            <span className="text-xs text-charcoal/40">
              {previewProducts.length} shown ·{" "}
              {products.length - previewProducts.length} hidden
            </span>
          </div>
          <div className="rounded-xl overflow-hidden border border-charcoal/15 shadow-md bg-cream max-h-[80vh] overflow-y-auto">
            <Hero config={config} />
            <Products products={previewProducts} config={config} />
            <About config={config} />
            <Footer config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
