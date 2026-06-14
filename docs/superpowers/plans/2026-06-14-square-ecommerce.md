# Square Ecommerce Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Warriors Blood Coffee's React/Vite site into a full ecommerce experience using Square's hosted checkout and live inventory API, deployed on Vercel.

**Architecture:** Vercel serverless functions in `api/` proxy all Square API calls server-side (keeping the secret token hidden). The frontend fetches live product availability from `/api/catalog` on page load and sends cart items to `/api/checkout` which returns a Square-hosted payment URL. The browser then redirects the customer to Square's payment page.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, React Router v7, Square REST API (no SDK — raw fetch), Vercel serverless functions (Node.js runtime)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `vercel.json` | Create | Vercel build config |
| `src/products.js` | Create | Single source of truth: all 6 products with Square IDs + site metadata |
| `api/catalog.js` | Create | Vercel fn: fetch live inventory from Square, return `{ availability }` |
| `api/checkout.js` | Create | Vercel fn: accept cart, create Square payment link, return `{ url }` |
| `src/hooks/useAvailability.js` | Create | Reusable hook: fetches `/api/catalog`, returns availability map |
| `src/pages/Products.jsx` | Rewrite | Updated card design, 6 products, live sold-out state |
| `src/components/TopSellers.jsx` | Rewrite | All 6 products, live sold-out state |
| `src/pages/Checkout.jsx` | Modify | Wire "Continue to Payment" → `/api/checkout` → redirect |
| `src/pages/PaymentSuccess.jsx` | Create | Premium post-payment confirmation page |
| `src/App.jsx` | Modify | Add `/payment-success` route |

---

## Task 1: Vercel Config + Local Dev Setup

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "vite --port $PORT"
}
```

- [ ] **Step 2: Install Vercel CLI globally**

```bash
npm i -g vercel
```

- [ ] **Step 3: Verify `.env` has the right variable names**

Open `.env` and confirm it contains exactly:
```
SQUARE_ACCESS_TOKEN=EAAAl1jMBTjUr8ef0ePmDu-ZRwsYQLIAJipnCfC-FWVnlND5Ms_w2Crp8nE21z8P
SQUARE_LOCATION_ID=08EM3HASYEJDJ
```
(The sandbox token has been removed — production only.)

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel config"
```

---

## Task 2: Create `src/products.js` — Shared Product Catalog

**Files:**
- Create: `src/products.js`

This is the single source of truth for all product data. Square IDs here are real values pulled from the live account.

- [ ] **Step 1: Create `src/products.js`**

```js
import tuskBoneImage from "./assets/images/TuskandBones.png";
import desertRatImage from "./assets/images/DesertRat.png";
import warriorsCoffeeImage from "./assets/images/WarriorsCoffee.png";
import firstLightImage from "./assets/images/FirstLightCoffee.png";
import ravenVIIImage from "./assets/images/RavenVII.png";
import smokeAndGunpowderImage from "./assets/images/SmokeAndGunpowder.png";

export const products = [
  {
    variationId: "MOZN2I2EDY4GTVAQLX5RCED7",
    name: "Tusk & Bone",
    price: "$15.00",
    image: tuskBoneImage,
    roast: "Medium Dark Roast",
    roastIntensity: 5,
    tagline: "Bold. Relentless. Unapologetic.",
    flavorNotes: ["Dark", "Smoky", "Bold", "Earthy"],
    bestFor: "Those who want maximum strength and intensity",
    description: [
      "Tusk & Bone is our darkest, most intense roast — crafted for those who charge first and never look back. Deep, smoky, and full-bodied with a fierce finish that leaves a lasting impression.",
      "This is coffee for leaders, warriors, and anyone who refuses to quit.",
    ],
  },
  {
    variationId: "RMQJE4D2ADVMF352WH42QKOH",
    name: "Desert Rat",
    price: "$15.00",
    image: desertRatImage,
    roast: "Medium-Dark Roast",
    roastIntensity: 4,
    tagline: "Gritty. Rugged. Battle-Tested.",
    flavorNotes: ["Smoky", "Earthy", "Robust", "Dry"],
    bestFor: "Those who thrive under pressure and harsh conditions",
    description: [
      "Desert Rat is forged for the relentless — a medium-dark roast with a smoky, earthy profile that mirrors the determination of those who endure.",
      "Built for those who thrive in harsh conditions and never back down from a challenge.",
    ],
  },
  {
    variationId: "2LJWLMGJSY3X6FFODGWGN5HP",
    name: "WBCC Dark Roast",
    price: "$15.00",
    image: warriorsCoffeeImage,
    roast: "Dark Roast",
    roastIntensity: 4,
    tagline: "Forged in Honor. Roasted with Purpose.",
    flavorNotes: ["Rich", "Deep", "Dark", "Full-Body"],
    bestFor: "Those who demand consistency and commanding flavor",
    description: [
      "Our signature dark roast — deep, intense, and unyielding. The standard bearer of Warriors Blood Coffee Company.",
      "A cup that commands respect from the first sip to the last.",
    ],
  },
  {
    variationId: "VIKVABR77RXMD6IQS4NDTONQ",
    name: "First Light",
    price: "$15.00",
    image: firstLightImage,
    roast: "Medium Roast",
    roastIntensity: 3,
    tagline: "Rise Early. Strike Hard. Stay Sharp.",
    flavorNotes: ["Caramel", "Golden", "Smooth", "Bright"],
    bestFor: "Early risers who need clarity and focus at dawn",
    description: [
      "A smooth medium roast with bright, golden notes of caramel and toasted grain. The perfect start to your mission.",
      "Smooth enough for the early hours, strong enough to carry you through the day.",
    ],
  },
  {
    variationId: "ZWR3QO3JQESLKPA63UUNSJZ4",
    name: "Raven VII",
    price: "$15.00",
    image: ravenVIIImage,
    roast: "Medium Roast",
    roastIntensity: 3,
    tagline: "Silent. Precise. Lethal.",
    flavorNotes: ["Dark Cherry", "Cocoa", "Smooth", "Clean"],
    bestFor: "Those who operate in the shadows and strike with precision",
    description: [
      "Raven VII is a smooth Brazilian medium roast with a clean, dark finish — crafted for those who move with intent and leave nothing to chance.",
      "Seven iterations. One perfect cup. Intelligence-grade coffee for the disciplined operator.",
    ],
  },
  {
    variationId: "BHR2BFOSEXZLCFMW53TE7GV4",
    name: "Smoke & Gunpowder",
    price: "$15.00",
    image: smokeAndGunpowderImage,
    roast: "Medium Roast",
    roastIntensity: 3,
    tagline: "Born in Battle. Brewed for War.",
    flavorNotes: ["Smoky", "Rich", "Spiced", "Bold"],
    bestFor: "Those who live for the heat of the moment",
    description: [
      "Smoke & Gunpowder is a Colombian medium roast that hits hard from the first sip — rich and spiced with a smoky depth that lingers like the aftermath of a firefight.",
      "Not for the faint of heart. This is coffee for those who charge into the unknown.",
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/products.js
git commit -m "feat: add shared product catalog with Square IDs"
```

---

## Task 3: Create `api/catalog.js` — Square Inventory Endpoint

**Files:**
- Create: `api/catalog.js`

Fetches live inventory from Square for all 6 product variations and returns availability per `variationId`.

- [ ] **Step 1: Create `api/catalog.js`**

```js
const VARIATION_IDS = [
  "MOZN2I2EDY4GTVAQLX5RCED7", // Tusk & Bone
  "RMQJE4D2ADVMF352WH42QKOH", // Desert Rat
  "2LJWLMGJSY3X6FFODGWGN5HP", // WBCC Dark Roast
  "VIKVABR77RXMD6IQS4NDTONQ", // First Light
  "ZWR3QO3JQESLKPA63UUNSJZ4", // Raven VII
  "BHR2BFOSEXZLCFMW53TE7GV4", // Smoke & Gunpowder
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!token || !locationId) {
    return res.status(500).json({ error: "Square credentials not configured" });
  }

  const response = await fetch(
    "https://connect.squareup.com/v2/inventory/counts/batch-retrieve",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2024-01-18",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catalog_object_ids: VARIATION_IDS,
        location_ids: [locationId],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(502).json({ error: "Square API error" });
  }

  // Sum IN_STOCK quantities per variation (Square may return multiple entries)
  const stockMap = {};
  for (const count of data.counts || []) {
    if (count.state === "IN_STOCK") {
      stockMap[count.catalog_object_id] =
        (stockMap[count.catalog_object_id] || 0) + parseFloat(count.quantity || "0");
    }
  }

  const availability = VARIATION_IDS.map((id) => ({
    variationId: id,
    quantity: stockMap[id] || 0,
    inStock: (stockMap[id] || 0) > 0,
  }));

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  return res.status(200).json({ availability });
}
```

- [ ] **Step 2: Start Vercel dev server and test the endpoint**

```bash
vercel dev
```

In a separate terminal:
```bash
curl http://localhost:3000/api/catalog
```

Expected response shape:
```json
{
  "availability": [
    { "variationId": "MOZN2I2EDY4GTVAQLX5RCED7", "quantity": 9, "inStock": true },
    { "variationId": "RMQJE4D2ADVMF352WH42QKOH", "quantity": 0, "inStock": false },
    ...
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add api/catalog.js
git commit -m "feat: add Square inventory API endpoint"
```

---

## Task 4: Create `api/checkout.js` — Square Payment Link Endpoint

**Files:**
- Create: `api/checkout.js`

Accepts cart items (each with a `variationId` and `quantity`), creates a Square hosted payment link, and returns the URL.

- [ ] **Step 1: Create `api/checkout.js`**

```js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!token || !locationId) {
    return res.status(500).json({ error: "Square credentials not configured" });
  }

  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const lineItems = cartItems.map((item) => ({
    quantity: String(item.quantity),
    catalog_object_id: item.variationId,
  }));

  const origin = req.headers.origin || req.headers.host
    ? `https://${req.headers.host}`
    : "https://warriorsbloodcoffee.com";

  const response = await fetch(
    "https://connect.squareup.com/v2/online-checkout/payment-links",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2024-01-18",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        order: {
          location_id: locationId,
          line_items: lineItems,
        },
        checkout_options: {
          redirect_url: `${origin}/payment-success`,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || data.errors) {
    const message = data.errors?.[0]?.detail || "Failed to create checkout";
    return res.status(502).json({ error: message });
  }

  return res.status(200).json({ url: data.payment_link.url });
}
```

- [ ] **Step 2: Test the endpoint with a sample cart (vercel dev must be running)**

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"cartItems":[{"variationId":"MOZN2I2EDY4GTVAQLX5RCED7","quantity":1}]}'
```

Expected: `{ "url": "https://square.link/u/..." }`

- [ ] **Step 3: Commit**

```bash
git add api/checkout.js
git commit -m "feat: add Square payment link API endpoint"
```

---

## Task 5: Create `src/hooks/useAvailability.js`

**Files:**
- Create: `src/hooks/useAvailability.js`

Shared hook used by both `Products.jsx` and `TopSellers.jsx`. Fetches `/api/catalog` once and returns a map of `variationId → { quantity, inStock }`.

- [ ] **Step 1: Create `src/hooks/useAvailability.js`**

```js
import { useState, useEffect } from "react";

export function useAvailability() {
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        for (const item of data.availability || []) {
          map[item.variationId] = item;
        }
        setAvailability(map);
      })
      .catch(() => {
        // On error, treat all products as in-stock so the site stays usable
      })
      .finally(() => setLoading(false));
  }, []);

  return { availability, loading };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useAvailability.js
git commit -m "feat: add useAvailability hook"
```

---

## Task 6: Rewrite `src/pages/Products.jsx`

**Files:**
- Modify: `src/pages/Products.jsx`

Replace the hardcoded product array with `src/products.js`. Add `useAvailability()`. Update card design: shorter cards, centered price + 12oz label + availability badge. Add sold-out state to cards and modal.

- [ ] **Step 1: Replace `src/pages/Products.jsx` entirely**

```jsx
import { useState } from "react";
import { ShoppingCart, X, Flame, Coffee, Shield } from "lucide-react";
import { products } from "../products";
import { useAvailability } from "../hooks/useAvailability";

function RoastMeter({ intensity, total = 5 }) {
  return (
    <div className="flex gap-1.5 mt-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-5 h-2 rounded-full transition-colors ${
            i < intensity ? "bg-brandGold" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function ProductModal({ product, inStock, onClose, onAddToCart }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0e0c0a] border border-brandGold/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

          <div className="relative md:w-2/5 flex items-center justify-center p-8 shrink-0">
            <div className="absolute inset-0 bg-linear-to-b from-[#5c3a1e] via-[#3b2210] to-[#1a0e06]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(197,160,89,0.35)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(139,90,43,0.25)_0%,transparent_60%)]" />
            <img
              src={product.image}
              alt={product.name}
              className={`relative z-10 w-full max-w-60 md:max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${!inStock ? "opacity-60" : ""}`}
            />
            {!inStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-black/70 border border-white/20 rounded-2xl px-6 py-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Sold Out</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-7 md:p-9">

            <h2 className="font-heading text-3xl md:text-4xl uppercase gold-gradient-text leading-tight mb-2">
              {product.name}
            </h2>
            <p className="text-brandGold font-bold uppercase tracking-[0.15em] text-sm mb-5">
              {product.tagline}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-brandGold/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-brandGold/60" />
              <div className="flex-1 h-px bg-brandGold/30" />
            </div>

            <div className="space-y-3 mb-7">
              {product.description.map((para, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed font-serif">
                  {para}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Coffee size={20} className="text-brandGold mb-2" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Flavor Notes</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {product.flavorNotes.slice(0, 2).join(" • ")}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {product.flavorNotes.slice(2).join(" • ")}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Flame size={20} className="text-brandGold mb-2" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Roast Level</p>
                <p className="text-xs text-gray-300 mb-1">{product.roast}</p>
                <RoastMeter intensity={product.roastIntensity} />
              </div>
            </div>

            <div className="flex items-start gap-4 bg-brandGold/5 border border-brandGold/20 rounded-2xl p-4">
              <Shield size={20} className="text-brandGold shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-1">
                  Roasted Fresh. Built with Purpose.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every bag is roasted in small batches to ensure quality, flavor, and consistency — from our roaster to your cup.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="shrink-0 p-4 border-t border-white/10 bg-[#090807]">
          <button
            onClick={() => { if (inStock) { onAddToCart(product); onClose(); } }}
            disabled={!inStock}
            className={`
              w-full py-4 rounded-full flex items-center justify-center gap-3
              font-bold uppercase tracking-[0.25em] text-sm
              transition-all duration-500
              ${inStock
                ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:shadow-[0_0_35px_rgba(197,160,89,0.5)]"
                : "bg-white/5 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart size={18} />
            {inStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Products({ addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { availability, loading } = useAvailability();

  function getStock(variationId) {
    return availability[variationId] ?? { inStock: true, quantity: 0 };
  }

  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
            Handcrafted Roasts
          </p>
          <div className="flex items-center justify-center space-x-6 mb-4">
            <span className="text-brandGold text-2xl">★</span>
            <h1 className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase gold-gradient-text">
              Coffee Roasts
            </h1>
            <span className="text-brandGold text-2xl">★</span>
          </div>
          <p className="text-gray-400 font-serif italic max-w-xl mx-auto">
            Each roast is crafted with precision, sourced with integrity, and
            roasted to honor those who serve.
          </p>
          <div className="mt-6 w-24 h-px bg-brandGold/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { inStock } = getStock(product.variationId);

            return (
              <div
                key={product.variationId}
                className={`
                  group flex flex-col
                  bg-[#111111]
                  border rounded-3xl overflow-hidden
                  transition-all duration-300
                  ${inStock
                    ? "border-white/10 hover:border-brandGold/30 hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]"
                    : "border-white/5 opacity-80"
                  }
                `}
              >
                {/* Card Header */}
                <div className="px-6 pt-4 pb-2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brandGold/60 mb-1">
                    {product.roast}
                  </p>
                  <h2 className="font-heading text-xl tracking-widest uppercase">
                    {product.name}
                  </h2>
                </div>

                {/* Product Image */}
                <div className="relative mx-6 my-2 aspect-[5/6] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-linear-to-b from-[#c48a3a] via-[#3b2210] to-[#080402]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(240,190,100,0.3)_0%,transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_90%,rgba(20,8,2,0.6)_0%,transparent_60%)]" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 ${inStock ? "group-hover:scale-105" : "opacity-50"}`}
                  />
                  <div className="absolute inset-0 bg-brandGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {!inStock && (
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/80 border border-white/15 rounded-full">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Price + 12oz + Availability */}
                <div className="px-6 pb-2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">12oz</p>
                  <p className="text-brandGold font-bold text-lg mb-1">{product.price}</p>
                  {loading ? (
                    <div className="h-3 w-16 bg-white/5 rounded-full mx-auto animate-pulse" />
                  ) : inStock ? (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brandGold/70">
                      ● In Stock
                    </p>
                  ) : (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                      Sold Out
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="px-6 pb-5 mt-auto flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="
                      w-full py-3 rounded-full
                      text-brandGold hover:text-white!
                      border border-[#d4b06a]/40 hover:border-brandGold
                      hover:bg-brandGold/10
                      font-bold uppercase text-xs tracking-[0.2em]
                      transition-all duration-500
                      cursor-pointer
                      hover:scale-[1.02]
                      hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]
                      backdrop-blur-sm
                    "
                  >
                    Description
                  </button>

                  <button
                    onClick={() => inStock && addToCart(product)}
                    disabled={!inStock}
                    className={`
                      w-full py-3 rounded-full
                      font-bold uppercase text-xs tracking-[0.2em]
                      transition-all duration-500
                      border backdrop-blur-sm
                      ${inStock
                        ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] border-[#d4b06a]/40"
                        : "bg-white/5 text-gray-500 cursor-not-allowed border-white/10"
                      }
                    `}
                  >
                    {inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          inStock={getStock(selectedProduct.variationId).inStock}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser (`vercel dev`)**

Navigate to `http://localhost:3000/products`. Confirm:
- All 6 products appear
- Cards are noticeably shorter than before
- Price, "12oz", and availability are centered below each image
- Desert Rat, WBCC Dark Roast, and Smoke & Gunpowder show "Sold Out" (they had 0 stock)
- Sold out products have a disabled grey button and "Sold Out" pill on the image

- [ ] **Step 3: Commit**

```bash
git add src/pages/Products.jsx
git commit -m "feat: update Products page with live Square data, sold-out UI, and 6 products"
```

---

## Task 7: Rewrite `src/components/TopSellers.jsx`

**Files:**
- Modify: `src/components/TopSellers.jsx`

Replace hardcoded products with `src/products.js`. Add `useAvailability()`. Show all 6 products in a 3-column grid. Apply sold-out badge and disabled button.

- [ ] **Step 1: Replace `src/components/TopSellers.jsx` entirely**

```jsx
import { Link } from "react-router-dom";
import { products } from "../products";
import { useAvailability } from "../hooks/useAvailability";

function TopSellers({ addToCart }) {
  const { availability, loading } = useAvailability();

  function getStock(variationId) {
    return availability[variationId] ?? { inStock: true };
  }

  return (
    <section className="relative py-24 bg-brandDark" id="shop">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <span className="text-brandGold text-2xl">★</span>
            <h2 className="font-heading text-4xl tracking-[0.3em] uppercase">
              Top Sellers
            </h2>
            <span className="text-brandGold text-2xl">★</span>
          </div>
          <p className="text-gray-400 font-serif italic">
            Our most loved roasts, chosen by our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { inStock } = getStock(product.variationId);

            return (
              <div key={product.variationId} className="group flex flex-col items-center">

                {/* Image with sold-out badge */}
                <div className="relative w-full aspect-3/4 mb-6 p-4 gold-border bg-brandBlack flex items-center justify-center overflow-hidden">
                  <img
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-500 ${inStock ? "group-hover:scale-105" : "opacity-50"}`}
                    src={product.image}
                  />
                  <div className="absolute inset-0 bg-brandGold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {!inStock && (
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-black/80 border border-white/15 rounded-full">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Sold Out</span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-lg tracking-widest mb-1">{product.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-0.5">12oz</p>
                <p className="text-brandGold font-bold mb-1">{product.price}</p>

                {/* Availability */}
                {loading ? (
                  <div className="h-3 w-16 bg-white/5 rounded-full mb-4 animate-pulse" />
                ) : inStock ? (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brandGold/70 mb-4">● In Stock</p>
                ) : (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-4">Sold Out</p>
                )}

                <button
                  onClick={() => inStock && addToCart(product)}
                  disabled={!inStock}
                  className={`
                    w-full py-3 rounded-full
                    font-bold uppercase text-xs tracking-[0.2em]
                    transition-all duration-500
                    border backdrop-blur-sm
                    ${inStock
                      ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] border-[#d4b06a]/40"
                      : "bg-white/5 text-gray-500 cursor-not-allowed border-white/10"
                    }
                  `}
                >
                  {inStock ? "Add to Cart" : "Sold Out"}
                </button>

              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="
              group relative inline-flex items-center justify-center overflow-hidden
              px-14 py-4 rounded-full font-bold uppercase tracking-[0.25em] text-white
              border border-[#c5a059]/40
              bg-linear-to-r from-[#2a1810] via-[#5c3a21] to-[#c5a059]
              transition-all duration-500
              hover:scale-105 hover:shadow-[0_0_35px_rgba(197,160,89,0.45)] hover:-translate-y-1
              backdrop-blur-sm
            "
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10 flex items-center gap-3">
              Explore All Roasts
              <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

export default TopSellers;
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000`. Confirm:
- Home page Top Sellers section shows all 6 products in a 3-column grid
- Sold-out products show grey disabled button and badge
- "12oz" and availability appear under each price

- [ ] **Step 3: Commit**

```bash
git add src/components/TopSellers.jsx
git commit -m "feat: update TopSellers with all 6 products, live availability"
```

---

## Task 8: Update `src/pages/Checkout.jsx` — Wire Payment Button

**Files:**
- Modify: `src/pages/Checkout.jsx`

Add loading state and click handler to "Continue to Payment" button. On click: POST cart to `/api/checkout`, get back a Square URL, redirect.

- [ ] **Step 1: Add `useState` import and payment handler to `Checkout.jsx`**

Replace the entire file:

```jsx
import { useState } from "react";
import QuantityStepper from "../components/QuantityStepper";

export default function Checkout({ cartItems, addToCart, removeFromCart, removeAllOfItem }) {
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState(null);

  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price.replace("$", "")) * item.quantity;
  }, 0);

  async function handlePayment() {
    setPaying(true);
    setPayError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setPayError(err.message);
      setPaying(false);
    }
  }

  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden text-white">
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.09)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.06)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.05)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-4">

        <div className="mb-14">
          <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">Secure Checkout</p>
          <h1 className="font-heading text-5xl md:text-6xl uppercase mb-4">Checkout</h1>
          <p className="text-gray-400 max-w-xl">Review your order before continuing to payment.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-14 text-center">
            <div className="text-5xl mb-6">🛒</div>
            <h2 className="font-heading text-3xl mb-4">Your cart is empty</h2>
            <p className="text-gray-400">Add coffee products before checking out.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-[1.5fr_0.5fr_0.5fr] text-xs uppercase tracking-[0.2em] text-gray-500 border-b border-white/10 pb-4 mb-4 px-2">
                <span>Product</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => {
                  const itemTotal = Number(item.price.replace("$", "")) * item.quantity;
                  return (
                    <div
                      key={item.name}
                      className="bg-[#111111] border border-white/10 rounded-3xl p-5 transition-all duration-300 hover:border-brandGold/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr_0.5fr] items-center gap-6">
                        <div className="flex items-center gap-5">
                          <div className="bg-black/40 rounded-2xl p-3">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                          </div>
                          <div>
                            <h3 className="font-heading tracking-widest text-lg">{item.name}</h3>
                            <p className="text-brandGold font-bold mt-1">{item.price}</p>
                            <button
                              onClick={() => removeAllOfItem(item.name)}
                              className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-brandRed transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <QuantityStepper
                            quantity={item.quantity}
                            onIncrement={() => addToCart(item, { silent: true })}
                            onDecrement={() => removeFromCart(item.name)}
                          />
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-brandGold">${itemTotal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="bg-[#111111] border border-brandGold/20 rounded-3xl p-7 h-fit sticky top-28">
              <h2 className="font-heading text-2xl mb-8">Order Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold text-brandGold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping & Taxes</span>
                  <span className="text-gray-300">Calculated at payment</span>
                </div>
                <div className="border-t border-white/10 pt-5 flex justify-between">
                  <span className="font-bold uppercase tracking-[0.2em] text-sm">Estimated Total</span>
                  <span className="font-bold text-2xl text-brandGold">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {payError && (
                <p className="mt-4 text-xs text-red-400 text-center leading-relaxed">{payError}</p>
              )}

              <button
                onClick={handlePayment}
                disabled={paying}
                className={`
                  w-full mt-8 rounded-full py-4
                  font-bold uppercase tracking-[0.2em] text-xs
                  transition-all duration-500
                  ${paying
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(197,160,89,0.45)] cursor-pointer"
                  }
                `}
              >
                {paying ? "Redirecting to payment…" : "Continue to Payment"}
              </button>

              <p className="text-[11px] text-gray-500 text-center mt-5 leading-relaxed">
                Secure checkout powered by Square
              </p>
            </aside>

          </div>
        )}
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

Add a product to cart, go to `/checkout`, click "Continue to Payment". Confirm:
- Button shows "Redirecting to payment…" while loading
- Browser redirects to a `square.link` URL
- After completing (or cancelling) payment on Square's page, Square redirects to `/payment-success` (which doesn't exist yet — that's Task 9)

- [ ] **Step 3: Commit**

```bash
git add src/pages/Checkout.jsx
git commit -m "feat: wire checkout to Square payment link API"
```

---

## Task 9: Create `src/pages/PaymentSuccess.jsx`

**Files:**
- Create: `src/pages/PaymentSuccess.jsx`

Premium post-payment confirmation page. Matches the gradient style of `Products.jsx`. Dark background, gold radial glows, heading font, warrior brand voice.

- [ ] **Step 1: Create `src/pages/PaymentSuccess.jsx`**

```jsx
import { Link } from "react-router-dom";
import { Shield, Coffee } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
      {/* Background gradients — same as Products page */}
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.22)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-2xl mx-auto px-4 text-center">

        {/* Shield icon */}
        <div className="w-20 h-20 mx-auto mb-10 rounded-full border border-brandGold/30 flex items-center justify-center bg-brandGold/5 shadow-[0_0_40px_rgba(197,160,89,0.15)]">
          <Shield size={36} className="text-brandGold" />
        </div>

        {/* Pre-title */}
        <p className="text-brandGold uppercase tracking-[0.35em] text-xs mb-5">
          Mission Complete
        </p>

        {/* Heading */}
        <div className="flex items-center justify-center space-x-5 mb-6">
          <span className="text-brandGold text-2xl">★</span>
          <h1 className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase gold-gradient-text leading-tight">
            Order Confirmed
          </h1>
          <span className="text-brandGold text-2xl">★</span>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-20 h-px bg-brandGold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-brandGold/60" />
          <div className="w-20 h-px bg-brandGold/30" />
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-gray-300 text-xl mb-4 leading-relaxed">
          Your mission is complete.
        </p>

        {/* Body */}
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
          Your order has been received and is being prepared with care.
          A confirmation email is on its way. The coffee will follow.
        </p>

        {/* Callout card */}
        <div className="flex items-start gap-4 bg-brandGold/5 border border-brandGold/20 rounded-2xl p-5 mb-12 text-left">
          <Coffee size={20} className="text-brandGold shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-1">
              Roasted Fresh. Shipped with Honor.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every bag ships directly from our roastery. Expect your order within 3–7 business days.
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              px-10 py-4 rounded-full
              bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
              hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
              text-black hover:text-white
              font-bold uppercase tracking-[0.25em] text-xs
              transition-all duration-500
              hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)]
              border border-[#d4b06a]/40
            "
          >
            Return to Base
          </Link>

          <Link
            to="/products"
            className="
              inline-flex items-center justify-center
              px-10 py-4 rounded-full
              text-brandGold hover:text-white
              border border-brandGold/40 hover:border-brandGold
              hover:bg-brandGold/10
              font-bold uppercase tracking-[0.25em] text-xs
              transition-all duration-500
              hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]
            "
          >
            Explore More Roasts
          </Link>
        </div>

      </section>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/PaymentSuccess.jsx
git commit -m "feat: add premium payment success page"
```

---

## Task 10: Update `src/App.jsx` — Add `/payment-success` Route

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add the import and route to `src/App.jsx`**

Add import at the top (after the existing page imports):
```jsx
import PaymentSuccess from "./pages/PaymentSuccess";
```

Add route inside `<Routes>` (after the `/contact` route):
```jsx
<Route path="/payment-success" element={<PaymentSuccess />} />
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3000/payment-success`. Confirm the premium page renders correctly with the gold gradient, Shield icon, "Order Confirmed" heading, and both CTA buttons.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /payment-success route"
```

---

## Task 11: End-to-End Verification

- [ ] **Step 1: Run `vercel dev` and confirm all pages load**

```bash
vercel dev
```

Check:
- `/` — Home loads, Top Sellers shows 6 products with availability badges
- `/products` — Products page shows all 6, shorter cards, centered price + 12oz + availability
- `/checkout` — Cart items show, "Continue to Payment" button is present

- [ ] **Step 2: Full purchase flow test (use a real product in stock)**

1. Go to `/products`
2. Click "Add to Cart" on "Tusk & Bone" (quantity: 9 in stock)
3. Open cart, go to `/checkout`
4. Confirm item appears with price and quantity stepper
5. Click "Continue to Payment"
6. Confirm redirect to Square's hosted checkout page
7. Complete a test purchase (or cancel)
8. Confirm redirect back to `/payment-success`
9. Confirm success page looks correct

- [ ] **Step 3: Verify sold-out products**

1. Go to `/products`
2. Confirm Desert Rat, WBCC Dark Roast, Smoke & Gunpowder show "Sold Out" pill on image and disabled grey button
3. Confirm clicking the disabled button does nothing

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Square ecommerce integration complete"
```

---

## Deployment Checklist (Vercel)

Before going live, complete these steps in the Vercel dashboard:

1. Import the GitHub repo into Vercel
2. Add environment variables:
   - `SQUARE_ACCESS_TOKEN` = production token from `.env`
   - `SQUARE_LOCATION_ID` = `08EM3HASYEJDJ`
3. Deploy — Vercel auto-detects Vite and builds the `dist/` folder
4. Confirm `api/catalog` and `api/checkout` work on the live URL
