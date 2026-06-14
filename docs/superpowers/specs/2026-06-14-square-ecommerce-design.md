# Square Ecommerce Integration — Design Spec
**Date:** 2026-06-14  
**Project:** Warriors Blood Coffee Company  
**Status:** Approved

---

## Overview

Wire the existing Warriors Blood Coffee React/Vite site into a full ecommerce experience using Square. Products and inventory are fetched live from the Square catalog so sold-out status is always accurate. Payment is handled via Square's hosted checkout (customer is redirected to Square's payment page, then returned to a premium confirmation page on the site). The site is deployed on Vercel.

---

## Architecture

```
Warriors Blood Coffee (Vercel)
├── React SPA (Vite) — frontend
└── api/
    ├── catalog.js    — Vercel serverless function: Square catalog + inventory
    └── checkout.js   — Vercel serverless function: Square hosted payment link
```

**Why Vercel serverless functions:** The Square access token must never be exposed in the browser. All Square API calls are proxied through `api/` functions that run server-side on Vercel. The frontend only calls these internal endpoints.

---

## Square Catalog Mapping

All 6 products are already set up in Square. Inventory tracking is enabled on all of them.

| Site Name | Square Item Name | Square Item ID | Square Variation ID |
|---|---|---|---|
| Tusk & Bone | Tusk and Bone Medium Dark Roast (Brazilian) | WZXQNADP4C5GTV4YUEGIG3EM | MOZN2I2EDY4GTVAQLX5RCED7 |
| Desert Rat | Desert Rat Medium-Dark Roast (Colombian) | P6TZDFRDLP3SP7TWWWBWSZUI | RMQJE4D2ADVMF352WH42QKOH |
| WBCC Dark Roast | Warriors Blood Dark Roast (Colombian) | 3YD6RWHTMVWHTEG4OXFOKHRE | 2LJWLMGJSY3X6FFODGWGN5HP |
| First Light | First Light (Brazilian) | URA4ON37ZXK4W3A2MCU7565E | VIKVABR77RXMD6IQS4NDTONQ |
| Raven VII | Raven VII (Brazilian) | PN3C6QN4XXHXTEYY37FUPH7P | ZWR3QO3JQESLKPA63UUNSJZ4 |
| Smoke & Gunpowder | Smoke and Gunpowder Act 2 Medium Roast (Colombian) | H4W5E4VIPVO44ZGRE5ACO5F6 | BHR2BFOSEXZLCFMW53TE7GV4 |

**Location ID:** 08EM3HASYEJDJ

---

## Data Flow

### Page Load (Product Availability)
1. Frontend calls `GET /api/catalog`
2. `api/catalog.js` calls Square Catalog API + Inventory API server-side
3. Returns array of `{ variationId, quantity }` inventory counts
4. Frontend merges with local product metadata (tagline, description, flavor notes, images)
5. Products with `quantity <= 0` are marked `inStock: false`

### Add to Cart
No changes to existing cart logic. Cart is React state in `App.jsx`. Sold-out products simply have their "Add to Cart" button disabled.

### Checkout → Payment
1. Customer reviews cart on `/checkout`
2. Customer clicks "Continue to Payment"
3. Frontend posts `{ cartItems }` to `POST /api/checkout`
4. `api/checkout.js` calls Square's Payment Links API (`POST /v2/online-checkout/payment-links`) with line items built from cart
5. Returns `{ url }` — the Square-hosted checkout URL
6. Frontend redirects browser to that URL
7. Customer completes payment on Square's hosted page
8. Square redirects to `https://[site]/payment-success`

---

## Sold Out UI

- **Product card:** "SOLD OUT" badge overlaid on product image (top-right, gold border, dark background). "Add to Cart" button replaced with a disabled greyed-out "Sold Out" button.
- **Product modal:** "Add to Cart" footer button disabled with "Sold Out" label.
- **TopSellers component:** Same badge and disabled button treatment.
- **Cart/Checkout:** Items already in cart are not removed if stock depletes — Square will handle rejection at payment time.

---

## New Products Added to Site

Two products are in Square but not yet on the site:

| Product | Image File |
|---|---|
| Raven VII | `src/assets/images/RavenVII.png` |
| Smoke & Gunpowder | `src/assets/images/SmokeAndGunpowder.png` |

Both need full product metadata added to `src/products.js` (tagline, description, flavor notes, roast level, roast intensity).

---

## Payment Success Page (`/payment-success`)

Matches the visual style of `Products.jsx` — dark background, gold radial gradient overlays, heading font with wide tracking.

**Layout:**
- Top: gold radial glow gradient (same as product page header)
- Center: star dividers + "ORDER CONFIRMED" in gold gradient heading font
- Tagline: italic serif — "Your mission is complete."
- Body: brief confirmation copy + "Your coffee ships soon."
- Two buttons: "RETURN TO BASE" (gold gradient → `/`) and "EXPLORE MORE ROASTS" (outline → `/products`)
- Bottom: dark fade gradient

**No order details displayed** — Square does not pass order data in the redirect URL by default. The owner manages orders from the Square dashboard.

---

## Environment Variables

Stored in `.env` (gitignored). On Vercel, set these in the project's Environment Variables dashboard:

```
SQUARE_ACCESS_TOKEN=<production token>
SQUARE_LOCATION_ID=08EM3HASYEJDJ
```

The sandbox token is not used in the Vercel deployment — the owner's Square account is production only.

---

## Files Created / Modified

| File | Action | Purpose |
|---|---|---|
| `api/catalog.js` | Create | Vercel serverless: fetch Square catalog + inventory |
| `api/checkout.js` | Create | Vercel serverless: create Square payment link |
| `src/products.js` | Create | Shared product data: Square IDs + site metadata for all 6 products |
| `src/pages/Products.jsx` | Modify | Fetch live data, sold out UI, add Raven VII + Smoke & Gunpowder |
| `src/components/TopSellers.jsx` | Modify | Fetch live data, sold out UI |
| `src/pages/Checkout.jsx` | Modify | Wire "Continue to Payment" to `/api/checkout`, handle redirect |
| `src/pages/PaymentSuccess.jsx` | Create | Premium post-payment confirmation page |
| `src/App.jsx` | Modify | Add `/payment-success` route |
| `vercel.json` | Create | Vercel build + output config for Vite |

---

## Out of Scope

- Order confirmation emails (handled by Square automatically)
- Inventory management UI (owner uses Square dashboard)
- Customer accounts / order history
- Discount codes
- Product variants (all products are single SKU at $15.00)
- Merchandise items (hat, flag) — coffee products only for this build
