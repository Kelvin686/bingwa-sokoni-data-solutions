import React from 'react';
import { PurchaseOrder } from '../types/deals';
import { X, Clock, CheckCircle2, ShoppingBag, Trash2, ArrowUpRight } from 'lucide-react';
import { PAYMENT_TILL } from '../data/dealsData';

interface OrderHistoryModalProps {
  orders: PurchaseOrder[];
  onClose: () => void;
  onClearHistory: () => void;
  onViewReceipt: (order: PurchaseOrder) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  orders,
  onClose,
  onClearHistory,
  onViewReceipt,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h2 className="text-lg font-black tracking-tight">My Purchases</h2>
            <p className="text-xs text-slate-400">
              Saved history of your data & bundle activations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Orders */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No purchases yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select an offer from the flyer or catalog to make your first instant payment.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const formattedDate = new Date(order.timestamp).toLocaleString('en-KE', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={order.id}
                  onClick={() => onViewReceipt(order)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900 group-hover:text-emerald-700">
                        {order.quota}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({order.validity})
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="font-mono text-emerald-800 font-bold">{order.transactionCode}</span>
                      <span>·</span>
                      <span>{order.phoneNumber}</span>
                      <span>·</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-700 block">
                      KES {order.amount}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      Activated
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {orders.length > 0 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={onClearHistory}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <span className="text-slate-500">
              Total {orders.length} transaction{orders.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
