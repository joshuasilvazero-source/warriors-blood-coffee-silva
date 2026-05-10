import { useState } from "react";
import warriorsBloodLogo from "../assets/images/warrior-blood-logo-done.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brandBlack border-b border-white/10 sticky top-0 z-50">
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

        {/* Desktop Nav */}
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

          <button className="relative p-2 text-white hover:text-brandGold transition-colors">
            🛒
          </button>
        </div>

        {/* Mobile Button */}
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
            <a
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
              href="#shop"
            >
              Shop
            </a>

            <a
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
              href="#about"
            >
              About Us
            </a>

            <a
              onClick={() => setMenuOpen(false)}
              className="hover:text-brandGold transition-colors"
              href="#contact"
            >
              Contact Us
            </a>

            <button className="text-left hover:text-brandGold transition-colors">
              Cart
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default NavBar;