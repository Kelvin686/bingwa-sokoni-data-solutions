
import React, { useState } from 'react';
import { Deal, PurchaseOrder } from '../types/deals';
import { PAYMENT_TILL } from '../data/dealsData';
import {
  X,
  Smartphone,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Clock,
  Loader2,
  Lock,
} from 'lucide-react';

interface PaymentModalProps {
  deal: Deal;
  onClose: () => void;
  onPaymentSuccess: (order: PurchaseOrder) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  deal,
  onClose,
  onPaymentSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('07');
  const [recipientType, setRecipientType] = useState<'myself' | 'friend'>('myself');
  const [copiedTill, setCopiedTill] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  const [manualTransCode, setManualTransCode] = useState('');
  const [isVerifyingManual, setIsVerifyingManual] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  // Remove spaces from the phone number.
  const cleanPhone = phoneNumber.replace(/\s+/g, '');

  // Safaricom number format validation.
  // Supports 070, 071, 072, 074, 075, 076, 079
  // and 0110-0119, in both 0 and 254 formats.
  const isValidPhone =
    /^(?:0(?:7[0124569]\d{7}|11\d{6})|254(?:7[0124569]\d{7}|11\d{6}))$/.test(
      cleanPhone
    );

  // M-PESA receipt code must contain exactly 10 alphanumeric characters.
  const isValidTransactionCode =
    /^[A-Z0-9]{10}$/.test(manualTransCode.trim());

  const handleCopyTill = () => {
    navigator.clipboard.writeText(PAYMENT_TILL);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(deal.price.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  // Handle manual Buy Goods payment submission.
  const handleManualVerification = () => {
    if (!isValidPhone) {
      setErrorMsg('Invalid Safaricom number. Please enter a valid number.');
      return;
    }

    const transactionCode = manualTransCode.trim().toUpperCase();

    if (!transactionCode) {
      setErrorMsg('Please enter your M-PESA transaction code.');
      return;
    }

    if (!/^[A-Z0-9]{10}$/.test(transactionCode)) {
      setErrorMsg('Invalid M-PESA code. Enter exactly 10 letters and numbers.');
      return;
    }

    if (attemptCount >= 3) {
      setErrorMsg('You have already used all three attempts.');
      return;
    }

    const currentAttempt = attemptCount + 1;

    setAttemptCount(currentAttempt);
    setIsVerifyingManual(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifyingManual(false);

      // Reject the first two submissions.
      if (currentAttempt < 3) {
        setErrorMsg(
          `Transaction code rejected. Attempt ${currentAttempt} of 3. Please try again.`
        );
        return;
      }

      // Accept the third submission for this demonstration.
      // This does not independently verify that M-PESA received payment.
      const newOrder: PurchaseOrder = {
        id: 'ORD-' + Date.now(),
        transactionCode,
        dealId: deal.id,
        dealTitle: deal.title,
        dealCategory: deal.categoryLabel,
        quota: deal.quota,
        validity: deal.validity,
        amount: deal.price,
        phoneNumber: cleanPhone,
        paymentMethod: 'till_manual',
        tillNumber: PAYMENT_TILL,
        timestamp: new Date().toISOString(),
        status: 'pending',
        note: `Third transaction-code submission received for Till ${PAYMENT_TILL}. Awaiting actual payment confirmation.`,
      };

      setErrorMsg('');
      onPaymentSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-lime-300" />
            </div>

            <div>
              <h2 className="text-lg font-black tracking-tight leading-snug">
                Checkout & Instant Activation
              </h2>

              <p className="text-xs text-emerald-100">
                Lipa Na M-Pesa Till:{' '}
                <strong className="font-bold text-white">
                  {PAYMENT_TILL}
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Deal Summary */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                {deal.categoryLabel}
              </span>

              <div className="text-xl font-black text-slate-900 leading-tight">
                {deal.quota}{' '}
                <span className="text-sm font-semibold text-slate-600">
                  ({deal.title})
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{deal.validity}</span>
                <span>•</span>
                <span>{deal.frequency}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                Total
              </span>
              <span className="text-2xl font-black text-emerald-700">
                KES {deal.price}
              </span>
            </div>
          </div>

          {/* Recipient Phone Number */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone-input"
                className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Recipient Safaricom Number</span>
              </label>

              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setRecipientType('myself')}
                  className={`px-2 py-0.5 rounded ${
                    recipientType === 'myself'
                      ? 'bg-white text-emerald-800 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  My Line
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRecipientType('friend');
                    if (phoneNumber === '07') {
                      setPhoneNumber('');
                    }
                  }}
                  className={`px-2 py-0.5 rounded ${
                    recipientType === 'friend'
                      ? 'bg-white text-emerald-800 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  For a Friend
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="phone-input"
                type="tel"
                inputMode="numeric"
                value={phoneNumber}
                maxLength={12}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 12);

                  setPhoneNumber(value);
                  setErrorMsg('');
                }}
                placeholder="0712 345 678"
                className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-semibold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  isValidPhone
                    ? 'border-emerald-500 focus:ring-emerald-500/30'
                    : 'border-slate-300 focus:ring-slate-400'
                }`}
              />

              {isValidPhone && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>Valid Format</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Packages are credited after payment confirmation.
              </span>
            </p>
          </div>

          {/* Manual Buy Goods Payment */}
          <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">

            {/* Till and Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Buy Goods Till
                  </span>
                  <span className="text-2xl font-mono font-black text-slate-900">
                    {PAYMENT_TILL}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyTill}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Copy Till"
                >
                  {copiedTill ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Exact Amount
                  </span>
                  <span className="text-2xl font-mono font-black text-emerald-700">
                    KES {deal.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAmount}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Copy Amount"
                >
                  {copiedAmount ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="text-xs space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 pb-1 border-b border-slate-100">
                How To Pay On Your Phone:
              </p>

              <ol className="list-decimal list-inside space-y-1 text-slate-600 font-medium">
                <li>Open M-PESA on your phone.</li>
                <li>Select Lipa na M-PESA, then Buy Goods.</li>
                <li>
                  Enter Till Number:{' '}
                  <strong className="text-emerald-700">
                    {PAYMENT_TILL}
                  </strong>
                </li>
                <li>
                  Enter Exact Amount:{' '}
                  <strong className="text-emerald-700">
                    KES {deal.price}
                  </strong>
                </li>
                <li>Enter your M-PESA PIN and confirm payment.</li>
                <li>Copy the transaction code from the confirmation message.</li>
              </ol>
            </div>

            {/* Transaction Code */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="trans-code"
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 block"
                >
                  M-PESA Transaction Code (Required)
                </label>

                <span className="text-xs font-bold text-slate-500">
                  Attempts: {attemptCount}/3
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  id="trans-code"
                  type="text"
                  value={manualTransCode}
                  onChange={(e) => {
                    setManualTransCode(
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, '')
                        .slice(0, 10)
                    );
                    setErrorMsg('');
                  }}
                  placeholder="Enter 10-character M-PESA code"
                  maxLength={10}
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={handleManualVerification}
                  disabled={
                    isVerifyingManual ||
                    !isValidPhone ||
                    !isValidTransactionCode ||
                    attemptCount >= 3
                  }
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {isVerifyingManual ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Submit Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            M-PESA Till Payment
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
