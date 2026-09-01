import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, HandHeart, Plus, MessageSquare, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openCreateModal, chats, currentUser } = useApp();

  const unreadChats = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E6E1DA] px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Donaciones Tab */}
        <button
          onClick={() => setCurrentView('donations')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            currentView === 'donations' ? 'text-[#C4623A] font-bold' : 'text-[#756D65]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px] font-semibold">Donar</span>
        </button>

        {/* Solicitudes Tab */}
        <button
          onClick={() => setCurrentView('requests')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            currentView === 'requests' ? 'text-[#2D6A4F] font-bold' : 'text-[#756D65]'
          }`}
        >
          <HandHeart className="w-4 h-4" />
          <span className="text-[10px] font-semibold">Pedir</span>
        </button>

        {/* Central Plus Button */}
        <button
          onClick={() => openCreateModal('donation')}
          className="w-11 h-11 -mt-4 rounded-full bg-[#C4623A] text-white flex items-center justify-center shadow-lg active-press transition-transform hover:scale-105"
          aria-label="Publicar Donación o Solicitud"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => setCurrentView('chat')}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            currentView === 'chat' ? 'text-[#C4623A] font-bold' : 'text-[#756D65]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px] font-semibold">Chat</span>
          {unreadChats > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#C4623A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadChats}
            </span>
          )}
        </button>

        {/* Perfil Tab */}
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            currentView === 'profile' ? 'text-[#C4623A] font-bold' : 'text-[#756D65]'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] font-semibold">Perfil</span>
        </button>
      </div>
    </div>
  );
};
