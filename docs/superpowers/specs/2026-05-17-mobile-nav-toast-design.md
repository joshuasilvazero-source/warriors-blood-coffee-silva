# Mobile Nav Fix + Cart Toast Design

**Date:** 2026-05-17

## Goal

Two independent UI improvements:
1. Show "Warriors Blood Coffee" on mobile navbar (currently shows "Warriors Blood")
2. Show a toast notification when a product is added to the cart

## Fix 1: Mobile Navbar Text

**File:** `src/components/Navbar.jsx`

**Current code:**
```jsx
<h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
  Warriors <span className="text-brandRed">Blood</span>{" "}
  <span className="hidden md:inline">Coffee Company</span>
</h1>
```

**Problem:** `hidden md:inline` hides "Coffee Company" entirely on mobile, leaving only "Warriors Blood".

**Fix:** Split "Coffee Company" into "Coffee" (always visible) and " Company" (desktop only):
```jsx
<h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
  Warriors <span className="text-brandRed">Blood</span>{" "}
  Coffee<span className="hidden md:inline"> Company</span>
</h1>
```

**Result:**
- Mobile: `Warriors Blood Coffee`
- Desktop: `Warriors Blood Coffee Company`

## Fix 2: Cart Toast Notification

### Behavior

- Triggered every time `addToCart` is called
- Shows the product name: `✓ {productName} added to cart`
- Slides in from top-right
- Auto-dismisses after 2.5 seconds
- If user adds another item while toast is visible, it resets (restarts timer, updates name)
- Only one toast visible at a time

### Architecture

**State in `App.jsx`:**
```js
const [cartToast, setCartToast] = useState(null); // null | string (product name)
```

**`addToCart` modification:**
```js
function addToCart(product) {
  // existing cart logic unchanged
  setCartItems(...);
  // new: trigger toast
  setCartToast(product.name);
}
```

**Toast auto-dismiss in `App.jsx`:**
```jsx
useEffect(() => {
  if (!cartToast) return;
  const timer = setTimeout(() => setCartToast(null), 2500);
  return () => clearTimeout(timer);
}, [cartToast]);
```

**New component:** `src/components/CartToast.jsx`

Props: `productName` (string | null)

Renders nothing when `productName` is null. When set:
- Fixed position: `top-24 right-4` (below the sticky navbar)
- Dark card: `bg-[#111111] border-l-4 border-brandGold`
- Gold checkmark icon (Lucide `CheckCircle2`)
- Text: product name bold + "added to cart" in gray
- Slide-in animation via Tailwind `animate-slide-in` or CSS keyframe
- `z-50` to sit above page content

**Animation:** CSS keyframe added to `index.css`:
```css
@keyframes slideInRight {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
.toast-slide-in {
  animation: slideInRight 0.3s ease-out forwards;
}
```

**Render in `App.jsx`:**
```jsx
<CartToast productName={cartToast} />
```
Placed just before `</>`  in the App return, after `<Footer />`.

## Files Changed

| Action | File |
|--------|------|
| Modify | `src/components/Navbar.jsx` — one-line responsive text fix |
| Modify | `src/App.jsx` — add cartToast state, useEffect, CartToast render |
| Create | `src/components/CartToast.jsx` — toast component |
| Modify | `src/index.css` — slideInRight keyframe |

## Self-Review

- No TBDs or placeholders
- Animation uses a CSS keyframe (not a library) — consistent with existing zero-dependency approach
- Toast resets cleanly on rapid adds (useEffect cleanup cancels the old timer)
- Mobile nav fix is a one-character class change — no scope creep
- Both fixes are independent and can be implemented in any order
