import { Check, Zap } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: number | null;
  period?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  badge?: string;
  onSelect: () => void;
}

export function PricingCard({
  name, price, period, description, features, highlighted, ctaText, badge, onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-200 ${
        highlighted
          ? "bg-gradient-to-b from-cyan-400/10 to-blue-600/5 border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(0,212,255,0.12)]"
          : "bg-white/[0.025] border border-white/10"
      }`}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1 bg-cyan-400 text-black text-xs font-bold rounded-full">
            <Zap size={11} />
            {badge}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-white font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex items-end gap-1">
        {price === null ? (
          <span className="text-4xl font-bold text-white font-display">Free</span>
        ) : (
          <>
            <span className="text-gray-400 text-lg self-start mt-2">$</span>
            <span className="text-5xl font-bold text-white font-display leading-none">{price}</span>
            {period && <span className="text-gray-400 text-sm mb-1">/{period}</span>}
          </>
        )}
      </div>

      <ul className="space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              highlighted ? "bg-cyan-400/20 text-cyan-400" : "bg-white/10 text-gray-400"
            }`}>
              <Check size={11} strokeWidth={3} />
            </div>
            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 ${
          highlighted
            ? "bg-cyan-400 text-black hover:bg-cyan-300"
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
}
