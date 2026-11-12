import React from 'react';
import { X, PhoneCall, MessageSquare, ShieldCheck, Zap, HelpCircle, Check } from 'lucide-react';
import { HELPLINE_PHONE, HELPLINE_RAW, PAYMENT_TILL } from '../data/dealsData';

interface HelpSupportModalProps {
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-lime-300" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Customer Support & FAQs</h2>
              <p className="text-xs text-emerald-200">
                Help Line: <strong className="text-white">{HELPLINE_PHONE}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:0${HELPLINE_PHONE.replace(/\s+/g, '')}`}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center gap-1.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 mt-1">Direct Call</span>
              <span className="text-xs font-extrabold text-emerald-700">{HELPLINE_PHONE}</span>
            </a>

            <a
              href={`https://wa.me/${HELPLINE_RAW}?text=Hello%20Bingwa%20Sokoni%20Support`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center gap-1.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 mt-1">WhatsApp Chat</span>
              <span className="text-xs font-extrabold text-emerald-700">Chat with Agent</span>
            </a>
          </div>

          {/* FAQ Accordion / List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Frequently Asked Questions
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Does it really work when I have an active Okoa Jahazi?</span>
              </h4>
              <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                Yes! Because payments go through Lipa na M-Pesa Buy Goods Till <strong>{PAYMENT_TILL}</strong> instead of normal airtime recharge, Safaricom does not subtract your debt. You receive 100% of the purchased data.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>How fast will the data reflect on my line?</span>
              </h4>
              <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                As stated on the flyer: "Wait for 5 seconds". The Safaricom backend automatically allocates your chosen bundle within moments of entering your M-PESA PIN.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>What is the difference between Buy Once vs Many Times?</span>
              </h4>
              <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                Bingwa Data Deals are limited to once per 24 hours per phone number. Minutes, SMS, and Tunukiwa Deals can be bought as many times as you need in a single day!
              </p>
            </div>
          </div>

          {/* Thank You Note */}
          <div className="p-3 rounded-xl bg-emerald-950 text-white text-center">
            <p className="text-xs font-bold text-lime-300">"Thank you for your support!"</p>
            <p className="text-[11px] text-emerald-200">Bingwa Sokoni Data Solutions Kenya</p>
          </div>
        </div>
      </div>
    </div>
  );
};
