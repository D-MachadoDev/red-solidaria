import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, Download } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-[#D97706] text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
        <WifiOff className="w-4 h-4 shrink-0" />
        <p className="flex-1">
          <strong className="font-semibold">Sin conexión a internet:</strong> Estás navegando con la copia guardada de publicaciones recientes.
        </p>
        <button
          onClick={toggleOfflineMode}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs transition"
        >
          Reintentar conexión
        </button>
      </div>
    </div>
  );
};

export const InstallPWAPrompt: React.FC = () => {
  const { canInstallPWA, installPWA } = useApp();

  if (!canInstallPWA) return null;

  return (
    <div className="bg-[#C4623A] text-white px-4 py-2.5 text-xs md:text-sm shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Download className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold leading-tight">Instala RedSolidaria en tu teléfono</p>
            <p className="text-white/80 text-[11px] md:text-xs">Acceso directo sin abrir el navegador y alertas cercanas.</p>
          </div>
        </div>
        <button
          onClick={installPWA}
          className="bg-white text-[#C4623A] hover:bg-[#FEE9E1] font-bold px-4 py-1.5 rounded-full text-xs transition shadow-sm whitespace-nowrap active-press"
        >
          Instalar aplicación
        </button>
      </div>
    </div>
  );
};
