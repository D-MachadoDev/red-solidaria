import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, HandHeart, Plus, MessageSquare, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openCreateModal, chats, currentUser } = useApp();

  const unreadChats = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E6E1DA] px-3 py-2 min-h-[74px] shadow-lg flex items-center">
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {/* Donaciones Tab */}
        <button
          onClick={() => setCurrentView('donations')}
          aria-label="Ir a sección Donar"
          className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'donations' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <Heart className="w-7 h-7" />
          <span className="text-xs font-semibold leading-none">Donar</span>
        </button>

        {/* Solicitudes Tab */}
        <button
          onClick={() => setCurrentView('requests')}
          aria-label="Ir a sección Pedir ayuda"
          className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
            currentView === 'requests' ? 'text-[#2D6A4F] font-bold bg-emerald-50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <HandHeart className="w-7 h-7" />
          <span className="text-xs font-semibold leading-none">Pedir</span>
        </button>

        {/* Central Plus Button */}
        <button
          onClick={() => openCreateModal('donation')}
          aria-label="Publicar donación o solicitud"
          className="min-w-[48px] min-h-[48px] w-14 h-14 -mt-5 rounded-full bg-[#C4623A] hover:bg-[#AB512C] text-white flex items-center justify-center shadow-lg active-press transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C4623A]"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => setCurrentView('chat')}
          aria-label="Ir a Chat de mensajes"
          className={`relative min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'chat' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <MessageSquare className="w-7 h-7" />
          <span className="text-xs font-semibold leading-none">Chat</span>
          {unreadChats > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-[#C4623A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadChats}
            </span>
          )}
        </button>

        {/* Perfil Tab */}
        <button
          onClick={() => setCurrentView('profile')}
          aria-label="Ir a Mi Perfil"
          className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'profile' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <User className="w-7 h-7" />
          <span className="text-xs font-semibold leading-none">Perfil</span>
        </button>
      </div>
    </div>
  );
};
