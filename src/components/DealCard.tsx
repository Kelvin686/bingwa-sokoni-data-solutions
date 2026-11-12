import React from 'react';
import { Deal } from '../types/deals';
import { Clock, ShieldCheck, Zap, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onSelect: (deal: Deal) => void;
  isSelected?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(deal)}
      className={`group relative bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-lg bg-emerald-50/20'
          : 'border-slate-200 hover:border-emerald-500 hover:shadow-md'
      }`}
    >
      {/* Card Header & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {deal.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {deal.popular && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                Popular
              </span>
            )}
            {deal.bestValue && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                Best Value
              </span>
            )}
          </div>
        </div>

        {/* Big Quota / Deal Headline */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              {deal.quota}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {deal.title}
            </span>
          </div>

          {/* Frequency & Validity Info */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600">
            <div className="inline-flex items-center gap-1 font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{deal.validity}</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-[11px] text-slate-500">{deal.frequency}</span>
          </div>
        </div>

        {/* Bonus or Extra Perk */}
        {deal.bonus && (
          <div className="my-3 p-2 rounded-lg bg-lime-50 border border-lime-200 text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-600 shrink-0" />
            <span>{deal.bonus}</span>
          </div>
        )}

        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {deal.description}
        </p>
      </div>

      {/* Price and Action Section */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Exact Price
          </span>
          <span className="text-2xl font-black text-emerald-700 tracking-tight">
            KES {deal.price}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(deal);
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all group-hover:shadow"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Select & Pay</span>
        </button>
      </div>
    </div>
  );
};
