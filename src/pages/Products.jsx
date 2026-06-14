import { useState } from "react";
import { ShoppingCart, X, Flame, Coffee, Shield } from "lucide-react";
import { products } from "../products";
import { useAvailability } from "../hooks/useAvailability";

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

function ProductModal({ product, inStock, onClose, onAddToCart }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0e0c0a] border border-brandGold/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

          <div className="relative md:w-2/5 flex items-center justify-center p-8 shrink-0">
            <div className="absolute inset-0 bg-linear-to-b from-[#5c3a1e] via-[#3b2210] to-[#1a0e06]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(197,160,89,0.35)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(139,90,43,0.25)_0%,transparent_60%)]" />
            <img
              src={product.image}
              alt={product.name}
              className={`relative z-10 w-full max-w-60 md:max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${!inStock ? "opacity-60" : ""}`}
            />
            {!inStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-black/70 border border-white/20 rounded-2xl px-6 py-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Sold Out</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-7 md:p-9">

            <h2 className="font-heading text-3xl md:text-4xl uppercase gold-gradient-text leading-tight mb-2">
              {product.name}
            </h2>
            <p className="text-brandGold font-bold uppercase tracking-[0.15em] text-sm mb-5">
              {product.tagline}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-brandGold/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-brandGold/60" />
              <div className="flex-1 h-px bg-brandGold/30" />
            </div>

            <div className="space-y-3 mb-7">
              {product.description.map((para, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed font-serif">
                  {para}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
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

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Flame size={20} className="text-brandGold mb-2" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Roast Level</p>
                <p className="text-xs text-gray-300 mb-1">{product.roast}</p>
                <RoastMeter intensity={product.roastIntensity} />
              </div>
            </div>

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

        <div className="shrink-0 p-4 border-t border-white/10 bg-[#090807]">
          <button
            onClick={() => { if (inStock) { onAddToCart(product); onClose(); } }}
            disabled={!inStock}
            className={`
              w-full py-4 rounded-full flex items-center justify-center gap-3
              font-bold uppercase tracking-[0.25em] text-sm
              transition-all duration-500
              ${inStock
                ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:shadow-[0_0_35px_rgba(197,160,89,0.5)]"
                : "bg-white/5 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart size={18} />
            {inStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Products({ addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { availability, loading } = useAvailability();

  function getStock(variationId) {
    return availability[variationId] ?? { inStock: true, quantity: 0 };
  }

  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-4">

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
          <div className="mt-6 w-24 h-px bg-brandGold/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { inStock } = getStock(product.variationId);

            return (
              <div
                key={product.variationId}
                className={`
                  group flex flex-col
                  bg-[#111111]
                  border rounded-3xl overflow-hidden
                  transition-all duration-300
                  ${inStock
                    ? "border-white/10 hover:border-brandGold/30 hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]"
                    : "border-white/5 opacity-80"
                  }
                `}
              >
                {/* Card Header */}
                <div className="px-6 pt-4 pb-2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brandGold/60 mb-1">
                    {product.roast}
                  </p>
                  <h2 className="font-heading text-xl tracking-widest uppercase">
                    {product.name}
                  </h2>
                </div>

                {/* Product Image */}
                <div className="relative mx-6 my-2 aspect-[5/6] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-linear-to-b from-[#c48a3a] via-[#3b2210] to-[#080402]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(240,190,100,0.3)_0%,transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_90%,rgba(20,8,2,0.6)_0%,transparent_60%)]" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 ${inStock ? "group-hover:scale-105" : "opacity-50"}`}
                  />
                  <div className="absolute inset-0 bg-brandGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {!inStock && (
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/80 border border-white/15 rounded-full">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Price + 12oz + Availability */}
                <div className="px-6 pb-2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">12oz</p>
                  <p className="text-brandGold font-bold text-lg mb-1">{product.price}</p>
                  {loading ? (
                    <div className="h-3 w-16 bg-white/5 rounded-full mx-auto animate-pulse" />
                  ) : inStock ? (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brandGold/70">
                      ● In Stock
                    </p>
                  ) : (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                      Sold Out
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="px-6 pb-5 mt-auto flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="
                      w-full py-3 rounded-full
                      text-brandGold hover:text-white!
                      border border-[#d4b06a]/40 hover:border-brandGold
                      hover:bg-brandGold/10
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
                    onClick={() => inStock && addToCart(product)}
                    disabled={!inStock}
                    className={`
                      w-full py-3 rounded-full
                      font-bold uppercase text-xs tracking-[0.2em]
                      transition-all duration-500
                      border backdrop-blur-sm
                      ${inStock
                        ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] border-[#d4b06a]/40"
                        : "bg-white/5 text-gray-500 cursor-not-allowed border-white/10"
                      }
                    `}
                  >
                    {inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          inStock={getStock(selectedProduct.variationId).inStock}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  );
}
