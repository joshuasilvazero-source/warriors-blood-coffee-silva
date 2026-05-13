import { useState, useEffect } from "react";
import { ShoppingCart, X, Flame, Coffee, Shield } from "lucide-react";
import tuskBoneImage from "../assets/images/TuskandBones.png";
import desertRatImage from "../assets/images/DesertRat.png";
import warriorsCoffeeImage from "../assets/images/WarriorsCoffee.png";
import firstLightImage from "../assets/images/FirstLightCoffee.png";

const products = [
  {
    id: 1,
    name: "Tusk & Bone",
    price: "$22.99",
    image: tuskBoneImage,
    roast: "Dark Roast",
    roastIntensity: 5,
    tagline: "Bold. Relentless. Unapologetic.",
    flavorNotes: ["Dark", "Smoky", "Bold", "Earthy"],
    bestFor: "Those who want maximum strength and intensity",
    description: [
      "Tusk & Bone is our darkest, most intense roast — crafted for those who charge first and never look back. Deep, smoky, and full-bodied with a fierce finish that leaves a lasting impression.",
      "This is coffee for leaders, warriors, and anyone who refuses to quit.",
    ],
  },
  {
    id: 2,
    name: "Desert Rat",
    price: "$22.99",
    image: desertRatImage,
    roast: "Medium-Dark Roast",
    roastIntensity: 4,
    tagline: "Gritty. Rugged. Battle-Tested.",
    flavorNotes: ["Smoky", "Earthy", "Robust", "Dry"],
    bestFor: "Those who thrive under pressure and harsh conditions",
    description: [
      "Desert Rat is forged for the relentless — a medium-dark roast with a smoky, earthy profile that mirrors the determination of those who endure.",
      "Built for those who thrive in harsh conditions and never back down from a challenge.",
    ],
  },
  {
    id: 3,
    name: "WBCC Dark Roast",
    price: "$22.99",
    image: warriorsCoffeeImage,
    roast: "Dark Roast",
    roastIntensity: 4,
    tagline: "Forged in Honor. Roasted with Purpose.",
    flavorNotes: ["Rich", "Deep", "Dark", "Full-Body"],
    bestFor: "Those who demand consistency and commanding flavor",
    description: [
      "Our signature dark roast — deep, intense, and unyielding. The standard bearer of Warriors Blood Coffee Company.",
      "A cup that commands respect from the first sip to the last.",
    ],
  },
  {
    id: 4,
    name: "First Light",
    price: "$22.99",
    image: firstLightImage,
    roast: "Medium Roast",
    roastIntensity: 3,
    tagline: "Rise Early. Strike Hard. Stay Sharp.",
    flavorNotes: ["Caramel", "Golden", "Smooth", "Bright"],
    bestFor: "Early risers who need clarity and focus at dawn",
    description: [
      "A smooth medium roast with bright, golden notes of caramel and toasted grain. The perfect start to your mission.",
      "Smooth enough for the early hours, strong enough to carry you through the day.",
    ],
  },
];

function RoastMeter({ intensity, total = 5 }) {
  return (
    <div className="flex gap-1.5 mt-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-5 h-2 rounded-full transition-colors ${
            i < intensity ? "bg-brandGold" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0e0c0a] border border-brandGold/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Main content — image + details */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

          {/* Left — product image */}
          <div className="relative md:w-2/5 flex items-center justify-center p-8 shrink-0">
            <div className="absolute inset-0 bg-linear-to-b from-[#5c3a1e] via-[#3b2210] to-[#1a0e06]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(197,160,89,0.35)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(139,90,43,0.25)_0%,transparent_60%)]" />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 w-full max-w-60 md:max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Right — details */}
          <div className="flex-1 overflow-y-auto p-7 md:p-9">

            {/* Name & tagline */}
            <h2 className="font-heading text-3xl md:text-4xl uppercase gold-gradient-text leading-tight mb-2">
              {product.name}
            </h2>
            <p className="text-brandGold font-bold uppercase tracking-[0.15em] text-sm mb-5">
              {product.tagline}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-brandGold/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-brandGold/60" />
              <div className="flex-1 h-px bg-brandGold/30" />
            </div>

            {/* Description */}
            <div className="space-y-3 mb-7">
              {product.description.map((para, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed font-serif">
                  {para}
                </p>
              ))}
            </div>

            {/* Attribute cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">

              {/* Flavor notes */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Coffee size={20} className="text-brandGold mb-2" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Flavor Notes</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {product.flavorNotes.slice(0, 2).join(" • ")}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {product.flavorNotes.slice(2).join(" • ")}
                </p>
              </div>

              {/* Roast level */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Flame size={20} className="text-brandGold mb-2" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Roast Level</p>
                <p className="text-xs text-gray-300 mb-1">{product.roast}</p>
                <RoastMeter intensity={product.roastIntensity} />
              </div>

              {/* Best for */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <svg className="w-5 h-5 text-brandGold mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M5 8h11v6a4 4 0 01-4 4H9a4 4 0 01-4-4V8z" />
                  <path d="M16 10h2a2 2 0 010 4h-2" strokeLinecap="round" />
                </svg>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Best For</p>
                <p className="text-xs text-gray-300 leading-relaxed">{product.bestFor}</p>
              </div>

            </div>

            {/* Callout */}
            <div className="flex items-start gap-4 bg-brandGold/5 border border-brandGold/20 rounded-2xl p-4">
              <Shield size={20} className="text-brandGold shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-1">
                  Roasted Fresh. Built with Purpose.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every bag is roasted in small batches to ensure quality, flavor, and consistency — from our roaster to your cup.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Add to Cart — full-width footer */}
        <div className="shrink-0 p-4 border-t border-white/10 bg-[#090807]">
          <button
            onClick={() => { onAddToCart(product); onClose(); }}
            className="
              w-full py-4 rounded-full flex items-center justify-center gap-3
              bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
              hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
              text-black hover:text-white
              font-bold uppercase tracking-[0.25em] text-sm
              transition-all duration-500
              hover:shadow-[0_0_35px_rgba(197,160,89,0.5)]
              cursor-pointer
            "
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Products({ addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
      {/* Page background gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
            Handcrafted Roasts
          </p>

          <div className="flex items-center justify-center space-x-6 mb-4">
            <span className="text-brandGold text-2xl">★</span>
            <h1 className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase gold-gradient-text">
              Coffee Roasts
            </h1>
            <span className="text-brandGold text-2xl">★</span>
          </div>

          <p className="text-gray-400 font-serif italic max-w-xl mx-auto">
            Each roast is crafted with precision, sourced with integrity, and
            roasted to honor those who serve.
          </p>

          <div className="mt-6 w-24 h-px bg-brandGold/50 mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                group flex flex-col
                bg-[#111111]
                border border-white/10
                rounded-3xl overflow-hidden
                transition-all duration-300
                hover:border-brandGold/30
                hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]
              "
            >
              {/* Card Header */}
              <div className="px-6 pt-6 pb-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brandGold/60 mb-1">
                  {product.roast}
                </p>
                <h2 className="font-heading text-xl tracking-widest uppercase">
                  {product.name}
                </h2>
              </div>

              {/* Product Image */}
              <div className="relative mx-6 my-4 aspect-3/4 rounded-2xl flex items-center justify-center overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-linear-to-b from-[#c48a3a] via-[#3b2210] to-[#080402]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(240,190,100,0.3)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_90%,rgba(20,8,2,0.6)_0%,transparent_60%)]" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brandGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Price */}
              <div className="px-6 pb-2">
                <p className="text-brandGold font-bold text-lg">{product.price}</p>
              </div>

              {/* Buttons */}
              <div className="px-6 pb-6 mt-auto flex flex-col gap-3">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="
                    w-full py-3 rounded-full
                    text-brandGold hover:text-white!
                    border border-[#d4b06a]/40 hover:border-brandGold
                    hover:bg-brandGold/10
                    hover:border-brandGold
                    font-bold uppercase text-xs tracking-[0.2em]
                    transition-all duration-500
                    cursor-pointer
                    hover:scale-[1.02]
                    hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]
                    backdrop-blur-sm
                  "
                >
                  Description
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className="
                    w-full py-3 rounded-full
                    bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
                    hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
                    text-black hover:text-white
                    font-bold uppercase text-xs tracking-[0.2em]
                    transition-all duration-500
                    cursor-pointer
                    hover:scale-[1.02]
                    hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]
                    border border-[#d4b06a]/40
                    backdrop-blur-sm
                  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  );
}
