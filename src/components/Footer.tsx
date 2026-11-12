import React from 'react';
import { PAYMENT_TILL, HELPLINE_PHONE, BUSINESS_NAME, SLOGAN } from '../data/dealsData';
import { ShieldCheck, PhoneCall, Heart } from 'lucide-react';

interface FooterProps {
  onOpenHelp: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp, onSelectCategory }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                BS
              </span>
              <span className="text-lg font-black tracking-tight text-white">
                {BUSINESS_NAME}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Kenya’s premier Safaricom data reseller platform. Get high-capacity data bundles, minutes, and SMS packs delivered in 5 seconds without deductions from active Okoa Jahazi loans.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-lime-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>{SLOGAN}</span>
            </div>
          </div>

          {/* Quick Offer Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('bingwa-data')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Bingwa Data Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('minutes')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Minutes & Credo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sms')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  SMS Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tunukiwa')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tunukiwa Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Lipa & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Till & Helpline
            </h4>
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Lipa Na M-Pesa Till
              </span>
              <span className="text-xl font-mono font-black text-lime-400">
                {PAYMENT_TILL}
              </span>
            </div>
            <button
              onClick={onOpenHelp}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helpline: {HELPLINE_PHONE}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bingwa Sokoni Data Solutions. Thank you for your support!</p>
          <div className="flex items-center gap-2">
            <span>Powered by Safaricom 4G/5G Network</span>
            <span>·</span>
            <span>Till {PAYMENT_TILL}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
