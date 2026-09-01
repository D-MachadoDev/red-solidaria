import React from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, SunMedium } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const { highContrast, toggleHighContrast, fontSize, setFontSize } = useApp();

  return (
    <div
      aria-label="Barra de accesibilidad visual"
      className="bg-[#1C1814] text-white px-4 py-1.5 text-xs border-b border-white/10 flex items-center justify-between gap-4 select-none"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <span className="font-semibold text-[11px] text-white/80 hidden sm:inline flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-[#C4623A]" />
          <span>Opciones de accesibilidad</span>
        </span>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          {/* High Contrast Button */}
          <button
            onClick={toggleHighContrast}
            aria-label={highContrast ? 'Cambiar a modo normal' : 'Cambiar a modo alto contraste'}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <SunMedium className="w-3 h-3" />
            <span>{highContrast ? 'Alto Contraste: ON' : 'Contraste'}</span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center bg-white/10 p-0.5 rounded-lg border border-white/20">
            <button
              onClick={() => setFontSize('normal')}
              aria-label="Tamaño de letra normal"
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === 'normal' ? 'bg-[#C4623A] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('large')}
              aria-label="Tamaño de letra grande"
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === 'large' ? 'bg-[#C4623A] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              aria-label="Tamaño de letra muy grande"
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === 'xlarge' ? 'bg-[#C4623A] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
