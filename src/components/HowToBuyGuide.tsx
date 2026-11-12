import React from 'react';
import { PAYMENT_TILL } from '../data/dealsData';
import { Smartphone, CheckCircle, ArrowRight, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export const HowToBuyGuide: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Go to LIPA NA M-PESA',
      desc: 'Open your M-PESA SIM toolkit or Safaricom M-PESA App and choose Lipa na M-PESA.',
    },
    {
      num: '02',
      title: 'Select Buy Goods',
      desc: 'Choose "Buy Goods and Services" from the Lipa na M-Pesa menu options.',
    },
    {
      num: '03',
      title: `Enter Till: ${PAYMENT_TILL}`,
      desc: 'Key in the official Bingwa Sokoni Till Number: 3514916.',
    },
    {
      num: '04',
      title: 'Enter Exact Amount',
      desc: 'Type the exact cost of your selected bundle (e.g. KES 19, KES 55, KES 99).',
    },
    {
      num: '05',
      title: 'PIN, OK & Wait 5 Seconds',
      desc: 'Enter your 4-digit PIN. Your bundle will be credited to your phone automatically within 5 seconds!',
    },
  ];

  return (
    <section className="py-12 bg-emerald-950 text-white border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-lime-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>As Featured On The Flyer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            HOW TO BUY VIA M-PESA
          </h2>
          <p className="text-sm text-emerald-200">
            Quick 5-step process straight from the Bingwa Sokoni flyer. Fast, safe, and works even when you owe Okoa Jahazi.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <div>
                <span className="text-2xl font-black text-lime-400 font-mono block mb-2">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Okoa is not deducted */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-800 border border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-lime-300 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-lime-400" />
              <span>PATA DATA HATA UKIWA NA OKOA — HOW IT WORKS</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              When you buy regular airtime, Safaricom automatically cuts 100% of your outstanding Okoa Jahazi debt.
              With <strong className="text-white">Bingwa Sokoni Buy Goods Till {PAYMENT_TILL}</strong>, your payment goes directly towards activating the data bundle so you get 100% of your data intact!
            </p>
          </div>

          <div className="shrink-0">
            <div className="px-5 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Till Number</span>
              <span className="text-2xl font-black font-mono text-lime-300">{PAYMENT_TILL}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
