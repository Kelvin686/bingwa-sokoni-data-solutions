import React, { useState } from 'react';
import { PurchaseOrder } from '../types/deals';
import { PAYMENT_TILL, HELPLINE_PHONE, HELPLINE_RAW, BUSINESS_NAME } from '../data/dealsData';
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  Download,
  Share2,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ReceiptModalProps {
  order: PurchaseOrder;
  onClose: () => void;
  onBuyAnother: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  order,
  onClose,
  onBuyAnother,
}) => {
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const formattedDate = new Date(order.timestamp).toLocaleString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const receiptSmsText = `${order.transactionCode} Confirmed. Ksh${order.amount}.00 paid to ${BUSINESS_NAME} Till ${PAYMENT_TILL} on ${formattedDate}. Bundle: ${order.quota} (${order.validity}) activated on ${order.phoneNumber}. Helpline: ${HELPLINE_PHONE}.`;

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(receiptSmsText);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Bingwa Sokoni Support, I have paid KES ${order.amount} for ${order.quota} to Till 3514916 with Ref: ${order.transactionCode} for phone ${order.phoneNumber}.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Safaricom Green Banner */}
        <div className="bg-emerald-700 px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Payment & Activation Confirmed!
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Data bundle dispatched to your phone in 5 seconds
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6">
          {/* M-Pesa SMS Style Container */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-700 pb-1.5 text-[11px]">
              <span>M-PESA CONFIRMATION</span>
              <span>{order.transactionCode}</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              <span className="text-lime-300 font-bold">{order.transactionCode}</span> Confirmed.{' '}
              Ksh{order.amount}.00 paid to <span className="font-bold">{BUSINESS_NAME}</span> (Till {order.tillNumber}) on{' '}
              {formattedDate}.
            </p>
            <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Status: <strong className="text-lime-400">ACTIVATED</strong></span>
              <span>Okoa Safe: <strong className="text-lime-400">YES</strong></span>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Selected Offer:</span>
              <span className="text-slate-900 font-bold text-sm">{order.quota}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Package Validity:</span>
              <span className="text-slate-900 font-bold">{order.validity}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Credited Phone Number:</span>
              <span className="text-emerald-700 font-bold font-mono text-sm">{order.phoneNumber}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Amount Paid:</span>
              <span className="text-slate-900 font-extrabold text-base">KES {order.amount}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Payment Till:</span>
              <span className="text-slate-900 font-mono font-bold">{PAYMENT_TILL}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleCopyReceipt}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              {copiedReceipt ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied SMS!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Receipt SMS</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${HELPLINE_RAW}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          {/* Buy Another Offer CTA */}
          <button
            onClick={onBuyAnother}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>Buy Another Deal</span>
          </button>
        </div>

        {/* Footer Support Notice */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <span>Official Customer Helpline:</span>
          <a href={`tel:${HELPLINE_PHONE.replace(/\s+/g, '')}`} className="font-bold text-emerald-700 hover:underline">
            {HELPLINE_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};
