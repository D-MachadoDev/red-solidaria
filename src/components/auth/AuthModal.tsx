import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginDemo } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemo();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#E6E1DA] shadow-elevated overflow-hidden p-6 relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FEE9E1] text-[#C4623A] font-bold text-xl flex items-center justify-center mx-auto mb-2">
            RS
          </div>
          <h3 className="font-serif-warm text-2xl font-bold text-[#1C1814]">
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </h3>
          <p className="text-xs text-[#756D65] mt-1">
            Conecta con tu comunidad para donar o solicitar ayuda
          </p>
        </div>

        {/* Social Buttons Demo */}
        <div className="space-y-2 mb-4">
          <button
            onClick={loginDemo}
            className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition"
          >
            Continuar con Google
          </button>
          <button
            onClick={loginDemo}
            className="w-full py-2.5 px-4 bg-black text-white hover:bg-gray-800 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            Continuar con Apple
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold uppercase">o con correo</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-[#1C1814] mb-1">Nombre completo</label>
              <input
                type="text"
                placeholder="Camila Morales"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1C1814]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1C1814]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1C1814]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C4623A] hover:bg-[#AB512C] text-white font-bold text-xs rounded-2xl shadow transition active-press mt-2"
          >
            {isRegister ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-[#756D65]">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta todavía?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#C4623A] font-bold hover:underline"
          >
            {isRegister ? 'Iniciar sesión' : 'Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
};
