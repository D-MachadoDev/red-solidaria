import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, ShieldCheck, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, openCreateModal, installPWA, canInstallPWA } = useApp();

  return (
    <footer className="bg-[#1C1814] text-white pt-12 pb-24 md:pb-12 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C4623A] flex items-center justify-center text-white">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="font-serif-warm text-xl font-bold tracking-tight">RedSolidaria</span>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              Plataforma comunitaria para conectar objetos que no usas con personas que los necesitan, especialmente en situaciones de emergencia. Sin costos ni intermediarios.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#C4623A] mb-3">Navegación</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => setCurrentView('landing')} className="hover:text-white transition">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('donations')} className="hover:text-white transition">
                  Objetos disponibles (Donar)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('requests')} className="hover:text-white transition">
                  Solicitudes de ayuda (Pedir)
                </button>
              </li>
              <li>
                <button onClick={() => openCreateModal('donation')} className="hover:text-white transition">
                  Publicar una donación
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#C4623A] mb-3">Seguridad y PWA</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Puntos de encuentro sugeridos</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Perfiles verificados</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat dentro de la aplicación</span>
              </li>
              {canInstallPWA && (
                <li>
                  <button onClick={installPWA} className="text-[#C4623A] font-semibold hover:underline flex items-center gap-1 mt-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Instalar en pantalla de inicio</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#C4623A]">Organizaciones</h4>
            <p className="text-xs text-white/70">
              ¿Representas un albergue, comedor comunitario o junta vecinal?
            </p>
            <button
              onClick={() => openCreateModal('request')}
              className="bg-[#2D6A4F] hover:bg-[#23533E] text-white px-4 py-2 rounded-xl text-xs font-semibold w-full transition shadow-sm"
            >
              Publicar solicitud de grupo
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} RedSolidaria. Conexión directa y transparente.</p>
          <p className="flex items-center gap-4">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Seguridad</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
