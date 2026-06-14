# Hamburger Menu Cart Badge Design

**Date:** 2026-05-17

## Goal

Show a gold cart count badge on the mobile hamburger button when the cart has items, so users know something is in their cart before opening the menu.

## Affected File

- `src/components/Navbar.jsx` only

## Design

The mobile hamburger button (`md:hidden` section) currently:
```jsx
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-white text-3xl"
>
  {menuOpen ? "×" : "☰"}
</button>
```

Change to wrap in a `relative` container and add a conditional badge:
```jsx
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

## Badge Behavior

- Visible only when `cartCount > 0` AND `menuOpen === false`
- Hidden when menu is open (user can already see cart contents inside the menu)
- Style matches the desktop cart badge exactly: `bg-brandGold text-black text-[10px] font-bold w-5 h-5 rounded-full`
- `pointer-events-none` so clicks pass through to the button
- `cartCount` already computed at the top of Navbar from `cartItems`

## Self-Review

- No TBDs or placeholders
- Single file, single responsibility
- Badge style is consistent with desktop cart badge — no new design tokens needed
- Hiding badge when menu is open avoids visual clutter at the right moment
- Scope is minimal and focused
