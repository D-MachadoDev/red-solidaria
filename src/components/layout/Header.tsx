import React from 'react';
import { useApp } from '../../context/AppContext';
import { AccessibilityBar } from '../common/AccessibilityBar';
import { HeartHandshake, Bell, Plus, Download, Wifi, WifiOff, User, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    isAuthenticated,
    openAuthModal,
    notifications,
    toggleNotificationsModal,
    openCreateModal,
    isOffline,
    toggleOfflineMode,
    canInstallPWA,
    installPWA,
    chats,
  } = useApp();

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadChats = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="sticky top-0 z-40">
      {/* Top Accessibility Bar */}
      <AccessibilityBar />

      {/* Main Header Bar */}
      <header className="bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#E6E1DA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand / Logo */}
          <button
            onClick={() => setCurrentView('landing')}
            aria-label="Ir a inicio de RedSolidaria"
            className="flex items-center gap-2.5 group text-left active-press focus:outline-none focus:ring-2 focus:ring-[#C4623A] rounded-2xl p-1"
          >
            <div className="w-9 h-9 rounded-2xl bg-[#C4623A] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif-warm text-xl font-bold tracking-tight text-[#1C1814] group-hover:text-[#C4623A] transition-colors">
                RedSolidaria
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-[#C4623A] -mt-1">
                Ayuda Comunitaria Directa
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1 bg-[#F0EBE3] p-1 rounded-full border border-[#E6E1DA]">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
                currentView === 'landing'
                  ? 'bg-white text-[#C4623A] shadow-sm'
                  : 'text-[#6B6258] hover:text-[#1C1814]'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentView('donations')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
                currentView === 'donations'
                  ? 'bg-white text-[#C4623A] shadow-sm'
                  : 'text-[#6B6258] hover:text-[#1C1814]'
              }`}
            >
              Donar
            </button>
            <button
              onClick={() => setCurrentView('requests')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                currentView === 'requests'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#6B6258] hover:text-[#1C1814]'
              }`}
            >
              Pedir Ayuda
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
                currentView === 'chat'
                  ? 'bg-white text-[#C4623A] shadow-sm'
                  : 'text-[#6B6258] hover:text-[#1C1814]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
              {unreadChats > 0 && (
                <span className="ml-1 bg-[#C4623A] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {unreadChats}
                </span>
              )}
            </button>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline / Online Simulator Button */}
            <button
              onClick={toggleOfflineMode}
              title="Estado de conexión"
              aria-label={isOffline ? 'Modo sin conexión activo, presiona para reconectar' : 'Modo en vivo activo, presiona para probar offline'}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
                isOffline
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="hidden xs:inline">{isOffline ? 'Modo Offline' : 'En vivo'}</span>
            </button>

            {/* PWA Install Button Header */}
            {canInstallPWA && (
              <button
                onClick={installPWA}
                aria-label="Instalar aplicación RedSolidaria"
                className="hidden lg:flex items-center gap-1.5 bg-[#FEE9E1] text-[#C4623A] hover:bg-[#FCD5C7] px-3 py-1.5 rounded-full text-xs font-bold transition active-press focus:outline-none focus:ring-2 focus:ring-[#C4623A]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instalar App</span>
              </button>
            )}

            {/* Create Button */}
            <button
              onClick={() => openCreateModal('donation')}
              aria-label="Publicar nueva donación o solicitud"
              className="hidden sm:flex items-center gap-1.5 bg-[#C4623A] hover:bg-[#AB512C] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition active-press focus:outline-none focus:ring-2 focus:ring-[#C4623A]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publicar</span>
            </button>

            {/* Notifications Trigger */}
            <button
              onClick={toggleNotificationsModal}
              className="relative p-2 text-[#6B6258] hover:text-[#1C1814] hover:bg-[#F0EBE3] rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#C4623A]"
              aria-label="Abrir avisos y notificaciones"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* User Profile Avatar / Login */}
            {isAuthenticated ? (
              <button
                onClick={() => setCurrentView('profile')}
                aria-label={`Ver perfil de ${currentUser.name}`}
                className={`flex items-center gap-2 p-1 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-[#C4623A] ${
                  currentView === 'profile' ? 'border-[#C4623A] ring-2 ring-[#C4623A]/20' : 'border-[#E6E1DA] hover:border-[#C4623A]'
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden xl:inline text-xs font-semibold pr-2 text-[#1C1814]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                aria-label="Iniciar sesión o registrarse"
                className="bg-[#1C1814] text-white hover:bg-black px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <User className="w-3.5 h-3.5" />
                <span>Ingresar</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
