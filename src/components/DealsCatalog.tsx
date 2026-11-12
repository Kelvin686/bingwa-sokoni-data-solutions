import React, { useState, useMemo } from 'react';
import { Deal, DealCategory } from '../types/deals';
import { DEALS_DATA } from '../data/dealsData';
import { DealCard } from './DealCard';
import { Search, SlidersHorizontal, Sparkles, Filter } from 'lucide-react';

interface DealsCatalogProps {
  onSelectDeal: (deal: Deal) => void;
  selectedDealId?: string | null;
  activeCategory: DealCategory;
  onSelectCategory: (cat: DealCategory) => void;
}

export const DealsCatalog: React.FC<DealsCatalogProps> = ({
  onSelectDeal,
  selectedDealId,
  activeCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [filterFrequency, setFilterFrequency] = useState<'all' | 'once' | 'many'>('all');

  const categories: { id: DealCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Offers', count: DEALS_DATA.length },
    {
      id: 'bingwa-data',
      label: 'Bingwa Data Deals',
      count: DEALS_DATA.filter((d) => d.category === 'bingwa-data').length,
    },
    {
      id: 'minutes',
      label: 'Minutes & Credo',
      count: DEALS_DATA.filter((d) => d.category === 'minutes').length,
    },
    {
      id: 'sms',
      label: 'SMS Deals',
      count: DEALS_DATA.filter((d) => d.category === 'sms').length,
    },
    {
      id: 'tunukiwa',
      label: 'Tunukiwa Deals',
      count: DEALS_DATA.filter((d) => d.category === 'tunukiwa').length,
    },
  ];

  const filteredDeals = useMemo(() => {
    return DEALS_DATA.filter((deal) => {
      // Category filter
      if (activeCategory !== 'all' && deal.category !== activeCategory) {
        return false;
      }
      // Frequency filter
      if (filterFrequency === 'once' && deal.frequency !== 'Buy Once in a Day') {
        return false;
      }
      if (filterFrequency === 'many' && deal.frequency !== 'Buy Many Times in a Day') {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = deal.title.toLowerCase().includes(query);
        const matchQuota = deal.quota.toLowerCase().includes(query);
        const matchValidity = deal.validity.toLowerCase().includes(query);
        const matchPrice = deal.price.toString().includes(query);
        const matchBonus = deal.bonus?.toLowerCase().includes(query);
        const matchDesc = deal.description.toLowerCase().includes(query);
        return matchTitle || matchQuota || matchValidity || matchPrice || matchBonus || matchDesc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Featured
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, filterFrequency]);

  return (
    <section id="deals-catalog" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title & Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>All Offers From The Flyer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Choose Your Preferred Deal
              </h2>
            </div>

            {/* Frequency Quick Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setFilterFrequency('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterFrequency === 'all'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Limits
              </button>
              <button
                onClick={() => setFilterFrequency('once')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterFrequency === 'once'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buy Once in a Day
              </button>
              <button
                onClick={() => setFilterFrequency('many')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterFrequency === 'many'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buy Many Times
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deals (e.g. 1.25GB, KES 55, midnight, 200 SMS)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-slate-600 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort deals by"
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured / Best Deals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onSelect={onSelectDeal}
                isSelected={selectedDealId === deal.id}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-base font-bold text-slate-700">No deals match your criteria</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or switching to All Offers.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
                setFilterFrequency('all');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
