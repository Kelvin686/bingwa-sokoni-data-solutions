import React from 'react';
import { Smartphone, History, PhoneCall, CheckCircle2 } from 'lucide-react';
import { PAYMENT_TILL, HELPLINE_PHONE } from '../data/dealsData';
import { DealCategory } from '../types/deals';

interface NavbarProps {
  activeCategory: DealCategory;
  onSelectCategory: (cat: DealCategory) => void;
  orderCount: number;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  viewMode: 'interactive' | 'grid';
  onToggleViewMode: (mode: 'interactive' | 'grid') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  orderCount,
  onOpenHistory,
  onOpenHelp,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-emerald-700 transition-colors">
              BS
            </span>
            <div className="leading-tight">
              <span className="font-extrabold text-emerald-800 tracking-tight">BINGWA</span>{' '}
              <span className="font-extrabold text-emerald-600 tracking-tight">SOKONI</span>
              <span className="block text-[10px] font-semibold text-emerald-700 tracking-widest uppercase">
                Data Solutions
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectCategory('all')}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeCategory === 'all' && viewMode === 'grid'
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              All Deals
            </button>
            <button
              onClick={() => {
                onSelectCategory('bingwa-data');
                onToggleViewMode('grid');
              }}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeCategory === 'bingwa-data'
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Bingwa Data
            </button>
            <button
              onClick={() => {
                onSelectCategory('minutes');
                onToggleViewMode('grid');
              }}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeCategory === 'minutes'
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Minutes & Credo
            </button>
            <button
              onClick={() => {
                onSelectCategory('sms');
                onToggleViewMode('grid');
              }}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeCategory === 'sms'
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              SMS Deals
            </button>
            <button
              onClick={() => {
                onSelectCategory('tunukiwa');
                onToggleViewMode('grid');
              }}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeCategory === 'tunukiwa'
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Tunukiwa
            </button>
          </nav>

          {/* Zone 3: customer support and order history */}
          <div className="flex items-center gap-2.5 shrink-0">

            <button
              onClick={onOpenHelp}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap"
              title="Customer Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{HELPLINE_PHONE}</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0"
              aria-label="Order History"
            >
              <History className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">My Orders</span>
              {orderCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
