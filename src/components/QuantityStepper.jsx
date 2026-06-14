import { Trash2 } from "lucide-react";

export default function QuantityStepper({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center rounded-full border border-brandGold/30 overflow-hidden">
      <button
        onClick={onDecrement}
        className={`
          w-8 h-8 flex items-center justify-center transition-all duration-200
          ${quantity === 1
            ? "text-gray-500 hover:text-brandRed hover:bg-brandRed/10"
            : "text-gray-400 hover:text-brandGold hover:bg-brandGold/10"
          }
        `}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1
          ? <Trash2 size={13} />
          : <span className="text-sm font-bold leading-none select-none">−</span>
        }
      </button>

      <span className="min-w-[2rem] text-center text-sm font-bold text-brandGold select-none">
        {quantity}
      </span>

      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brandGold hover:bg-brandGold/10 transition-all duration-200"
        aria-label="Increase quantity"
      >
        <span className="text-sm font-bold leading-none select-none">+</span>
      </button>
    </div>
  );
}
