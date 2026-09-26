import { Gift, Sparkles } from "lucide-react";

export function FirstOrderDiscount() {
  return (
    <div
      className="first-order-discount mt-2 inline-flex max-w-full
        items-center gap-1.5 rounded-full border border-gold-400/60
        bg-gradient-to-r from-amber-50 via-yellow-50 to-rose-50
        px-2.5 py-1.5 text-xs font-semibold text-maroon-900
        shadow-sm sm:text-sm"
    >
      <Gift
        className="h-4 w-4 shrink-0 text-gold-700"
        aria-hidden="true"
      />

      <span>₹150 discount on your first order</span>

      <Sparkles
        className="h-3.5 w-3.5 shrink-0 text-gold-600"
        aria-hidden="true"
      />
    </div>
  );
}
