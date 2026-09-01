import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, ConditionBadge } from '../common/Badge';
import { Heart, Share2, X, MapPin, ShieldCheck, MessageSquare } from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { activeItem, closeItemDetail, claimItem, fulfillRequest, toggleSaveItem, savedItemIds, addToast } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeItem) return null;

  const isSaved = savedItemIds.includes(activeItem.id);
  const isDonation = activeItem.type === 'donation';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activeItem.title,
        text: `Mira esta publicación en RedSolidaria: ${activeItem.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Enlace copiado',
        message: 'El link de esta publicación ha sido copiado.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#F7F4EF] rounded-3xl max-w-3xl w-full border border-[#E6E1DA] shadow-elevated overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E6E1DA]">
          <div className="flex items-center gap-2">
            <Badge variant={isDonation ? 'terracotta' : 'emerald'}>
              {isDonation ? 'Objeto regalado' : 'Necesidad solicitada'}
            </Badge>
            {activeItem.urgent && <Badge variant="amber">Urgente</Badge>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem(activeItem.id)}
              className={`px-3 py-1 text-xs rounded-full border transition flex items-center gap-1 ${
                isSaved ? 'bg-red-50 text-red-600 border-red-200 font-bold' : 'text-gray-600 border-gray-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-600' : ''}`} />
              <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </button>
            <button
              onClick={closeItemDetail}
              className="p-1 rounded-full text-gray-700 font-bold ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-[#E6E1DA] rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeItem.images[activeImageIndex] || activeItem.images[0]}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E87A5D]" />
                <span>{activeItem.locationName} · {activeItem.distanceKm} km</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {activeItem.images.length > 1 && (
              <div className="flex gap-2">
                {activeItem.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-[#C4623A] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#756D65] mb-1">
              <span>Categoría: <strong>{activeItem.category}</strong></span>
              <span>{activeItem.createdAt}</span>
            </div>
            <h2 className="font-serif-warm text-2xl font-bold text-[#1C1814] leading-tight">
              {activeItem.title}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <ConditionBadge condition={activeItem.condition} />
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                Estado: {activeItem.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6E1DA]">
            <h4 className="font-bold text-xs uppercase text-[#756D65] tracking-wider mb-2">Detalles</h4>
            <p className="text-sm text-[#1C1814] leading-relaxed whitespace-pre-line">
              {activeItem.description}
            </p>
          </div>

          {/* Interactive Map Location Preview */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6E1DA] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase text-[#756D65] tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C4623A]" />
                <span>Ubicación aproximada de entrega</span>
              </h4>
              <span className="text-xs text-[#C4623A] font-semibold">{activeItem.locationName}</span>
            </div>
            <div className="relative h-36 rounded-xl bg-[#E2ECE9] border border-[#D8E2DE] flex items-center justify-center p-4 text-center">
              <div className="bg-white/90 p-3 rounded-2xl border border-[#C4623A]/30 max-w-xs shadow-xs">
                <p className="font-bold text-xs text-[#1C1814]">{activeItem.locationName}</p>
                <p className="text-[11px] text-[#756D65] mt-0.5">Puntos de encuentro sugeridos: parques centrales, estaciones de transporte o espacios públicos.</p>
              </div>
            </div>
          </div>

          {/* Donor Profile Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6E1DA] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activeItem.user.avatar}
                alt={activeItem.user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#C4623A]"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1C1814] flex items-center gap-1">
                  {activeItem.user.name}
                  {activeItem.user.verified && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verificado</span>
                    </span>
                  )}
                </h4>
                <p className="text-xs text-[#756D65] mt-0.5">
                  Calificación: {activeItem.user.rating} ★
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-white border-t border-[#E6E1DA] flex items-center justify-between gap-3">
          <button
            onClick={closeItemDetail}
            className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-[#6B6258] hover:bg-[#F0EBE3] transition"
          >
            Volver
          </button>

          {isDonation ? (
            <button
              onClick={() => claimItem(activeItem)}
              className="flex-1 bg-[#C4623A] hover:bg-[#AB512C] text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition active-press text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quiero este objeto (Abrir chat)</span>
            </button>
          ) : (
            <button
              onClick={() => fulfillRequest(activeItem)}
              className="flex-1 bg-[#2D6A4F] hover:bg-[#23533E] text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition active-press text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quiero donar esto (Abrir chat)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
