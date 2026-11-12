import React from 'react';
import { ShieldCheck, Zap, Phone, Sparkles, Check, Copy } from 'lucide-react';
import { PAYMENT_TILL } from '../data/dealsData';

interface HeroBannerProps {
  viewMode: 'interactive' | 'grid';
  onToggleViewMode: (mode: 'interactive' | 'grid') => void;
  onSelectQuickDeal: (dealId: string) => void;
  onOpenHelp: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  viewMode,
  onToggleViewMode,
  onSelectQuickDeal,
  onOpenHelp,
}) => {
  const [copiedTill, setCopiedTill] = React.useState(false);

  const handleCopyTill = () => {
    navigator.clipboard.writeText(PAYMENT_TILL);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Decorative background grid and radiant glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent/Benefit Alert Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>Safaricom Data Solutions • Fast Automated Delivery in 5 Seconds</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                PATA DATA HATA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-amber-200 to-emerald-200 underline decoration-amber-400 decoration-wavy decoration-2">
                  UKIWA NA OKOA
                </span>
              </h1>
              <p className="text-emerald-100 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Click any offer shown on the flyer, select your preferred bundle, and pay
                via <strong className="text-white font-semibold">Buy Goods Till {PAYMENT_TILL}</strong>.
                Your outstanding Okoa Jahazi will <span className="underline font-semibold text-lime-300">not</span> be deducted!
              </p>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">100% Okoa Safe</h2>
                  <p className="text-xs text-emerald-200 mt-0.5">Zero deduction from your Okoa balance</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Zap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">5-Second Delivery</h2>
                  <p className="text-xs text-emerald-200 mt-0.5">Instant bundle credit right after M-Pesa PIN</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Phone className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">Safaricom Direct</h2>
                  <p className="text-xs text-emerald-200 mt-0.5">Official 4G/5G high-speed bundles</p>
                </div>
              </div>
            </div>

            {/* Quick Actions & View Selector */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onToggleViewMode('interactive')}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 ${
                  viewMode === 'interactive'
                    ? 'bg-lime-400 text-emerald-950 hover:bg-lime-300 ring-2 ring-lime-400/50'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                }`}
              >
                <span>🖼️ Click Interactive Flyer</span>
              </button>

              <button
                onClick={() => onToggleViewMode('grid')}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-lime-400 text-emerald-950 hover:bg-lime-300 ring-2 ring-lime-400/50'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                }`}
              >
                <span>📋 Browse Deals Catalog</span>
              </button>

              <button
                onClick={onOpenHelp}
                className="px-4 py-3 rounded-xl font-semibold text-sm text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                Need Help? Talk to Support
              </button>
            </div>
          </div>

          {/* Right Card: Payment Till Box & Featured Deal */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border border-emerald-100 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Official Payment Till
                  </span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Buy Goods
                </span>
              </div>

              {/* Till Display with Copy Button */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-inner">
                <div>
                  <p className="text-[11px] font-medium text-emerald-400 uppercase tracking-widest">
                    LIPA NA M-PESA TILL
                  </p>
                  <p className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-white">
                    {PAYMENT_TILL}
                  </p>
                </div>
                <button
                  onClick={handleCopyTill}
                  className="px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Copy Till Number"
                >
                  {copiedTill ? (
                    <>
                      <Check className="w-4 h-4 text-lime-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Till</span>
                    </>
                  )}
                </button>
              </div>

              {/* Top Selling Quick Picks from the Flyer */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  🔥 Most Popular Deals From Flyer:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectQuickDeal('b-55')}
                    className="p-2.5 rounded-lg border border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      1.25 GB Data
                    </div>
                    <div className="text-[11px] text-slate-500">Till Midnight</div>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">KES 55</div>
                  </button>

                  <button
                    onClick={() => onSelectQuickDeal('b-19')}
                    className="p-2.5 rounded-lg border border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      1 GB Flash
                    </div>
                    <div className="text-[11px] text-slate-500">Valid 1 Hour</div>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">KES 19</div>
                  </button>

                  <button
                    onClick={() => onSelectQuickDeal('m-22')}
                    className="p-2.5 rounded-lg border border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      43 Minutes Call
                    </div>
                    <div className="text-[11px] text-slate-500">Valid 3 Hours</div>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">KES 22</div>
                  </button>

                  <button
                    onClick={() => onSelectQuickDeal('b-20')}
                    className="p-2.5 rounded-lg border border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      300MB + WhatsApp
                    </div>
                    <div className="text-[11px] text-slate-500">+ 70 SMS (24h)</div>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">KES 20</div>
                  </button>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Account Name on M-Pesa:</span>
                <span className="font-semibold text-slate-800">BINGWA SOKONI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
