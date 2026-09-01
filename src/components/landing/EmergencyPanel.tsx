import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { AlertTriangle, Clock, MapPin, HeartHandshake } from 'lucide-react';

export const EmergencyPanel: React.FC = () => {
  const { emergencies, openItemDetail } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Todas');

  const categories = ['Todas', 'Alimentos', 'Ropa', 'Medicamentos', 'Hogar', 'Emergencias'];

  const filtered = emergencies.filter((emg) => {
    if (selectedCat === 'Todas') return true;
    return emg.category === selectedCat;
  });

  const getStatusBadge = (status: string, statusText: string) => {
    switch (status) {
      case 'urgente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Estado: {statusText}</span>
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Estado: {statusText}</span>
          </span>
        );
      case 'parcialmente_cubierta':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Estado: {statusText}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Estado: {statusText}</span>
          </span>
        );
    }
  };

  return (
    <section id="panel-emergencias" className="scroll-mt-20 bg-white py-12 border-y border-[#E6E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-red-50 to-[#F9F6F0] p-6 rounded-3xl border border-red-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Panel de Emergencias</span>
              </span>
              <span className="text-[11px] font-semibold text-[#756D65] bg-white px-2.5 py-1 rounded-full border border-gray-200">
                Demostración de interfaz
              </span>
            </div>

            <h2 className="font-serif-warm text-2xl md:text-3xl font-bold text-[#1C1814]">
              {emergencies.length} emergencias activas cerca de ti
            </h2>
            <p className="text-xs md:text-sm text-[#756D65] mt-1 max-w-2xl">
              Solicitudes prioritarias durante eventos climáticos o situaciones críticas. La respuesta directa salva vidas.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition active-press border ${
                  active
                    ? 'bg-red-700 text-white border-red-700 shadow-sm'
                    : 'bg-white text-[#6B6258] border-[#E6E1DA] hover:border-red-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Emergency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((emg) => (
            <div
              key={emg.id}
              className="bg-[#F7F4EF] rounded-3xl border border-[#E6E1DA] overflow-hidden shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Badge variant="amber">{emg.urgencyLevel}</Badge>
                  {getStatusBadge(emg.status, emg.statusText)}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase text-[#C4623A] tracking-wider">
                    {emg.type}
                  </span>
                  <h3 className="font-serif-warm text-lg font-bold text-[#1C1814] leading-snug mt-0.5">
                    {emg.description}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs text-[#6B6258] pt-2 border-t border-[#E6E1DA]">
                  <p className="flex items-center gap-1.5 font-semibold text-[#1C1814]">
                    <MapPin className="w-3.5 h-3.5 text-[#C4623A] shrink-0" />
                    <span>Ubicación: {emg.location}</span>
                  </p>
                  <p className="leading-relaxed">
                    <strong>Se necesita:</strong> {emg.exactNeeds}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#756D65]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{emg.timeRemaining}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-[#E6E1DA] flex items-center justify-between">
                <span className="text-[11px] text-[#756D65]">Categoría: {emg.category}</span>
                <button
                  onClick={() => openItemDetail(emg.linkedPublication)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm flex items-center gap-1.5 active-press"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Ayudar ahora</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
