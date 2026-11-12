import React, { useState } from 'react';
import { FLYER_HOTSPOTS, DEALS_DATA, PAYMENT_TILL } from '../data/dealsData';
import { Deal, Hotspot, DealCategory } from '../types/deals';
import { Zap, Clock, ShieldCheck, ChevronRight, Maximize2, X, Sparkles, ShoppingBag } from 'lucide-react';

interface InteractiveFlyerProps {
  onSelectDeal: (deal: Deal) => void;
  selectedDealId?: string | null;
}

export const InteractiveFlyer: React.FC<InteractiveFlyerProps> = ({
  onSelectDeal,
  selectedDealId,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('hotspot-bingwa-data');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  // Active hotspot object
  const currentHotspot = FLYER_HOTSPOTS.find((h) => h.id === activeHotspotId) || FLYER_HOTSPOTS[0];

  // Deals associated with current hotspot
  const activeDeals = DEALS_DATA.filter((d) => {
    if (currentHotspot.category === 'all') return true;
    return d.category === currentHotspot.category;
  });

  return (
    <section className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Interactive Visual Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Click Any Section on the Flyer to View Deals
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Tap directly on <span className="font-semibold text-emerald-700">Bingwa Data</span>,{' '}
              <span className="font-semibold text-emerald-700">Minutes</span>,{' '}
              <span className="font-semibold text-emerald-700">SMS</span>, or{' '}
              <span className="font-semibold text-emerald-700">Tunukiwa Deals</span> on the image below to inspect and select your bundle.
            </p>
          </div>

          {/* Hotspot Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {FLYER_HOTSPOTS.map((hotspot) => {
              const isActive = hotspot.id === activeHotspotId;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspotId(hotspot.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {hotspot.title.replace(' DEALS', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Split Layout: Flyer on Left (Clickable) & Extracted Offers on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Flyer Image Canvas */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                <span className="font-medium flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Tap any box on the image below
                </span>
                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition-colors font-semibold"
                  title="Expand Full Flyer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom Flyer</span>
                </button>
              </div>

              {/* Flyer Container with Relative Hotspot Overlays */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200/80 bg-slate-900 select-none group shadow-inner">
                <img
                  src="/public/assets/aistudio/image_96b8373d.png"
                  alt="Bingwa Sokoni Data Solutions Flyer"
                  className="w-full h-auto block object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Hotspot Interactive Overlays */}
                {FLYER_HOTSPOTS.map((hotspot) => {
                  const isActive = hotspot.id === activeHotspotId;
                  const isHovered = hotspot.id === hoveredHotspotId;

                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => setActiveHotspotId(hotspot.id)}
                      onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                      onMouseLeave={() => setHoveredHotspotId(null)}
                      style={{
                        top: `${hotspot.rect.top}%`,
                        left: `${hotspot.rect.left}%`,
                        width: `${hotspot.rect.width}%`,
                        height: `${hotspot.rect.height}%`,
                      }}
                      className={`absolute rounded-lg cursor-pointer transition-all duration-200 z-10 flex flex-col justify-start p-1.5 text-left ${
                        isActive
                          ? 'ring-3 ring-lime-400 bg-emerald-900/40 backdrop-blur-2xs shadow-lg'
                          : isHovered
                          ? 'ring-2 ring-amber-300 bg-amber-400/20'
                          : 'hover:ring-2 hover:ring-lime-300/80 bg-emerald-950/10'
                      }`}
                      aria-label={`Select ${hotspot.title}`}
                    >
                      <span
                        className={`text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded shadow-sm inline-block tracking-tight ${
                          isActive
                            ? 'bg-lime-400 text-slate-950'
                            : 'bg-slate-900/80 text-white'
                        }`}
                      >
                        {hotspot.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instructions below image */}
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <div className="text-emerald-900 font-medium">
                  Showing: <strong className="font-extrabold text-emerald-800">{currentHotspot.title}</strong>
                </div>
                <div className="text-emerald-700 font-semibold">
                  {activeDeals.length} deals available
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Deals Panel of the Clicked Section */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4">
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-200 space-y-5">
              {/* Header of Active Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <h3 className="text-xl font-black text-slate-900">
                      {currentHotspot.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentHotspot.subtitle}
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  Till: {PAYMENT_TILL}
                </div>
              </div>

              {/* List of Deals Extracted From this Clicked Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[640px] overflow-y-auto pr-1">
                {activeDeals.map((deal) => {
                  const isSelected = selectedDealId === deal.id;

                  return (
                    <div
                      key={deal.id}
                      onClick={() => onSelectDeal(deal)}
                      className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/30 shadow-md'
                          : 'border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 shadow-2xs'
                      }`}
                    >
                      {/* Top labels */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-slate-500">
                            {deal.frequency}
                          </span>
                          {deal.popular && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Popular
                            </span>
                          )}
                          {deal.bestValue && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Best Value
                            </span>
                          )}
                        </div>

                        {/* Title and Quota */}
                        <div>
                          <div className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors flex items-baseline gap-1.5">
                            <span>{deal.quota}</span>
                            <span className="text-xs font-medium text-slate-500">
                              ({deal.title})
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-medium">{deal.validity}</span>
                          </div>

                          {deal.bonus && (
                            <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                              ✨ {deal.bonus}
                            </div>
                          )}

                          <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                            {deal.description}
                          </p>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-medium text-slate-400 block uppercase">
                            Price
                          </span>
                          <span className="text-xl font-extrabold text-emerald-700">
                            KES {deal.price}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDeal(deal);
                          }}
                          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all group-hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <span className="font-bold text-lime-300">Okoa Jahazi Protection:</span>
                    <span className="text-slate-300 ml-1">
                      Paying via Till 3514916 safeguards your bundle from debt recovery.
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-slate-400 text-[11px]">
                  Automated 5-Sec Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal to inspect full high-resolution flyer */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden p-2 sm:p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 px-2 text-white">
              <span className="text-sm font-bold">
                BINGWA SOKONI DATA SOLUTIONS — Original Flyer Image
              </span>
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto flex-1 flex items-center justify-center">
              <img
                src="/public/assets/aistudio/image_96b8373d.png"
                alt="Bingwa Sokoni Flyer High Resolution"
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
