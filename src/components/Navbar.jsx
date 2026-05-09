import warriorsBloodLogo from "../assets/images/warriors-blood-logo.svg";
function NavBar() {
  return (
    <header className="bg-brandBlack border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            alt="Warriors Blood Logo"
            className="h-10 w-auto"
            src={warriorsBloodLogo}
          />

          <h1 className="font-heading text-lg tracking-widest uppercase">
            Warriors <span className="text-brandRed">Blood</span>{" "}
            <span className="hidden md:inline">Coffee Company</span>
          </h1>
        </div>

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
            <svg
              className="h-6 w-6"
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
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;