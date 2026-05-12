import { Link } from "react-router-dom";
import { useState } from "react";
import warriorsBloodLogo from "../assets/images/warrior-blood-logo-done.png";

function Navbar({ cartItems, removeFromCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price.replace("$", "")) * item.quantity;
  }, 0);

  return (
    <header className="bg-brandBlack border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 transition-all duration-300 hover:scale-[1.02]"
        >
          <img
            alt="Warriors Blood Logo"
            className="h-10 w-auto"
            src={warriorsBloodLogo}
          />

          <h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
            Warriors <span className="text-brandRed">Blood</span>{" "}
            <span className="hidden md:inline">Coffee Company</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 uppercase text-xs tracking-widest font-semibold">
            <Link className="hover:text-brandGold transition-colors" to="/">
              Home
            </Link>

            <Link
              className="hover:text-brandGold transition-colors"
              to="/products"
            >
              Products
            </Link>

            <Link
              className="hover:text-brandGold transition-colors"
              to="/about"
            >
              About Us
            </Link>

            <a className="hover:text-brandGold transition-colors" href="#contact">
              Contact Us
            </a>
          </nav>

          {/* Cart */}
          <div className="relative">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="group relative flex items-center gap-2 rounded-full border border-brandGold/30 px-4 py-2 text-white hover:text-brandGold hover:border-brandGold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:bg-white/5"
            >
              <span className="text-sm uppercase tracking-widest">Cart</span>

              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>

              <span className="absolute -top-2 -right-2 bg-brandGold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Desktop Cart Dropdown */}
            {cartOpen && (
              <div className="absolute right-0 mt-4 w-[380px] bg-[#0d0b09] border border-brandGold/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
                <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-[#1a100b] to-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl tracking-widest uppercase">
                      Shopping Cart
                    </h3>

                    <button
                      onClick={() => setCartOpen(false)}
                      className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-brandGold hover:bg-white/5 transition-all duration-300 hover:rotate-90 hover:scale-110"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {cartCount} item{cartCount !== 1 ? "s" : ""} added
                  </p>
                </div>

                {cartItems.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-full border border-brandGold/30 bg-white/5 flex items-center justify-center text-3xl">
                      🛒
                    </div>

                    <h4 className="font-heading text-xl mb-2">
                      Your cart is empty
                    </h4>

                    <p className="text-sm text-gray-400 max-w-xs mx-auto mb-7">
                      Looks like you haven’t added any coffee yet.
                    </p>

                    <Link
                      to="/products"
                      onClick={() => setCartOpen(false)}
                      className="inline-flex items-center justify-center rounded-full bg-brandGold hover:bg-[#a8843f] hover:text-white text-black font-bold py-3 px-8 uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="max-h-[330px] overflow-y-auto p-5 space-y-4">
                    {cartItems.map((item) => (
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
                    ))}
                  </div>
                )}

                <div className="px-6 py-5 border-t border-white/10 bg-[#090909]">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-brandGold font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 mb-4">
                    Shipping and taxes calculated at checkout.
                  </p>

                  {cartItems.length === 0 ? (
                    <button
                      disabled
                      className="w-full rounded-full py-4 bg-brandGold text-black font-bold uppercase tracking-widest text-xs opacity-40 cursor-not-allowed"
                    >
                      Checkout
                    </button>
                  ) : (
                    <Link
                      to="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="block text-center w-full rounded-full py-4 bg-brandGold text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#a8843f] hover:text-white"
                    >
                      Checkout
                    </Link>
                  )}

                  <Link
                    to="/products"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 block text-center text-xs uppercase tracking-widest text-brandGold hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-brandBlack border-t border-white/10 px-4 py-6">
          <nav className="flex flex-col space-y-5 uppercase text-sm tracking-widest font-semibold">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
            >
              Products
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
            >
              About Us
            </Link>

            <a
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
              href="#contact"
            >
              Contact Us
            </a>

            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="text-left text-brandGold hover:text-white transition-colors"
            >
              Cart ({cartCount})
            </button>
          </nav>

          {cartOpen && (
            <div className="mt-6 bg-[#0d0b09] border border-brandGold/30 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
              {cartItems.length === 0 ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-brandGold/30 bg-white/5 flex items-center justify-center text-2xl">
                    🛒
                  </div>

                  <p className="font-heading text-lg mb-2">
                    Your cart is empty
                  </p>

                  <p className="text-sm text-gray-400 mb-5">
                    Add a roast to begin your order.
                  </p>

                  <Link
                    to="/products"
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(false);
                    }}
                    className="inline-flex rounded-full bg-brandGold text-black font-bold py-3 px-7 uppercase tracking-widest text-xs"
                  >
                    Shop Coffee
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
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
                  ))}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-brandGold font-bold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to="/checkout"
                      onClick={() => {
                        setMenuOpen(false);
                        setCartOpen(false);
                      }}
                      className="block text-center w-full rounded-full py-3 bg-brandGold text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#a8843f] hover:text-white"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;