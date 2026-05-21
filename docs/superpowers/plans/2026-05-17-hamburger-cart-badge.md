# Hamburger Cart Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a gold cart-count badge to the mobile hamburger button so users can see items are in their cart before opening the menu.

**Architecture:** Single change to `src/components/Navbar.jsx` — wrap the existing hamburger button in a `relative` div and add a conditionally-rendered badge that mirrors the desktop cart badge style. `cartCount` is already computed in Navbar from `cartItems`, so no new state or props are needed.

**Tech Stack:** React 19, Tailwind CSS v4

---

## File Map

| Action | File | What changes |
|--------|------|--------------|
| Modify | `src/components/Navbar.jsx` | Wrap hamburger in relative div, add conditional gold badge |

---

## Task 1: Add cart badge to hamburger button

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Find the hamburger button**

Locate the `{/* Mobile Menu Button */}` comment near the bottom of the desktop nav bar section. The current code looks like this:

```jsx
{/* Mobile Menu Button */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-white text-3xl"
>
  {menuOpen ? "×" : "☰"}
</button>
```

- [ ] **Step 2: Replace with badged version**

Replace that block with:

```jsx
{/* Mobile Menu Button */}
<div className="relative md:hidden">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-white text-3xl"
  >
    {menuOpen ? "×" : "☰"}
  </button>
  {cartCount > 0 && !menuOpen && (
    <span className="absolute -top-2 -right-2 bg-brandGold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center pointer-events-none">
      {cartCount}
    </span>
  )}
</div>
```

Key details:
- The `md:hidden` moves from the `<button>` to the wrapping `<div>` so both button and badge hide on desktop
- Badge is `absolute -top-2 -right-2` — top-right corner of the button, identical positioning to the desktop cart badge
- `cartCount > 0 && !menuOpen` — only shows when cart has items AND menu is closed
- `pointer-events-none` prevents the badge from intercepting clicks meant for the button
- `bg-brandGold text-black text-[10px] font-bold w-5 h-5 rounded-full` — exact same style as the desktop cart badge (`Navbar.jsx` line ~85)

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add cart count badge to mobile hamburger button"
```

---

## Task 2: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173` and resize the browser to < 768px wide (mobile view).

- [ ] **Step 2: Verify badge appears when cart has items**

1. Navigate to `/products`
2. Click **Add to Cart** on any product
3. The hamburger `☰` should now show a gold circular badge with `1` in the top-right corner
4. Add a second item — badge should update to `2`

- [ ] **Step 3: Verify badge hides when menu is open**

1. With items in the cart, tap the hamburger button to open the menu
2. The badge should disappear (it's redundant once the menu is visible)
3. Close the menu — badge should reappear

- [ ] **Step 4: Verify badge hides when cart is empty**

1. Go to `/checkout` and remove all items
2. Return to homepage on mobile — hamburger should show no badge

- [ ] **Step 5: Verify desktop is unaffected**

Resize browser to > 768px — the badge and hamburger should both be hidden (desktop layout unchanged).

- [ ] **Step 6: Lint check**

```bash
npm run lint
```

Expected: no errors.

---

## Self-Review

**Spec coverage:**
- ✅ Badge on hamburger showing cart count — Task 1
- ✅ Hidden when cart is empty (`cartCount > 0`) — Task 1
- ✅ Hidden when menu is open (`!menuOpen`) — Task 1
- ✅ Style matches desktop cart badge — Task 1
- ✅ Desktop unaffected (`md:hidden` on wrapper) — Task 1

**Placeholder scan:** None found.

**Type consistency:** `cartCount` is a number computed at the top of `Navbar` from `cartItems.reduce(...)` — used consistently as a number throughout.
