import { Link } from "react-router-dom";
import { products } from "../products";
import { useAvailability } from "../hooks/useAvailability";

function TopSellers({ addToCart }) {
  const { availability, loading } = useAvailability();

  function getStock(variationId) {
    return availability[variationId] ?? { inStock: true };
  }

  return (
    <section className="relative py-24 bg-brandDark" id="shop">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <span className="text-brandGold text-2xl">★</span>
            <h2 className="font-heading text-4xl tracking-[0.3em] uppercase">
              Top Sellers
            </h2>
            <span className="text-brandGold text-2xl">★</span>
          </div>
          <p className="text-gray-400 font-serif italic">
            Our most loved roasts, chosen by our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { inStock, quantity } = getStock(product.variationId);

            return (
              <div key={product.variationId} className="group flex flex-col items-center">

                <div className="relative w-full aspect-3/4 mb-6 p-4 gold-border bg-brandBlack flex items-center justify-center overflow-hidden">
                  <img
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-500 ${inStock ? "group-hover:scale-105" : "opacity-50"}`}
                    src={product.image}
                  />
                  <div className="absolute inset-0 bg-brandGold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {!inStock && (
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-black/80 border border-white/15 rounded-full">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Sold Out</span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-lg tracking-widest mb-1">{product.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-0.5">12oz</p>
                <p className="text-brandGold font-bold mb-1">{product.price}</p>

                {loading ? (
                  <div className="h-3 w-20 bg-white/5 rounded-full mb-4 animate-pulse" />
                ) : !inStock ? (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-4">Sold Out</p>
                ) : quantity > 0 && quantity <= 5 ? (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">● Only {quantity} left!</p>
                ) : quantity > 0 ? (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brandGold/70 mb-4">● {quantity} in stock</p>
                ) : (
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brandGold/70 mb-4">● In Stock</p>
                )}

                <button
                  onClick={() => inStock && addToCart(product)}
                  disabled={!inStock}
                  className={`
                    w-full py-3 rounded-full
                    font-bold uppercase text-xs tracking-[0.2em]
                    transition-all duration-500
                    border backdrop-blur-sm
                    ${inStock
                      ? "bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32] hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740] text-black hover:text-white cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] border-[#d4b06a]/40"
                      : "bg-white/5 text-gray-500 cursor-not-allowed border-white/10"
                    }
                  `}
                >
                  {inStock ? "Add to Cart" : "Sold Out"}
                </button>

              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="
              group relative inline-flex items-center justify-center overflow-hidden
              px-14 py-4 rounded-full font-bold uppercase tracking-[0.25em] text-white
              border border-[#c5a059]/40
              bg-linear-to-r from-[#2a1810] via-[#5c3a21] to-[#c5a059]
              transition-all duration-500
              hover:scale-105 hover:shadow-[0_0_35px_rgba(197,160,89,0.45)] hover:-translate-y-1
              backdrop-blur-sm
            "
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10 flex items-center gap-3">
              Explore All Roasts
              <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

export default TopSellers;
