import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewScreen,
  ItemPublication,
  UserProfile,
  ChatConversation,
  AppNotification,
  ToastAlert,
  PublicationType,
  CategoryType,
  ItemCondition,
} from '../types';
import {
  CURRENT_USER,
  INITIAL_DONATIONS,
  INITIAL_REQUESTS,
  INITIAL_CHATS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppContextType {
  currentView: ViewScreen;
  setCurrentView: (view: ViewScreen) => void;
  currentUser: UserProfile;
  donations: ItemPublication[];
  requests: ItemPublication[];
  chats: ChatConversation[];
  notifications: AppNotification[];
  toasts: ToastAlert[];
  savedItemIds: string[];
  
  // Modal states
  activeItem: ItemPublication | null;
  openItemDetail: (item: ItemPublication) => void;
  closeItemDetail: () => void;

  activeChatId: string | null;
  openChat: (chatId: string) => void;
  startChatWithUser: (item: ItemPublication) => void;
  closeChat: () => void;

  isCreateModalOpen: boolean;
  createModalType: PublicationType;
  openCreateModal: (type?: PublicationType) => void;
  closeCreateModal: () => void;

  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthenticated: boolean;
  loginDemo: () => void;
  logoutDemo: () => void;

  isNotificationsModalOpen: boolean;
  toggleNotificationsModal: () => void;

  // PWA & Network state
  isOffline: boolean;
  toggleOfflineMode: () => void;
  canInstallPWA: boolean;
  installPWA: () => void;

  // Actions
  addPublication: (pub: {
    type: PublicationType;
    title: string;
    description: string;
    category: CategoryType;
    condition: ItemCondition;
    images: string[];
    locationName: string;
    urgent: boolean;
    emergencyTag?: string;
    goalCount?: number;
    unit?: string;
  }) => void;
  toggleSaveItem: (itemId: string) => void;
  sendChatMessage: (chatId: string, text: string) => void;
  addToast: (toast: Omit<ToastAlert, 'id'>) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;
  claimItem: (item: ItemPublication) => void;
  fulfillRequest: (item: ItemPublication) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewScreen>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const [donations, setDonations] = useState<ItemPublication[]>(INITIAL_DONATIONS);
  const [requests, setRequests] = useState<ItemPublication[]>(INITIAL_REQUESTS);
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastAlert[]>([]);
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['don_1']);

  // Modals & Panels
  const [activeItem, setActiveItem] = useState<ItemPublication | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createModalType, setCreateModalType] = useState<PublicationType>('donation');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);

  // PWA state
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPWA, setCanInstallPWA] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      addToast({
        type: 'success',
        title: 'Conexión restaurada',
        message: 'RedSolidaria está nuevamente sincronizada.',
      });
    };
    const handleOffline = () => {
      setIsOffline(true);
      addToast({
        type: 'warning',
        title: 'Modo sin conexión',
        message: 'Navegando con la copia guardada en tu dispositivo.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const addToast = (toast: Omit<ToastAlert, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random();
    const newToast: ToastAlert = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openItemDetail = (item: ItemPublication) => {
    setActiveItem(item);
  };

  const closeItemDetail = () => {
    setActiveItem(null);
  };

  const openCreateModal = (type: PublicationType = 'donation') => {
    setCreateModalType(type);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginDemo = () => {
    setIsAuthenticated(true);
    closeAuthModal();
    addToast({
      type: 'success',
      title: '¡Bienvenid@ de nuevo!',
      message: `Sesión iniciada como ${currentUser.name}.`,
    });
  };

  const logoutDemo = () => {
    setIsAuthenticated(false);
    addToast({
      type: 'info',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente.',
    });
  };

  const openChat = (chatId: string) => {
    setActiveChatId(chatId);
    setCurrentView('chat');
  };

  const closeChat = () => {
    setActiveChatId(null);
  };

  const startChatWithUser = (item: ItemPublication) => {
    const existingChat = chats.find((c) => c.itemId === item.id);
    if (existingChat) {
      openChat(existingChat.id);
    } else {
      const newChatId = 'chat_' + Date.now();
      const newChat: ChatConversation = {
        id: newChatId,
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.images[0] || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300',
        itemType: item.type,
        otherUser: {
          id: item.user.id,
          name: item.user.name,
          avatar: item.user.avatar,
          verified: item.user.verified,
        },
        lastMessage: `Hola ${item.user.name}, me interesa tu ${item.type === 'donation' ? 'donación' : 'solicitud'}.`,
        lastMessageTime: 'Ahora',
        unreadCount: 0,
        status: 'active',
        messages: [
          {
            id: 'msg_init',
            senderId: currentUser.id,
            text: `Hola ${item.user.name}, vi tu publicación "${item.title}" y quisiera ponerme en contacto.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
          },
        ],
      };
      setChats((prev) => [newChat, ...prev]);
      openChat(newChatId);
      addToast({
        type: 'success',
        title: 'Chat iniciado',
        message: `Te has conectado con ${item.user.name}.`,
      });
    }
  };

  const toggleSaveItem = (itemId: string) => {
    setSavedItemIds((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removido de Guardados',
          message: 'El objeto ya no está en tu lista de marcadores.',
        });
        return prev.filter((id) => id !== itemId);
      } else {
        addToast({
          type: 'success',
          title: 'Guardado en Favoritos',
          message: 'Puedes acceder a este objeto desde tu perfil.',
        });
        return [...prev, itemId];
      }
    });
  };

  const addPublication = (pubData: {
    type: PublicationType;
    title: string;
    description: string;
    category: CategoryType;
    condition: ItemCondition;
    images: string[];
    locationName: string;
    urgent: boolean;
    emergencyTag?: string;
    goalCount?: number;
    unit?: string;
  }) => {
    const newPub: ItemPublication = {
      id: (pubData.type === 'donation' ? 'don_' : 'req_') + Date.now(),
      type: pubData.type,
      title: pubData.title,
      description: pubData.description,
      category: pubData.category,
      condition: pubData.condition,
      images: pubData.images.length > 0 ? pubData.images : ['https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop'],
      locationName: pubData.locationName || currentUser.location,
      distanceKm: 0.3,
      createdAt: 'Hace un momento',
      urgent: pubData.urgent,
      emergencyTag: pubData.emergencyTag,
      status: 'disponible',
      goalCount: pubData.goalCount || 1,
      currentCount: 0,
      unit: pubData.unit || 'unidades',
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        verified: currentUser.verified,
        rating: currentUser.rating,
      },
    };

    if (pubData.type === 'donation') {
      setDonations((prev) => [newPub, ...prev]);
      setCurrentUser((prev) => ({ ...prev, donationsCount: prev.donationsCount + 1 }));
      addToast({
        type: 'success',
        title: '¡Donación Publicada!',
        message: 'Tu objeto ya está visible para la comunidad cercana.',
      });
      setCurrentView('donations');
    } else {
      setRequests((prev) => [newPub, ...prev]);
      addToast({
        type: 'success',
        title: '¡Solicitud Creada!',
        message: 'Tu pedido de ayuda ha sido publicado con éxito.',
      });
      setCurrentView('requests');
    }

    closeCreateModal();
  };

  const sendChatMessage = (chatId: string, text: string) => {
    if (!text.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: 'm_' + Date.now(),
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: timeStr,
      isMe: true,
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: timeStr,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // Auto-reply response simulation after 2 seconds
    setTimeout(() => {
      const replies = [
        '¡Perfecto! Quedamos atentos para la entrega.',
        'Gracias por avisar, ¡nos vemos en el punto acordado!',
        '¡Genial! Aprecio muchísimo el apoyo comunitaria.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      setChats((prev) =>
        prev.map((c) => {
          if (c.id === chatId) {
            return {
              ...c,
              lastMessage: randomReply,
              lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              messages: [
                ...c.messages,
                {
                  id: 'm_reply_' + Date.now(),
                  senderId: c.otherUser.id,
                  text: randomReply,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isMe: false,
                },
              ],
            };
          }
          return c;
        })
      );
    }, 2000);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleNotificationsModal = () => {
    setIsNotificationsModalOpen((prev) => !prev);
  };

  const toggleOfflineMode = () => {
    setIsOffline((prev) => {
      const next = !prev;
      addToast({
        type: next ? 'warning' : 'success',
        title: next ? 'Simulador Offline Activado' : 'Conexión Restaurada',
        message: next ? 'Probando funcionamiento sin internet' : 'Modo en vivo activado',
      });
      return next;
    });
  };

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          addToast({
            type: 'success',
            title: '¡RedSolidaria Instalada!',
            message: 'La aplicación ahora está disponible en tu pantalla de inicio.',
          });
        }
        setDeferredPrompt(null);
        setCanInstallPWA(false);
      });
    } else {
      addToast({
        type: 'info',
        title: 'Instalación PWA',
        message: 'Para instalar, presiona "Añadir a la pantalla de inicio" en el menú de tu navegador.',
      });
    }
  };

  const claimItem = (item: ItemPublication) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    startChatWithUser(item);
    closeItemDetail();
    addToast({
      type: 'success',
      title: '¡Solicitud de contacto enviada!',
      message: `Has contactado a ${item.user.name} para acordar la entrega de "${item.title}".`,
    });
  };

  const fulfillRequest = (item: ItemPublication) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    startChatWithUser(item);
    closeItemDetail();
    addToast({
      type: 'success',
      title: '¡Gracias por ayudar!',
      message: `Has respondido a la solicitud de ${item.user.name}.`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        donations,
        requests,
        chats,
        notifications,
        toasts,
        savedItemIds,
        activeItem,
        openItemDetail,
        closeItemDetail,
        activeChatId,
        openChat,
        startChatWithUser,
        closeChat,
        isCreateModalOpen,
        createModalType,
        openCreateModal,
        closeCreateModal,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isAuthenticated,
        loginDemo,
        logoutDemo,
        isNotificationsModalOpen,
        toggleNotificationsModal,
        isOffline,
        toggleOfflineMode,
        canInstallPWA,
        installPWA,
        addPublication,
        toggleSaveItem,
        sendChatMessage,
        addToast,
        removeToast,
        markNotificationRead,
        claimItem,
        fulfillRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
