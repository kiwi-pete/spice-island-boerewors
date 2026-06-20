import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { getAdminContent } from "@/lib/content";
import PinGate from "./PinGate";
import AdminEditor from "./AdminEditor";

// Keep this screen out of search engines.
export const metadata: Metadata = {
  title: "Admin — Spice Island Boerewors",
  robots: { index: false, follow: false },
};

// Always evaluate auth and load the latest content on each request.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <PinGate />;
  }

  const { config, products } = await getAdminContent();
  return <AdminEditor initialConfig={config} initialProducts={products} />;
}
