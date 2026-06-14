import { Link } from "react-router-dom";
import { Shield, Coffee } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.22)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-2xl mx-auto px-4 text-center">

        <div className="w-20 h-20 mx-auto mb-10 rounded-full border border-brandGold/30 flex items-center justify-center bg-brandGold/5 shadow-[0_0_40px_rgba(197,160,89,0.15)]">
          <Shield size={36} className="text-brandGold" />
        </div>

        <p className="text-brandGold uppercase tracking-[0.35em] text-xs mb-5">
          Mission Complete
        </p>

        <div className="flex items-center justify-center space-x-5 mb-6">
          <span className="text-brandGold text-2xl">★</span>
          <h1 className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase gold-gradient-text leading-tight">
            Order Confirmed
          </h1>
          <span className="text-brandGold text-2xl">★</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-20 h-px bg-brandGold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-brandGold/60" />
          <div className="w-20 h-px bg-brandGold/30" />
        </div>

        <p className="font-serif italic text-gray-300 text-xl mb-4 leading-relaxed">
          Your mission is complete.
        </p>

        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
          Your order has been received and is being prepared with care.
          A confirmation email is on its way. The coffee will follow.
        </p>

        <div className="flex items-start gap-4 bg-brandGold/5 border border-brandGold/20 rounded-2xl p-5 mb-12 text-left">
          <Coffee size={20} className="text-brandGold shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-1">
              Roasted Fresh. Shipped with Honor.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every bag ships directly from our roastery. Expect your order within 3–7 business days.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              px-10 py-4 rounded-full
              bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
              hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
              text-black hover:text-white
              font-bold uppercase tracking-[0.25em] text-xs
              transition-all duration-500
              hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)]
              border border-[#d4b06a]/40
            "
          >
            Return to Base
          </Link>

          <Link
            to="/products"
            className="
              inline-flex items-center justify-center
              px-10 py-4 rounded-full
              text-brandGold hover:text-white
              border border-brandGold/40 hover:border-brandGold
              hover:bg-brandGold/10
              font-bold uppercase tracking-[0.25em] text-xs
              transition-all duration-500
              hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]
            "
          >
            Explore More Roasts
          </Link>
        </div>

      </section>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}
