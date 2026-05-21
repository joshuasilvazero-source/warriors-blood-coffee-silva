# Mobile Nav Fix + Cart Toast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the mobile navbar to show "Warriors Blood Coffee" and add a gold toast notification when a product is added to the cart.

**Architecture:** Two independent fixes. The navbar fix is a single Tailwind class change. The toast uses a `cartToast` string state in App.jsx, a `useEffect` timer to auto-dismiss, a new `CartToast` component for rendering, and a CSS keyframe in `index.css` for the slide-in animation.

**Tech Stack:** React 19, Tailwind CSS v4, lucide-react, Vite

---

## File Map

| Action | File | What changes |
|--------|------|--------------|
| Modify | `src/components/Navbar.jsx` | Split "Coffee Company" span so "Coffee" shows on mobile |
| Modify | `src/index.css` | Add `slideInRight` keyframe + `.toast-slide-in` class |
| Create | `src/components/CartToast.jsx` | New toast component |
| Modify | `src/App.jsx` | Add `cartToast` state, `useEffect`, `CartToast` import + render, trigger toast in `addToCart` |

---

## Task 1: Fix mobile navbar text

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Update the logo text span**

Find this in `src/components/Navbar.jsx` (around line 33):
```jsx
<h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
  Warriors <span className="text-brandRed">Blood</span>{" "}
  <span className="hidden md:inline">Coffee Company</span>
</h1>
```

Replace with:
```jsx
<h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
  Warriors <span className="text-brandRed">Blood</span>{" "}
  Coffee<span className="hidden md:inline"> Company</span>
</h1>
```

- [ ] **Step 2: Verify the change visually**

Run `npm run dev`, open `http://localhost:5173`, and resize the browser to a narrow width (< 768px). The logo text should read **Warriors Blood Coffee**. On wide screens it should read **Warriors Blood Coffee Company**.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "fix: show Warriors Blood Coffee on mobile navbar"
```

---

## Task 2: Add toast slide-in animation to CSS

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Append the keyframe and utility class**

Open `src/index.css` and add the following at the very end of the file:

```css
@keyframes slideInRight {
  from {
    transform: translateX(110%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-slide-in {
  animation: slideInRight 0.3s ease-out forwards;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add toast slide-in animation"
```

---

## Task 3: Create CartToast component

**Files:**
- Create: `src/components/CartToast.jsx`

- [ ] **Step 1: Create the file**

```jsx
import { CheckCircle2 } from "lucide-react";

export default function CartToast({ productName }) {
  if (!productName) return null;

  return (
    <div className="fixed top-24 right-4 z-50 toast-slide-in">
      <div className="relative flex items-center gap-3 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brandGold rounded-l-2xl" />
        <CheckCircle2 size={20} className="text-brandGold shrink-0" />
        <div>
          <p className="text-white font-bold text-sm tracking-wide">{productName}</p>
          <p className="text-gray-400 text-xs mt-0.5">Added to cart</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CartToast.jsx
git commit -m "feat: add CartToast component"
```

---

## Task 4: Wire toast into App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add CartToast import**

At the top of `src/App.jsx`, after the existing imports, add:
```jsx
import CartToast from "./components/CartToast";
```

- [ ] **Step 2: Add cartToast state and useEffect**

The file currently starts with:
```jsx
function App() {
    const [cartItems, setCartItems] = useState([]);
```

Change to:
```jsx
function App() {
    const [cartItems, setCartItems] = useState([]);
    const [cartToast, setCartToast] = useState(null);

    useEffect(() => {
        if (!cartToast) return;
        const timer = setTimeout(() => setCartToast(null), 2500);
        return () => clearTimeout(timer);
    }, [cartToast]);
```

Make sure `useEffect` is already imported at the top — the current import line is:
```jsx
import { useState } from "react";
```

Change it to:
```jsx
import { useState, useEffect } from "react";
```

- [ ] **Step 3: Trigger toast in addToCart**

Find the existing `addToCart` function:
```jsx
    function addToCart(product) {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.name === product.name);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
    }
```

Replace with:
```jsx
    function addToCart(product) {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.name === product.name);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
        setCartToast(product.name);
    }
```

- [ ] **Step 4: Render CartToast in the return**

Find the closing of the App return:
```jsx
            <Footer />
        </>
    );
```

Replace with:
```jsx
            <Footer />
            <CartToast productName={cartToast} />
        </>
    );
```

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire cart toast notification into App"
```

---

## Task 5: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173`.

- [ ] **Step 2: Verify mobile navbar text**

Resize browser to < 768px wide. The navbar logo should read **Warriors Blood Coffee**. On wide screens it should read **Warriors Blood Coffee Company**.

- [ ] **Step 3: Verify toast on Products page**

Navigate to `/products`. Click **Add to Cart** on any product. A dark card with a gold left stripe and gold checkmark should slide in from the top-right showing the product name and "Added to cart". It should disappear after 2.5 seconds.

- [ ] **Step 4: Verify toast resets on rapid adds**

Click Add to Cart on a second product before the first toast disappears. The toast should update to the new product name and restart the 2.5s timer.

- [ ] **Step 5: Verify toast on Homepage (TopSellers)**

Navigate to `/`. Click **Add to Cart** on a Top Sellers card. Same toast should appear.

- [ ] **Step 6: Verify toast on modal**

Open a product modal (click Description, then Add to Cart inside the modal). Toast should fire.

- [ ] **Step 7: Lint check**

```bash
npm run lint
```

Expected: no errors.

---

## Self-Review

**Spec coverage:**
- ✅ Mobile navbar shows "Warriors Blood Coffee" — Task 1
- ✅ Toast slide-in animation — Task 2
- ✅ CartToast component with gold stripe, checkmark, product name, "Added to cart" — Task 3
- ✅ cartToast state, useEffect auto-dismiss, addToCart trigger, render — Task 4
- ✅ Toast resets timer on rapid adds — Task 4 (useEffect dependency on cartToast triggers fresh timer)

**Placeholder scan:** None found.

**Type consistency:** `cartToast` is `string | null` throughout — set to `product.name` (string) in `addToCart`, cleared to `null` in `useEffect`, passed as `productName` prop to `CartToast` — consistent.
