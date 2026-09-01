import React from 'react';
import { ItemPublication } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Heart, MapPin, Trash2 } from 'lucide-react';

interface RequestCardProps {
  item: ItemPublication;
}

export const RequestCard: React.FC<RequestCardProps> = ({ item }) => {
  const { openItemDetail, fulfillRequest, toggleSaveItem, savedItemIds, deletePublication, currentUser } = useApp();
  const isSaved = savedItemIds.includes(item.id);
  const isMine = item.isLocal || item.user.id === currentUser.id;

  const goal = item.goalCount || 1;
  const current = item.currentCount || 0;
  const progressPercent = Math.min(100, Math.round((current / goal) * 100));

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar esta solicitud de tu dispositivo?')) {
      deletePublication(item.id);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#2D6A4F]/20 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group relative">
      {/* Header Banner */}
      <div className="relative aspect-[16/9] bg-[#E8F5E9] overflow-hidden">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=450'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="emerald">Necesidad</Badge>
          {item.emergencyTag && <Badge variant="amber">{item.emergencyTag}</Badge>}
          {item.isLocal && <Badge variant="emerald">Publicado por ti</Badge>}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          {isMine && (
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-red-50 shadow-sm transition active-press"
              title="Eliminar solicitud local"
              aria-label="Eliminar solicitud local"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveItem(item.id);
            }}
            className={`p-2 rounded-full glass-panel shadow-sm transition active-press ${
              isSaved ? 'bg-white text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}
            aria-label="Guardar solicitud"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-600' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 bg-[#2D6A4F]/90 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#52B788]" />
          <span>A {item.distanceKm} km</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#756D65] mb-1.5">
            <span>{item.locationName}</span>
            <span>{item.createdAt}</span>
          </div>

          <h3
            onClick={() => openItemDetail(item)}
            className="font-bold text-[#1C1814] text-base leading-snug group-hover:text-[#2D6A4F] transition-colors cursor-pointer line-clamp-2"
          >
            {item.title}
          </h3>

          <p className="text-xs text-[#756D65] mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Fulfillment Progress Bar */}
          {goal > 1 && (
            <div className="mt-4 bg-[#F0EBE3] p-3 rounded-2xl border border-[#E6E1DA]">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#2D6A4F]">Completado: {progressPercent}%</span>
                <span className="text-[#6B6258]">
                  {current} / {goal} {item.unit || 'unidades'}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D6A4F] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#E6E1DA]"
            />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-[#1C1814]">{item.user.name.split(' ')[0]}</p>
              <p className="text-[#756D65]">{item.user.rating} ★</p>
            </div>
          </div>

          <button
            onClick={() => fulfillRequest(item)}
            aria-label={`Donar para ${item.title}`}
            className="bg-[#2D6A4F] hover:bg-[#23533E] text-white text-xs font-bold px-4 py-2 rounded-full transition active-press shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          >
            Quiero donar esto
          </button>
        </div>
      </div>
    </div>
  );
};
