import { useState } from "react";
import warriorsBloodLogo from "../assets/images/warrior-blood-logo-done.png";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const cartItems = [];
    const subtotal = 0;

    return (
        <header className="bg-brandBlack/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <img
                        alt="Warriors Blood Logo"
                        className="h-10 w-auto"
                        src={warriorsBloodLogo}
                    />

                    <h1 className="font-heading text-base md:text-lg tracking-widest uppercase">
                        Warriors <span className="text-brandRed">Blood</span>{" "}
                        <span className="hidden md:inline">Coffee Company</span>
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <nav className="flex items-center space-x-8 uppercase text-xs tracking-widest font-semibold">
                        <a className="hover:text-brandGold transition-colors" href="#shop">
                            Shop
                        </a>

                        <a className="hover:text-brandGold transition-colors" href="#about">
                            About Us
                        </a>

                        <a className="hover:text-brandGold transition-colors" href="#contact">
                            Contact Us
                        </a>
                    </nav>

                    {/* Cart */}
                    <div className="relative">
                        <button
                            onClick={() => setCartOpen(!cartOpen)}
                            className="
                group
                relative
                flex
                items-center
                gap-2
                rounded-full
                border
                border-brandGold/30
                px-4
                py-2
                text-white
                hover:text-brandGold
                hover:border-brandGold
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(197,160,89,0.35)]
                hover:bg-white/5
              ">
                            <span className="text-sm uppercase tracking-widest">Cart</span>

                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>

                            {/* Cart Count */}
                            <span className="absolute -top-2 -right-2 bg-brandGold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        </button>

                        {/* Cart Dropdown */}
                        {cartOpen && (
                            <div className="absolute right-0 mt-4 w-[380px] bg-[#0d0b09] border border-brandGold/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
                                {/* Header */}
                                <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-[#1a100b] to-[#0a0a0a]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-heading text-xl tracking-widest uppercase">
                                            Shopping Cart
                                        </h3>

                                        {/* Close Button */}
                                        <button
                                            onClick={() => setCartOpen(false)}
                                            className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        text-gray-400
                        hover:text-brandGold
                        hover:bg-white/5
                        transition-all
                        duration-300
                        hover:rotate-90
                        hover:scale-110
                      ">
                                            ×
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {cartItems.length} item added
                                    </p>
                                </div>

                                {/* Empty Cart */}
                                {cartItems.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <div className="w-20 h-20 mx-auto mb-5 rounded-full border border-brandGold/30 bg-white/5 flex items-center justify-center text-3xl">
                                            🛒
                                        </div>

                                        <h4 className="font-heading text-xl mb-2">
                                            Your cart is empty
                                        </h4>

                                        <p className="text-sm text-gray-400 max-w-xs mx-auto mb-7">
                                            Looks like you haven’t added any coffee yet. Start with
                                            one of our bold signature roasts.
                                        </p>

                                        <a
                                            href="#shop"
                                            onClick={() => setCartOpen(false)}
                                            className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-brandGold
                        hover:bg-[#a8843f]
                        hover:text-white
                        text-black
                        font-bold
                        py-3
                        px-8
                        uppercase
                        tracking-widest
                        text-xs
                        transition-all
                        duration-300
                        hover:scale-105
                      ">
                                            Start Shopping
                                        </a>
                                    </div>
                                ) : (
                                    <div className="max-h-[330px] overflow-y-auto p-5 space-y-4">
                                        {/* Future products go here */}
                                    </div>
                                )}

                                {/* Footer */}
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

                                    <button
                                        disabled={cartItems.length === 0}
                                        className="
                      w-full
                      rounded-full
                      py-4
                      bg-brandGold
                      text-black
                      font-bold
                      uppercase
                      tracking-widest
                      text-xs
                      transition-all
                      duration-300
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      hover:bg-[#a8843f]
                      hover:text-white
                    ">
                                        Checkout
                                    </button>

                                    <a
                                        href="#shop"
                                        onClick={() => setCartOpen(false)}
                                        className="
                      mt-4
                      block
                      text-center
                      text-xs
                      uppercase
                      tracking-widest
                      text-brandGold
                      hover:text-white
                      transition-colors
                    ">
                                        Continue Shopping
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white text-3xl">
                    {menuOpen ? "×" : "☰"}
                </button>
            </div>
        </header>
    );
}

export default NavBar;
