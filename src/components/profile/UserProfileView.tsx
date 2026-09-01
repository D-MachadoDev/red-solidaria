import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DonationCard } from '../feed/DonationCard';
import { RequestCard } from '../feed/RequestCard';

export const UserProfileView: React.FC = () => {
  const {
    currentUser,
    donations,
    requests,
    savedItemIds,
    openCreateModal,
    logoutDemo,
    setCurrentView,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my-donations' | 'my-requests' | 'saved' | 'impact'>('my-donations');

  const myDonations = donations.filter((d) => d.user.id === currentUser.id);
  const myRequests = requests.filter((r) => r.user.id === currentUser.id);

  const savedDonations = donations.filter((d) => savedItemIds.includes(d.id));
  const savedRequests = requests.filter((r) => savedItemIds.includes(r.id));
  const savedItems = [...savedDonations, ...savedRequests];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1DA] shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FEE9E1] to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#C4623A] shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif-warm text-2xl sm:text-3xl font-bold text-[#1C1814]">
                  {currentUser.name}
                </h1>
                {currentUser.verified && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    Perfil Verificado
                  </span>
                )}
              </div>
              <p className="text-xs text-[#756D65] flex items-center gap-2">
                <span>{currentUser.location}</span>
                <span>•</span>
                <span>Miembro desde {currentUser.joinedDate}</span>
              </p>
              <p className="text-xs text-[#6B6258] max-w-lg mt-1">{currentUser.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-end gap-2 w-full sm:w-auto">
            <button
              onClick={() => openCreateModal('donation')}
              className="bg-[#C4623A] hover:bg-[#AB512C] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow transition active-press"
            >
              + Nueva donación
            </button>
            <button
              onClick={logoutDemo}
              className="bg-[#F0EBE3] hover:bg-red-50 hover:text-red-600 text-[#6B6258] px-4 py-2 rounded-2xl text-xs font-semibold transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Impact Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-[#E6E1DA]">
          <div className="bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA] text-center">
            <p className="font-serif-warm text-2xl font-bold text-[#C4623A]">{currentUser.donationsCount}</p>
            <p className="text-[11px] font-semibold text-[#756D65]">Donaciones realizadas</p>
          </div>
          <div className="bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA] text-center">
            <p className="font-serif-warm text-2xl font-bold text-[#2D6A4F]">{currentUser.co2SavedKg} kg</p>
            <p className="text-[11px] font-semibold text-[#756D65]">CO2 evitado</p>
          </div>
          <div className="bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA] text-center">
            <p className="font-serif-warm text-2xl font-bold text-[#D97706]">{currentUser.rating} ★</p>
            <p className="text-[11px] font-semibold text-[#756D65]">({currentUser.ratingCount} reseñas)</p>
          </div>
          <div className="bg-[#F7F4EF] p-4 rounded-2xl border border-[#E6E1DA] text-center">
            <p className="font-serif-warm text-2xl font-bold text-blue-600">{currentUser.requestsFulfilled}</p>
            <p className="text-[11px] font-semibold text-[#756D65]">Ayudas entregadas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E6E1DA] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('my-donations')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeTab === 'my-donations'
              ? 'bg-[#C4623A] text-white shadow-sm'
              : 'bg-white text-[#6B6258] hover:bg-gray-100'
          }`}
        >
          Mis Donaciones ({myDonations.length})
        </button>
        <button
          onClick={() => setActiveTab('my-requests')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeTab === 'my-requests'
              ? 'bg-[#2D6A4F] text-white shadow-sm'
              : 'bg-white text-[#6B6258] hover:bg-gray-100'
          }`}
        >
          Mis Solicitudes ({myRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeTab === 'saved'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-[#6B6258] hover:bg-gray-100'
          }`}
        >
          Guardados ({savedItems.length})
        </button>
        <button
          onClick={() => setActiveTab('impact')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeTab === 'impact'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-[#6B6258] hover:bg-gray-100'
          }`}
        >
          Mi impacto ecológico
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'my-donations' && (
        <div>
          {myDonations.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E6E1DA] text-center max-w-md mx-auto">
              <h3 className="font-bold text-lg text-[#1C1814]">No tienes donaciones publicadas</h3>
              <p className="text-xs text-[#756D65] mt-1 mb-4">¿Tienes objetos que ya no usas?</p>
              <button
                onClick={() => openCreateModal('donation')}
                className="bg-[#C4623A] text-white text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Publicar donación
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myDonations.map((item) => (
                <DonationCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'my-requests' && (
        <div>
          {myRequests.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E6E1DA] text-center max-w-md mx-auto">
              <h3 className="font-bold text-lg text-[#1C1814]">No has publicado solicitudes de ayuda</h3>
              <p className="text-xs text-[#756D65] mt-1 mb-4">Si tú o tu comunidad necesitan apoyo, crea una solicitud.</p>
              <button
                onClick={() => openCreateModal('request')}
                className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Pedir ayuda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRequests.map((item) => (
                <RequestCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div>
          {savedItems.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E6E1DA] text-center max-w-md mx-auto">
              <h3 className="font-bold text-lg text-[#1C1814]">No tienes objetos guardados</h3>
              <p className="text-xs text-[#756D65] mt-1 mb-4">Haz clic en guardar en cualquier donación para tenerla a la mano.</p>
              <button
                onClick={() => setCurrentView('donations')}
                className="bg-[#C4623A] text-white text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Explorar donaciones
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) =>
                item.type === 'donation' ? (
                  <DonationCard key={item.id} item={item} />
                ) : (
                  <RequestCard key={item.id} item={item} />
                )
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="bg-white p-8 rounded-3xl border border-[#E6E1DA] space-y-6">
          <div>
            <h3 className="font-serif-warm text-2xl font-bold text-[#1C1814]">Resumen de impacto</h3>
            <p className="text-xs text-[#756D65]">Calculado según los bienes reutilizados en tu sector</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#E8F5E9] p-5 rounded-2xl border border-[#C8E6C9]">
              <p className="text-xs font-bold text-[#2D6A4F] uppercase">Emisiones evitadas</p>
              <p className="font-serif-warm text-3xl font-bold text-[#1C1814] mt-1">{currentUser.co2SavedKg} kg CO2</p>
              <p className="text-[11px] text-[#756D65] mt-2">Equivale a sembrar 4 árboles urbanos durante un año.</p>
            </div>

            <div className="bg-[#FEE9E1] p-5 rounded-2xl border border-[#FCD5C7]">
              <p className="text-xs font-bold text-[#C4623A] uppercase">Residuos evitado</p>
              <p className="font-serif-warm text-3xl font-bold text-[#1C1814] mt-1">65.2 kg</p>
              <p className="text-[11px] text-[#756D65] mt-2">Evitado de llegar a rellenos sanitarios locales.</p>
            </div>

            <div className="bg-[#FEF3C7] p-5 rounded-2xl border border-[#FDE68A]">
              <p className="text-xs font-bold text-[#D97706] uppercase">Personas conectadas</p>
              <p className="font-serif-warm text-3xl font-bold text-[#1C1814] mt-1">18 personas</p>
              <p className="text-[11px] text-[#756D65] mt-2">Conexión directa en tu barrio.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
