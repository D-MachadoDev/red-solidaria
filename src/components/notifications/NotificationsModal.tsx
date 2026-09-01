import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsModalOpen,
    toggleNotificationsModal,
    notifications,
    markNotificationRead,
    openChat,
  } = useApp();

  if (!isNotificationsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full border border-[#E6E1DA] shadow-elevated overflow-hidden mt-12 flex flex-col max-h-[80vh]">
        <div className="px-5 py-4 border-b border-[#E6E1DA] flex items-center justify-between bg-[#F7F4EF]">
          <div>
            <h3 className="font-serif-warm text-lg font-bold text-[#1C1814]">Avisos y notificaciones</h3>
            <p className="text-[11px] text-[#756D65]">Novedades en tiempo real</p>
          </div>
          <button
            onClick={toggleNotificationsModal}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E6E1DA]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#756D65]">
              No tienes avisos pendientes.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.linkId) openChat(notif.linkId);
                  toggleNotificationsModal();
                }}
                className={`p-4 hover:bg-gray-50 transition cursor-pointer flex gap-3 ${
                  !notif.read ? 'bg-amber-50/50 font-medium' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-bold text-[#1C1814]">{notif.title}</span>
                    <span className="text-[10px] text-[#756D65]">{notif.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#6B6258] leading-snug">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
