import React from 'react';
import { useApp } from '../../context/AppContext';
import { DonationCard } from '../feed/DonationCard';
import { RequestCard } from '../feed/RequestCard';
import { EmergencyPanel } from './EmergencyPanel';
import { AlertTriangle, HeartHandshake, ArrowRight, CheckCircle2, Download } from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setCurrentView, donations, requests, installPWA, canInstallPWA, scrollToEmergencies } = useApp();

  const previewDonations = donations.slice(0, 3);
  const previewRequests = requests.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* Emergency Alert Banner */}
      <div className="bg-[#DC2626] text-white px-4 py-3 text-xs md:text-sm font-semibold border-b border-red-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-white shrink-0" />
            <p>
              <strong>Alerta por lluvias y emergencias:</strong> prioridad alta para alimentos, cobijas y medicamentos en zonas afectadas.
            </p>
          </div>
          <button
            onClick={scrollToEmergencies}
            className="bg-white text-red-700 hover:bg-red-100 font-bold px-3.5 py-1 rounded-full text-xs transition whitespace-nowrap active-press focus:outline-none focus:ring-2 focus:ring-white"
          >
            Ver emergencias activas
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#FEE9E1] text-[#C4623A] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FCD5C7]">
              <HeartHandshake className="w-4 h-4" />
              <span>Comunidad & Ayuda Directa</span>
            </div>

            <h1 className="font-serif-warm text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1814] leading-[1.15] tracking-tight">
              Conecta lo que tienes con quien lo necesita hoy.
            </h1>

            <p className="text-base sm:text-lg text-[#756D65] leading-relaxed max-w-2xl font-normal">
              Pasa lo que ya no usas a vecinos que lo aprovechan o entrega ayuda inmediata en situaciones de emergencia. Sin intermediarios ni costos.
            </p>

            {/* Main CTAs */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setCurrentView('donations')}
                  className="bg-[#C4623A] hover:bg-[#AB512C] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-elevated transition active-press text-center flex items-center justify-center gap-2"
                >
                  <span>Empieza a ayudar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('requests')}
                  className="bg-[#2D6A4F] hover:bg-[#23533E] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-elevated transition active-press text-center"
                >
                  Pedir o consultar necesidades
                </button>
              </div>
              <p className="text-xs text-[#756D65]">Registro rápido en 30 segundos. Sin comisiones.</p>
            </div>

            {/* Key Benefits Bullets */}
            <div className="pt-6 border-t border-[#E6E1DA] space-y-2">
              <h3 className="text-xs uppercase font-bold text-[#C4623A] tracking-wider mb-3">Beneficios clave</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1C1814] font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4623A] shrink-0 mt-0.5" />
                  <span>Dale una segunda vida a objetos en buen estado que ocupan espacio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span>Encuentra ayuda directa cerca de ti cuando más la necesitas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4623A] shrink-0 mt-0.5" />
                  <span>Coordina entregas de forma organizada y directa entre personas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span>Apoya con suministros prioritarios durante lluvias, sismos o emergencias.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hero Visual Activity Preview */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-6 rounded-3xl border border-[#E6E1DA] shadow-elevated space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE3]">
                <span className="text-xs font-bold text-[#1C1814]">Publicaciones recientes en Bogotá</span>
                <span className="text-[11px] font-semibold text-[#2D6A4F] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>En tiempo real</span>
                </span>
              </div>

              <div className="bg-[#F9F6F0] p-4 rounded-2xl border border-[#E6E1DA] flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=120&h=120&fit=crop"
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[10px] font-bold text-[#C4623A] uppercase">Donar</span>
                  <h4 className="font-bold text-[#1C1814] leading-snug">Televisor Smart TV 42"</h4>
                  <p className="text-[#756D65] text-[11px]">María P. en Teusaquillo · A 1.2 km</p>
                </div>
              </div>

              <div className="bg-[#E8F5E9] p-4 rounded-2xl border border-[#C8E6C9] flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=120&h=120&fit=crop"
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase">Solicitar</span>
                  <h4 className="font-bold text-[#1C1814] leading-snug">Muletas de Adulto Mayor</h4>
                  <p className="text-[#756D65] text-[11px]">Comité Bosa · A 5.1 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Panel Section */}
      <EmergencyPanel />

      {/* Onboarding Cards Section */}
      <section className="bg-white py-16 border-y border-[#E6E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold text-[#C4623A] tracking-wider">Flujo de la plataforma</span>
            <h2 className="font-serif-warm text-3xl font-bold text-[#1C1814] mt-1">
              ¿Cómo funciona?
            </h2>
            <p className="text-xs text-[#756D65] mt-1">Tres pasos sencillos para conectar ayuda directa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F7F4EF] p-6 rounded-3xl border border-[#E6E1DA] space-y-3">
              <span className="inline-block bg-[#C4623A] text-white text-xs font-bold px-3 py-1 rounded-full">
                Paso 1: Donar
              </span>
              <h3 className="font-bold text-base text-[#1C1814]">Publica lo que no usas</h3>
              <p className="text-xs text-[#756D65] leading-relaxed">
                Publica ropa, alimentos o enseres en minutos. Lo que a ti te sobra le sirve a alguien más.
              </p>
            </div>

            <div className="bg-[#F7F4EF] p-6 rounded-3xl border border-[#E6E1DA] space-y-3">
              <span className="inline-block bg-[#2D6A4F] text-white text-xs font-bold px-3 py-1 rounded-full">
                Paso 2: Solicitar
              </span>
              <h3 className="font-bold text-base text-[#1C1814]">Pide lo que necesitas</h3>
              <p className="text-xs text-[#756D65] leading-relaxed">
                Pide lo que necesitas sin pena. Explica tu caso para recibir apoyo cercano de forma directa.
              </p>
            </div>

            <div className="bg-[#F7F4EF] p-6 rounded-3xl border border-[#E6E1DA] space-y-3">
              <span className="inline-block bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-full">
                Paso 3: Comunidad segura
              </span>
              <h3 className="font-bold text-base text-[#1C1814]">Conecta con confianza</h3>
              <p className="text-xs text-[#756D65] leading-relaxed">
                Revisa perfiles verificados y coordina entregas en puntos públicos recomendados por el chat interno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Donations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-warm text-2xl font-bold text-[#1C1814]">Donaciones activas</h2>
            <p className="text-xs text-[#756D65]">Objetos listos para entrega inmediata</p>
          </div>
          <button
            onClick={() => setCurrentView('donations')}
            className="text-xs font-bold text-[#C4623A] hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewDonations.map((item) => (
            <DonationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Featured Requests Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-warm text-2xl font-bold text-[#1C1814]">Solicitudes comunitarias</h2>
            <p className="text-xs text-[#756D65]">Personas y grupos que requieren apoyo</p>
          </div>
          <button
            onClick={() => setCurrentView('requests')}
            className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewRequests.map((item) => (
            <RequestCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* PWA Banner CTA */}
      {canInstallPWA && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1C1814] text-white p-8 md:p-12 rounded-3xl shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            <div className="space-y-2 text-left">
              <span className="bg-[#C4623A] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                Aplicación PWA
              </span>
              <h3 className="font-serif-warm text-2xl font-bold">
                Instala RedSolidaria en tu teléfono
              </h3>
              <p className="text-xs md:text-sm text-white/70 max-w-xl">
                Acceso directo desde tu pantalla de inicio y navegación en modo offline.
              </p>
            </div>
            <button
              onClick={installPWA}
              className="bg-white text-[#C4623A] hover:bg-[#FEE9E1] font-bold px-8 py-4 rounded-2xl text-sm shadow-md transition active-press whitespace-nowrap flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Instalar aplicación</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
