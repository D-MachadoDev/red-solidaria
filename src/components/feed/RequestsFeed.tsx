import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { FeedFilters } from './FeedFilters';
import { RequestCard } from './RequestCard';

export const RequestsFeed: React.FC = () => {
  const { requests, openCreateModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Todas');
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'recent' | 'urgent'>('distance');
  const [simulatedState, setSimulatedState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');

  // Filter items
  let filtered = requests.filter((item) => {
    const matchCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchUrgent = !onlyUrgent || item.urgent;
    return matchCategory && matchSearch && matchUrgent;
  });

  // Sort items
  filtered.sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'urgent') return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-gradient-to-r from-[#E8F5E9] to-[#F7F4EF] p-6 rounded-3xl border border-[#C8E6C9]">
        <div>
          <span className="text-xs uppercase font-bold text-[#2D6A4F] tracking-wider">
            Necesidades comunitarias y emergencias
          </span>
          <h1 className="font-serif-warm text-2xl md:text-3xl font-bold text-[#1C1814] mt-1">
            Cosas que tus vecinos o albergues necesitan recibir
          </h1>
          <p className="text-xs md:text-sm text-[#756D65] mt-1 max-w-2xl">
            Aquí ves las peticiones de ayuda de personas y grupos. Si tienes lo que piden, presiona "Quiero donar esto" para ayudarles.
          </p>
        </div>
        <button
          onClick={() => openCreateModal('request')}
          className="bg-[#2D6A4F] hover:bg-[#23533E] text-white px-5 py-3 rounded-2xl font-bold text-xs md:text-sm shadow-md transition active-press whitespace-nowrap self-start md:self-auto"
        >
          Publicar algo que necesito
        </button>
      </div>

      {/* Filters */}
      <FeedFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onlyUrgent={onlyUrgent}
        setOnlyUrgent={setOnlyUrgent}
        sortBy={sortBy}
        setSortBy={setSortBy}
        simulatedState={simulatedState}
        setSimulatedState={setSimulatedState}
      />

      {/* State Rendering */}
      {simulatedState === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl h-80 border border-[#E6E1DA] p-4 flex flex-col justify-between">
              <div className="bg-gray-200 h-36 rounded-2xl w-full" />
              <div className="space-y-2 mt-4">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-3 rounded w-full" />
              </div>
              <div className="bg-gray-200 h-8 rounded-full w-full mt-4" />
            </div>
          ))}
        </div>
      )}

      {simulatedState === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-12 text-center my-8 max-w-lg mx-auto">
          <h3 className="font-bold text-red-900 text-lg">Error al cargar solicitudes</h3>
          <p className="text-xs text-red-700 mt-2 leading-relaxed">
            No se pudo obtener la información actualizada. Intenta de nuevo en un momento.
          </p>
          <button
            onClick={() => setSimulatedState('normal')}
            className="mt-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition shadow"
          >
            Reintentar
          </button>
        </div>
      )}

      {(simulatedState === 'empty' || (simulatedState === 'normal' && filtered.length === 0)) && (
        <div className="bg-white border border-[#E6E1DA] rounded-3xl p-12 text-center my-8 max-w-md mx-auto shadow-soft">
          <h3 className="font-serif-warm text-xl font-bold text-[#1C1814]">No hay solicitudes registradas con estos filtros</h3>
          <p className="text-xs text-[#756D65] mt-2 leading-relaxed">
            Si necesitas apoyo o representas a un grupo comunitario, puedes publicar lo que necesitas ahora.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
                setOnlyUrgent(false);
                setSimulatedState('normal');
              }}
              className="bg-[#F0EBE3] hover:bg-[#E6E1DA] text-[#1C1814] text-xs font-semibold px-4 py-2 rounded-full transition"
            >
              Ver todas las necesidades
            </button>
            <button
              onClick={() => openCreateModal('request')}
              className="bg-[#2D6A4F] text-[#FFFFFF] text-xs font-semibold px-4 py-2 rounded-full transition"
            >
              Publicar necesidad
            </button>
          </div>
        </div>
      )}

      {simulatedState === 'normal' && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <RequestCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
