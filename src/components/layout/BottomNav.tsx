import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, HandHeart, Plus, MessageSquare, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openCreateModal, chats } = useApp();

  const unreadChats = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6E1DA] px-2 py-1.5 min-h-[58px] shadow-lg flex items-center">
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {/* Donaciones Tab */}
        <button
          onClick={() => setCurrentView('donations')}
          aria-label="Ver Objetos Regalados (Donaciones)"
          className={`min-w-[40px] min-h-[40px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'donations' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-semibold leading-tight">Donaciones</span>
        </button>

        {/* Buscar Ayuda / Necesidades Tab */}
        <button
          onClick={() => setCurrentView('requests')}
          aria-label="Ver Solicitudes y Buscar Ayuda"
          className={`min-w-[40px] min-h-[40px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
            currentView === 'requests' ? 'text-[#2D6A4F] font-bold bg-emerald-50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <HandHeart className="w-5 h-5" />
          <span className="text-[10px] font-semibold leading-tight">Necesidades</span>
        </button>

        {/* Central Plus Button */}
        <button
          onClick={() => openCreateModal('donation')}
          aria-label="Publicar objeto o necesidad"
          className="min-w-[44px] min-h-[44px] w-11 h-11 -mt-4 rounded-full bg-[#C4623A] hover:bg-[#AB512C] text-white flex items-center justify-center shadow-md active-press transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C4623A]"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => setCurrentView('chat')}
          aria-label="Ir a Chat"
          className={`relative min-w-[40px] min-h-[40px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'chat' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-semibold leading-tight">Chat</span>
          {unreadChats > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#C4623A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadChats}
            </span>
          )}
        </button>

        {/* Perfil Tab */}
        <button
          onClick={() => setCurrentView('profile')}
          aria-label="Ir a Perfil"
          className={`min-w-[40px] min-h-[40px] flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
            currentView === 'profile' ? 'text-[#C4623A] font-bold bg-[#FEE9E1]/50' : 'text-[#6B6258] hover:text-[#1C1814]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold leading-tight">Perfil</span>
        </button>
      </div>
    </div>
  );
};
