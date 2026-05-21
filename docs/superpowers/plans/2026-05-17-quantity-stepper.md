# Quantity Stepper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add interactive +/- quantity steppers to the Navbar cart dropdown and Checkout page so the site feels like a real e-commerce storefront.

**Architecture:** A shared `QuantityStepper` component renders a pill-shaped `[−] qty [+]` control everywhere quantity is displayed. When qty is 1, the minus button shows a trash icon to signal item removal. Existing `addToCart`/`removeFromCart` in App.jsx drive all quantity changes — no new state logic needed.

**Tech Stack:** React 19, Tailwind CSS v4, lucide-react, Vite

---

## File Map

| Action | File | What changes |
|--------|------|--------------|
| Create | `src/components/QuantityStepper.jsx` | New shared stepper component |
| Modify | `src/App.jsx` | Pass `addToCart` to `<Navbar>` and `<Checkout>` |
| Modify | `src/components/Navbar.jsx` | Accept `addToCart`, replace qty text + × button with stepper in desktop and mobile cart |
| Modify | `src/pages/Checkout.jsx` | Accept `addToCart`, replace static qty circle with stepper |

---

## Task 1: Create QuantityStepper component

**Files:**
- Create: `src/components/QuantityStepper.jsx`

- [ ] **Step 1: Create the file**

```jsx
import { Trash2 } from "lucide-react";

export default function QuantityStepper({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center rounded-full border border-brandGold/30 overflow-hidden">
      <button
        onClick={onDecrement}
        className={`
          w-8 h-8 flex items-center justify-center transition-all duration-200
          ${quantity === 1
            ? "text-gray-500 hover:text-brandRed hover:bg-brandRed/10"
            : "text-gray-400 hover:text-brandGold hover:bg-brandGold/10"
          }
        `}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1
          ? <Trash2 size={13} />
          : <span className="text-sm font-bold leading-none select-none">−</span>
        }
      </button>

      <span className="min-w-[2rem] text-center text-sm font-bold text-brandGold select-none">
        {quantity}
      </span>

      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brandGold hover:bg-brandGold/10 transition-all duration-200"
        aria-label="Increase quantity"
      >
        <span className="text-sm font-bold leading-none select-none">+</span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuantityStepper.jsx
git commit -m "feat: add QuantityStepper component"
```

---

## Task 2: Pass addToCart down to Navbar and Checkout

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update Navbar usage (line 45) — add `addToCart` prop**

Find this line:
```jsx
<Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
```

Replace with:
```jsx
<Navbar cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
```

- [ ] **Step 2: Update Checkout route (lines 67-70) — add `addToCart` prop**

Find this:
```jsx
<Route
    path="/checkout"
    element={<Checkout cartItems={cartItems} removeFromCart={removeFromCart} />}
/>
```

Replace with:
```jsx
<Route
    path="/checkout"
    element={<Checkout cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: pass addToCart to Navbar and Checkout"
```

---

## Task 3: Add stepper to Navbar desktop cart

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Import QuantityStepper and update the function signature**

At the top of the file, after the existing import line, add:
```jsx
import QuantityStepper from "./QuantityStepper";
```

Change the function signature from:
```jsx
function Navbar({ cartItems, removeFromCart }) {
```
to:
```jsx
function Navbar({ cartItems, addToCart, removeFromCart }) {
```

- [ ] **Step 2: Replace the desktop cart item row**

Find this block inside the desktop cart dropdown (inside `{cartItems.map((item) => (` around line 136):
```jsx
<div
  key={item.name}
  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
>
  <div className="flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-contain rounded-xl bg-black/40 p-2"
    />

    <div>
      <h4 className="font-heading text-sm tracking-widest">
        {item.name}
      </h4>

      <p className="text-brandGold text-sm font-bold mt-1">
        {item.price}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Qty: {item.quantity}
      </p>
    </div>
  </div>

  <button
    onClick={() => removeFromCart(item.name)}
    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-gray-400 hover:text-brandRed hover:border-brandRed/40 hover:bg-brandRed/10 transition-all duration-300 hover:rotate-90"
  >
    ×
  </button>
</div>
```

Replace with:
```jsx
<div
  key={item.name}
  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
>
  <div className="flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-contain rounded-xl bg-black/40 p-2"
    />

    <div>
      <h4 className="font-heading text-sm tracking-widest">
        {item.name}
      </h4>

      <p className="text-brandGold text-sm font-bold mt-1">
        {item.price}
      </p>
    </div>
  </div>

  <QuantityStepper
    quantity={item.quantity}
    onIncrement={() => addToCart(item)}
    onDecrement={() => removeFromCart(item.name)}
  />
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add quantity stepper to desktop cart dropdown"
```

---

## Task 4: Add stepper to Navbar mobile cart

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace the mobile cart item row**

Find this block inside the mobile cart section (inside `{cartItems.map((item) => (` around line 298):
```jsx
<div
  key={item.name}
  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
>
  <div className="flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-contain rounded-xl bg-black/40 p-2"
    />

    <div>
      <h4 className="font-heading text-xs tracking-widest">
        {item.name}
      </h4>

      <p className="text-brandGold text-sm font-bold mt-1">
        {item.price}
      </p>

      <p className="text-xs text-gray-400">
        Qty: {item.quantity}
      </p>
    </div>
  </div>

  <button
    onClick={() => removeFromCart(item.name)}
    className="w-8 h-8 rounded-full border border-white/10 text-gray-400 hover:text-brandRed hover:border-brandRed/40"
  >
    ×
  </button>
</div>
```

Replace with:
```jsx
<div
  key={item.name}
  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
>
  <div className="flex items-center gap-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-contain rounded-xl bg-black/40 p-2"
    />

    <div>
      <h4 className="font-heading text-xs tracking-widest">
        {item.name}
      </h4>

      <p className="text-brandGold text-sm font-bold mt-1">
        {item.price}
      </p>
    </div>
  </div>

  <QuantityStepper
    quantity={item.quantity}
    onIncrement={() => addToCart(item)}
    onDecrement={() => removeFromCart(item.name)}
  />
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add quantity stepper to mobile cart"
```

---

## Task 5: Add stepper to Checkout page

**Files:**
- Modify: `src/pages/Checkout.jsx`

- [ ] **Step 1: Import QuantityStepper**

Add at the top of `src/pages/Checkout.jsx`:
```jsx
import QuantityStepper from "../components/QuantityStepper";
```

- [ ] **Step 2: Update function signature to accept addToCart**

Change:
```jsx
export default function Checkout({ cartItems, removeFromCart }) {
```
to:
```jsx
export default function Checkout({ cartItems, addToCart, removeFromCart }) {
```

- [ ] **Step 3: Replace the static quantity circle with the stepper**

Find this block (around line 111):
```jsx
{/* Quantity */}
<div className="flex justify-center">
  <div className="
    w-12
    h-12
    rounded-full
    border
    border-brandGold/20
    flex
    items-center
    justify-center
    text-sm
    font-bold
    text-brandGold
  ">
    {item.quantity}
  </div>
</div>
```

Replace with:
```jsx
{/* Quantity */}
<div className="flex justify-center">
  <QuantityStepper
    quantity={item.quantity}
    onIncrement={() => addToCart(item)}
    onDecrement={() => removeFromCart(item.name)}
  />
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Checkout.jsx
git commit -m "feat: add quantity stepper to checkout page"
```

---

## Task 6: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173` in a browser.

- [ ] **Step 2: Verify desktop cart dropdown**

1. Click "Products" and add one item to the cart
2. Open the cart dropdown from the navbar
3. Confirm the stepper appears: `[trash icon]  1  [+]`
4. Click `+` — quantity becomes 2, minus button should now show `−` (not trash icon)
5. Click `−` — quantity goes back to 1, minus shows trash icon again
6. Click trash icon — item is removed, cart shows empty state

- [ ] **Step 3: Verify checkout page**

1. Add 2 different products to cart
2. Navigate to `/checkout`
3. Confirm each row has a `[−/trash]  qty  [+]` stepper in the Qty column
4. Click `+` on one item — row total updates immediately
5. Click trash icon at qty 1 — item disappears, order summary subtotal updates

- [ ] **Step 4: Verify mobile cart**

1. Resize browser to mobile width (< 768px)
2. Open mobile menu → tap Cart
3. Confirm stepper appears for each item
4. Test +/- and removal same as desktop

- [ ] **Step 5: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 6: Final commit if any lint fixes needed, otherwise done**

```bash
git add -A
git commit -m "chore: fix any lint warnings"
```

---

## Self-Review

**Spec coverage:**
- ✅ Pill stepper with `[−] qty [+]` — Task 1
- ✅ Trash icon at qty=1 turning red on hover — Task 1 (`quantity === 1` branch)
- ✅ Navbar desktop cart — Task 3
- ✅ Navbar mobile cart — Task 4
- ✅ Checkout page — Task 5
- ✅ `addToCart` prop threading — Task 2
- ✅ No new state logic in App.jsx — uses existing `addToCart`/`removeFromCart`

**Placeholder scan:** None found.

**Type consistency:** `QuantityStepper` props (`quantity`, `onIncrement`, `onDecrement`) used consistently across Tasks 3, 4, and 5. `addToCart(item)` passes the full item object, matching how `addToCart` in App.jsx uses `product.name` for deduplication — consistent.
