import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { isOffline, toggleOfflineMode, installPWA, canInstallPWA, addToast } = useApp();
  const [radiusKm, setRadiusKm] = useState(5);
  const [enableAlerts, setEnableAlerts] = useState(true);

  const handleClearCache = () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    addToast({
      type: 'success',
      title: 'Caché de PWA limpiado',
      message: 'Los datos locales guardados fueron renovados.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E1DA] shadow-soft">
        <h2 className="font-serif-warm text-2xl font-bold text-[#1C1814] mb-1">
          Configuración y ajustes PWA
        </h2>
        <p className="text-xs text-[#756D65] mb-6">Ajusta tu experiencia en RedSolidaria</p>

        <div className="space-y-6 divide-y divide-[#E6E1DA]">
          {/* PWA Section */}
          <div className="pt-4 space-y-4">
            <h3 className="font-bold text-sm text-[#C4623A] uppercase tracking-wider">
              Estado y rendimiento PWA
            </h3>

            <div className="flex items-center justify-between bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA]">
              <div>
                <p className="font-bold text-xs text-[#1C1814]">Modo sin conexión (Offline simulator)</p>
                <p className="text-[11px] text-[#756D65]">Simula falta de internet para probar la carga desde la memoria caché.</p>
              </div>
              <button
                onClick={toggleOfflineMode}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  isOffline ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isOffline ? 'Modo Offline' : 'En vivo'}
              </button>
            </div>

            {canInstallPWA && (
              <div className="flex items-center justify-between bg-[#FEE9E1] p-4 rounded-2xl border border-[#FCD5C7]">
                <div>
                  <p className="font-bold text-xs text-[#C4623A]">Instalar aplicación</p>
                  <p className="text-[11px] text-[#756D65]">Añade el acceso directo independiente a tu pantalla principal.</p>
                </div>
                <button
                  onClick={installPWA}
                  className="bg-[#C4623A] text-white px-4 py-2 rounded-2xl text-xs font-bold hover:bg-[#AB512C] transition"
                >
                  Instalar aplicación
                </button>
              </div>
            )}

            <div className="flex items-center justify-between bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA]">
              <div>
                <p className="font-bold text-xs text-[#1C1814]">Limpiar datos en caché</p>
                <p className="text-[11px] text-[#756D65]">Limpia los datos locales guardados.</p>
              </div>
              <button
                onClick={handleClearCache}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-1.5 rounded-2xl text-xs font-bold transition"
              >
                Limpiar caché
              </button>
            </div>
          </div>

          {/* Location radius */}
          <div className="pt-6 space-y-4">
            <h3 className="font-bold text-sm text-[#2D6A4F] uppercase tracking-wider">
              Radio de búsqueda
            </h3>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#1C1814] mb-2">
                <span>Distancia máxima:</span>
                <span>{radiusKm} km</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-full accent-[#C4623A]"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="pt-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-[#1C1814]">Alertas de emergencias</p>
              <p className="text-[11px] text-[#756D65]">Recibir notificaciones sobre necesidades prioritarias cercanas.</p>
            </div>
            <input
              type="checkbox"
              checked={enableAlerts}
              onChange={(e) => setEnableAlerts(e.target.checked)}
              className="w-5 h-5 accent-[#C4623A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
