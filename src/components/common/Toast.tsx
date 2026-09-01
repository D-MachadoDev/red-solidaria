import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-6 md:right-6 md:left-auto md:translate-x-0 z-50 flex flex-col gap-2 max-w-sm w-[92vw] pointer-events-none">
      {toasts.map((toast) => {
        const bgStyle =
          toast.type === 'success'
            ? 'bg-[#2D6A4F] text-white border-[#52B788]'
            : toast.type === 'warning'
            ? 'bg-[#D97706] text-white border-[#FBBF24]'
            : toast.type === 'error'
            ? 'bg-[#DC2626] text-white border-[#F87171]'
            : 'bg-[#1C1814] text-white border-[#444]';

        const IconComponent =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'warning'
            ? AlertTriangle
            : toast.type === 'error'
            ? XCircle
            : Info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-elevated transition-all duration-300 transform translate-y-0 ${bgStyle}`}
          >
            <IconComponent className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
              {toast.message && <p className="text-xs opacity-90 mt-1 leading-snug">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white p-0.5"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
