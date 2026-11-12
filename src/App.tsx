import React, { useState, useEffect } from 'react';
import { Deal, DealCategory, PurchaseOrder } from './types/deals';
import { DEALS_DATA, PAYMENT_TILL } from './data/dealsData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { InteractiveFlyer } from './components/InteractiveFlyer';
import { DealsCatalog } from './components/DealsCatalog';
import { HowToBuyGuide } from './components/HowToBuyGuide';
import { PaymentModal } from './components/PaymentModal';
import { ReceiptModal } from './components/ReceiptModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'bingwa_sokoni_orders_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<DealCategory>('all');
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<PurchaseOrder | null>(null);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  // Save order when payment succeeds
  const handlePaymentSuccess = (order: PurchaseOrder) => {
    const updated = [order, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order', e);
    }
    // Close payment modal and open receipt
    setSelectedDeal(null);
    setActiveReceipt(order);
  };

  const handleClearHistory = () => {
    setOrders([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear orders', e);
    }
  };

  const handleQuickDeal = (dealId: string) => {
    const deal = DEALS_DATA.find((d) => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          // If user switches category from navbar, switch to catalog or scroll smoothly
          if (viewMode === 'interactive' && cat !== 'all') {
            setViewMode('grid');
          }
        }}
        orderCount={orders.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* Hero Section with Proposition and Till Highlight */}
      <HeroBanner
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onSelectQuickDeal={handleQuickDeal}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area: Interactive Flyer View OR Full Catalog Grid */}
      <main className="flex-1">
        {viewMode === 'interactive' ? (
          <>
            <InteractiveFlyer
              onSelectDeal={(deal) => setSelectedDeal(deal)}
              selectedDealId={selectedDeal?.id}
            />
            {/* Also show the catalog below for seamless browsing */}
            <DealsCatalog
              onSelectDeal={(deal) => setSelectedDeal(deal)}
              selectedDealId={selectedDeal?.id}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </>
        ) : (
          <DealsCatalog
            onSelectDeal={(deal) => setSelectedDeal(deal)}
            selectedDealId={selectedDeal?.id}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        )}

        {/* How to Buy Guide (Lipa na M-Pesa Till 3514916) */}
        <HowToBuyGuide />
      </main>

      {/* Footer */}
      <Footer
        onOpenHelp={() => setIsHelpOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setViewMode('grid');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Modals & Dialogs */}
      {selectedDeal && (
        <PaymentModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {activeReceipt && (
        <ReceiptModal
          order={activeReceipt}
          onClose={() => setActiveReceipt(null)}
          onBuyAnother={() => {
            setActiveReceipt(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {isHistoryOpen && (
        <OrderHistoryModal
          orders={orders}
          onClose={() => setIsHistoryOpen(false)}
          onClearHistory={handleClearHistory}
          onViewReceipt={(order) => {
            setIsHistoryOpen(false);
            setActiveReceipt(order);
          }}
        />
      )}

      {isHelpOpen && (
        <HelpSupportModal onClose={() => setIsHelpOpen(false)} />
      )}

    </div>
  );
}
