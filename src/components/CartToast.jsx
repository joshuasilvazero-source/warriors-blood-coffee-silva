import { CheckCircle2 } from "lucide-react";

export default function CartToast({ productName, visible }) {
  if (!productName) return null;

  return (
    <div className={`fixed top-24 right-4 z-[60] max-w-72 ${visible ? "toast-slide-in" : "toast-slide-out"}`}>
      <div className="relative flex items-center gap-3 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brandGold rounded-l-2xl" />
        <CheckCircle2 size={20} className="text-brandGold shrink-0" />
        <div>
          <p className="text-white font-bold text-sm tracking-wide">{productName}</p>
          <p className="text-gray-400 text-xs mt-0.5">Added to cart</p>
        </div>
      </div>
    </div>
  );
}
