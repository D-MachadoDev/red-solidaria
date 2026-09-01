import React from 'react';
import { ItemPublication } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge, ConditionBadge } from '../common/Badge';
import { Heart, MapPin, CheckCircle2, Trash2 } from 'lucide-react';

interface DonationCardProps {
  item: ItemPublication;
}

export const DonationCard: React.FC<DonationCardProps> = ({ item }) => {
  const { openItemDetail, toggleSaveItem, savedItemIds, claimItem, deletePublication, currentUser } = useApp();
  const isSaved = savedItemIds.includes(item.id);
  const isMine = item.isLocal || item.user.id === currentUser.id;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar esta donación de tu dispositivo?')) {
      deletePublication(item.id);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6E1DA] overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group relative">
      {/* Image Header with Badges */}
      <div className="relative aspect-[4/3] bg-[#F0EBE3] overflow-hidden">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=450'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="terracotta">{item.category}</Badge>
          {item.urgent && <Badge variant="amber">Urgente</Badge>}
          {item.isLocal && <Badge variant="emerald">Publicado por ti</Badge>}
        </div>

        {/* Favorite Bookmark Button */}
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          {isMine && (
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-red-50 shadow-sm transition active-press"
              title="Eliminar donación local"
              aria-label="Eliminar donación local"
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
            aria-label="Guardar objeto"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-600' : ''}`} />
          </button>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#E87A5D]" />
          <span>A {item.distanceKm} km</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#756D65] mb-1.5">
            <span>{item.locationName}</span>
            <span>{item.createdAt}</span>
          </div>

          <h3
            onClick={() => openItemDetail(item)}
            className="font-bold text-[#1C1814] text-base leading-snug group-hover:text-[#C4623A] transition-colors cursor-pointer line-clamp-2"
          >
            {item.title}
          </h3>

          <p className="text-xs text-[#756D65] mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer info: Donor & Actions */}
        <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#E6E1DA]"
            />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-[#1C1814] flex items-center gap-0.5">
                {item.user.name.split(' ')[0]}
                {item.user.verified && <CheckCircle2 className="w-3 h-3 text-blue-600 inline" />}
              </p>
              <p className="text-[#756D65]">{item.user.rating} ★</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ConditionBadge condition={item.condition} />
            <button
              onClick={() => claimItem(item)}
              aria-label={`Solicitar objeto ${item.title}`}
              className="bg-[#C4623A] hover:bg-[#AB512C] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition active-press shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C4623A]"
            >
              Quiero este objeto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
