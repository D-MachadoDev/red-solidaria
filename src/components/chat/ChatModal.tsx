import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ChatModal: React.FC = () => {
  const { chats, activeChatId, openChat, closeChat, sendChatMessage, currentUser, addToast } = useApp();
  const [inputText, setInputText] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;
    sendChatMessage(activeChat.id, inputText);
    setInputText('');
  };

  const handleShareLocation = () => {
    if (!activeChat) return;
    const locationMsg = 'Ubicación sugerida: CAI de Policía Teusaquillo (Calle 34 # 19-20). Punto público y seguro.';
    sendChatMessage(activeChat.id, locationMsg);
    addToast({
      type: 'info',
      title: 'Punto seguro enviado',
      message: 'Ubicación compartida en el chat.',
    });
  };

  const handleMarkCompleted = () => {
    addToast({
      type: 'success',
      title: 'Entrega realizada',
      message: 'Publicación marcada como entregada.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-[#E6E1DA] shadow-elevated overflow-hidden min-h-[75vh] flex flex-col md:flex-row">
        {/* Left Conversation List */}
        <div className={`w-full md:w-80 border-r border-[#E6E1DA] flex flex-col bg-[#F9F6F0] ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#E6E1DA] bg-white">
            <h2 className="font-serif-warm text-xl font-bold text-[#1C1814]">Mensajes</h2>
            <p className="text-xs text-[#756D65]">Coordinación de entregas directas</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E6E1DA]">
            {chats.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#756D65]">
                No tienes mensajes activos todavía.
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = activeChat?.id === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => openChat(chat.id)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition ${
                      isActive ? 'bg-white font-semibold border-l-4 border-[#C4623A]' : 'hover:bg-white/60'
                    }`}
                  >
                    <img
                      src={chat.otherUser.avatar}
                      alt={chat.otherUser.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#E6E1DA]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-bold text-[#1C1814] truncate">{chat.otherUser.name}</span>
                        <span className="text-[10px] text-[#756D65]">{chat.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-[#C4623A] font-semibold truncate">{chat.itemTitle}</p>
                      <p className="text-xs text-[#756D65] truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Active Conversation Area */}
        {activeChat ? (
          <div className={`flex-1 flex flex-col bg-[#F7F4EF] ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
            {/* Header */}
            <div className="p-4 bg-white border-b border-[#E6E1DA] flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={closeChat}
                  className="md:hidden text-gray-500 font-bold text-lg p-1"
                >
                  ←
                </button>
                <img
                  src={activeChat.otherUser.avatar}
                  alt={activeChat.otherUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C4623A]"
                />
                <div>
                  <h3 className="font-bold text-sm text-[#1C1814] flex items-center gap-1">
                    {activeChat.otherUser.name}
                    {activeChat.otherUser.verified && (
                      <span className="text-blue-600 text-xs" title="Verificado">✓</span>
                    )}
                  </h3>
                  <p className="text-xs text-[#C4623A] font-medium">Publicación: {activeChat.itemTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkCompleted}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition shadow-xs"
                >
                  Marcar entregado
                </button>
              </div>
            </div>

            {/* Quick Safety Recommendation Bar */}
            <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-4 py-2 text-[11px] text-[#D97706] flex items-center justify-between">
              <span><strong>Seguridad:</strong> Se sugiere acordar entregas en espacios públicos y concurridos.</span>
              <button
                onClick={handleShareLocation}
                className="bg-[#D97706] text-white px-2.5 py-0.5 rounded-full font-bold hover:bg-[#B45309] transition ml-2 whitespace-nowrap"
              >
                Enviar punto seguro
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {/* Item Snapshot Header Card inside Thread */}
              <div className="bg-white p-3 rounded-2xl border border-[#E6E1DA] flex items-center gap-3 max-w-md mx-auto my-2">
                <img src={activeChat.itemImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#C4623A]">
                    {activeChat.itemType === 'donation' ? 'Donación' : 'Solicitud'}
                  </span>
                  <p className="font-bold text-[#1C1814]">{activeChat.itemTitle}</p>
                </div>
              </div>

              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.isMe
                        ? 'bg-[#C4623A] text-white rounded-br-none shadow-xs'
                        : 'bg-white text-[#1C1814] border border-[#E6E1DA] rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}

                    {msg.locationShare && (
                      <div className="mt-2 p-2 bg-black/10 rounded-xl border border-white/20 text-[11px] font-semibold">
                        Ubicación: {msg.locationShare.name}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#756D65] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E6E1DA] flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#F7F4EF] border border-[#E6E1DA] rounded-2xl text-xs text-[#1C1814] focus:outline-none focus:border-[#C4623A]"
              />
              <button
                type="submit"
                className="bg-[#C4623A] hover:bg-[#AB512C] text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow transition active-press"
              >
                Enviar
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400 text-xs">
            Selecciona una conversación para chatear.
          </div>
        )}
      </div>
    </div>
  );
};
