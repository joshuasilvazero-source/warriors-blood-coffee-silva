# Quantity Stepper Design

**Date:** 2026-05-17  
**Feature:** +/- quantity controls for shopping cart and checkout page

## Goal

Replace all static quantity displays with an interactive pill-shaped stepper so the site feels like a real e-commerce storefront.

## Affected Files

- `src/components/Navbar.jsx` — desktop cart dropdown + mobile cart section
- `src/pages/Checkout.jsx` — cart item rows
- `src/App.jsx` — no logic changes needed

## Stepper Component

A shared `QuantityStepper` component rendered inline wherever quantity is displayed.

**Props:** `quantity`, `onIncrement`, `onDecrement`

**Behavior:**
- `+` button calls `onIncrement`
- `−` button calls `onDecrement`
- When `quantity === 1`, the `−` shows a trash icon and turns `brandRed` on hover to signal removal
- When `quantity > 1`, both buttons styled with `brandGold/30` border and gold hover

**Style:** pill shape (`rounded-full`), `border border-brandGold/30`, buttons `w-8 h-8`, quantity center `min-w-[2rem] text-center font-bold text-sm`

## Navbar Changes

**Desktop cart dropdown:**
- Remove `Qty: X` static text and `×` remove button
- Replace with `QuantityStepper` where `onIncrement={() => addToCart(item)}` and `onDecrement={() => removeFromCart(item.name)}`

**Mobile cart section:**
- Same replacement as desktop

## Checkout Page Changes

- Replace the static quantity circle (`w-12 h-12 rounded-full border border-brandGold/20`) with `QuantityStepper`
- Keep the "Remove" text link below for intentional full removal
- Pass `updateQuantity` or reuse `addToCart`/`removeFromCart` via props — `Checkout` already receives `removeFromCart`; needs `addToCart` added to its props

## Props Update

`Checkout` component signature changes from:
```jsx
function Checkout({ cartItems, removeFromCart })
```
to:
```jsx
function Checkout({ cartItems, addToCart, removeFromCart })
```

And in `App.jsx` the route updates to pass `addToCart`:
```jsx
<Checkout cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
```

## Self-Review

- No TBDs or placeholders
- Architecture is consistent across all three locations
- Scope is tightly focused on quantity controls only
- No ambiguity: shared component, same behavior everywhere
