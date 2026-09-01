import React from 'react';
import { CategoryType } from '../../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FeedFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  onlyUrgent: boolean;
  setOnlyUrgent: (urgent: boolean) => void;
  sortBy: 'distance' | 'recent' | 'urgent';
  setSortBy: (sort: 'distance' | 'recent' | 'urgent') => void;
  // Demo States
  simulatedState: 'normal' | 'loading' | 'empty' | 'error';
  setSimulatedState: (state: 'normal' | 'loading' | 'empty' | 'error') => void;
}

const CATEGORIES: CategoryType[] = [
  'Todas',
  'Tecnología',
  'Ropa',
  'Alimentos',
  'Muebles',
  'Salud/Medicinas',
  'Juguetes',
  'Mascotas',
  'Herramientas',
  'Educación',
];

export const FeedFilters: React.FC<FeedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onlyUrgent,
  setOnlyUrgent,
  sortBy,
  setSortBy,
  simulatedState,
  setSimulatedState,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Top Search & Primary Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por título, palabra clave o ubicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E6E1DA] rounded-2xl text-xs sm:text-sm text-[#1C1814] placeholder-gray-400 focus:outline-none focus:border-[#C4623A] focus:ring-2 focus:ring-[#C4623A]/10 transition shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown & Urgency Pill */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#E6E1DA] text-xs font-semibold rounded-2xl px-3 py-2.5 text-[#1C1814] focus:outline-none focus:border-[#C4623A] shadow-sm"
          >
            <option value="distance">Más cercanas</option>
            <option value="recent">Más recientes</option>
            <option value="urgent">Mayor urgencia</option>
          </select>

          <button
            onClick={() => setOnlyUrgent(!onlyUrgent)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition whitespace-nowrap active-press ${
              onlyUrgent
                ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                : 'bg-white text-[#6B6258] border-[#E6E1DA] hover:bg-gray-50'
            }`}
          >
            Ver urgentes
          </button>
        </div>
      </div>

      {/* Horizontal Category Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition active-press border ${
                active
                  ? 'bg-[#C4623A] text-white border-[#C4623A] shadow-sm'
                  : 'bg-white text-[#6B6258] border-[#E6E1DA] hover:border-[#C4623A]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* State Simulator Switcher for Evaluation */}
      <div className="bg-[#F0EBE3] p-2.5 rounded-2xl border border-[#E6E1DA] flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-[#6B6258] flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Prueba de estados del feed:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSimulatedState('normal')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
              simulatedState === 'normal'
                ? 'bg-white text-[#1C1814] shadow-sm'
                : 'text-[#756D65] hover:text-[#1C1814]'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setSimulatedState('loading')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
              simulatedState === 'loading'
                ? 'bg-white text-[#C4623A] shadow-sm'
                : 'text-[#756D65] hover:text-[#1C1814]'
            }`}
          >
            Cargando
          </button>
          <button
            onClick={() => setSimulatedState('empty')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
              simulatedState === 'empty'
                ? 'bg-white text-[#D97706] shadow-sm'
                : 'text-[#756D65] hover:text-[#1C1814]'
            }`}
          >
            Vacío
          </button>
          <button
            onClick={() => setSimulatedState('error')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
              simulatedState === 'error'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-[#756D65] hover:text-[#1C1814]'
            }`}
          >
            Error
          </button>
        </div>
      </div>
    </div>
  );
};
