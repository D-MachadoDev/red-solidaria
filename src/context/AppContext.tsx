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
  EmergencyCardData,
} from '../types';
import {
  CURRENT_USER,
  INITIAL_DONATIONS,
  INITIAL_REQUESTS,
  INITIAL_CHATS,
  INITIAL_NOTIFICATIONS,
  EMERGENCY_LIST,
} from '../data/mockData';

interface AppContextType {
  currentView: ViewScreen;
  setCurrentView: (view: ViewScreen) => void;
  currentUser: UserProfile;
  donations: ItemPublication[];
  requests: ItemPublication[];
  emergencies: EmergencyCardData[];
  chats: ChatConversation[];
  notifications: AppNotification[];
  toasts: ToastAlert[];
  savedItemIds: string[];
  
  // Accessibility state
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;

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

  // Navigation helpers
  scrollToEmergencies: () => void;

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
  deletePublication: (id: string) => void;
  toggleSaveItem: (itemId: string) => void;
  sendChatMessage: (chatId: string, text: string) => void;
  addToast: (toast: Omit<ToastAlert, 'id'>) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;
  claimItem: (item: ItemPublication) => void;
  fulfillRequest: (item: ItemPublication) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_DONATIONS = 'redsolidaria_donations_v1';
const LOCAL_STORAGE_KEY_REQUESTS = 'redsolidaria_requests_v1';
const LOCAL_STORAGE_KEY_ACCESSIBILITY = 'redsolidaria_accessibility_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewScreen>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Initialize donations & requests from localStorage if available
  const [donations, setDonations] = useState<ItemPublication[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DONATIONS);
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  const [requests, setRequests] = useState<ItemPublication[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [emergencies] = useState<EmergencyCardData[]>(EMERGENCY_LIST);
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastAlert[]>([]);
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['don_1']);

  // Accessibility States
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      const acc = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESSIBILITY);
      return acc ? JSON.parse(acc).highContrast : false;
    } catch {
      return false;
    }
  });

  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'xlarge'>(() => {
    try {
      const acc = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESSIBILITY);
      return acc ? JSON.parse(acc).fontSize : 'normal';
    } catch {
      return 'normal';
    }
  });

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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_DONATIONS, JSON.stringify(donations));
    } catch (e) {
      console.warn('Error al guardar donaciones en localStorage', e);
    }
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(requests));
    } catch (e) {
      console.warn('Error al guardar solicitudes en localStorage', e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESSIBILITY,
        JSON.stringify({ highContrast, fontSize })
      );
    } catch (e) {
      console.warn('Error al guardar accesibilidad', e);
    }

    // Apply high contrast class on root
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply font size class
    document.documentElement.classList.remove('font-size-large', 'font-size-xlarge');
    if (fontSize === 'large') {
      document.documentElement.classList.add('font-size-large');
    } else if (fontSize === 'xlarge') {
      document.documentElement.classList.add('font-size-xlarge');
    }
  }, [highContrast, fontSize]);

  // Global Escape key listener to close active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeItem) closeItemDetail();
        else if (isCreateModalOpen) closeCreateModal();
        else if (isAuthModalOpen) closeAuthModal();
        else if (isNotificationsModalOpen) toggleNotificationsModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, isCreateModalOpen, isAuthModalOpen, isNotificationsModalOpen]);

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

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const setFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSizeState(size);
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
      title: 'Sesión iniciada',
      message: `Has ingresado como ${currentUser.name}.`,
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

  const scrollToEmergencies = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
    }
    setTimeout(() => {
      const el = document.getElementById('panel-emergencias');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
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
          title: 'Removido de guardados',
          message: 'El objeto fue eliminado de tus marcadores.',
        });
        return prev.filter((id) => id !== itemId);
      } else {
        addToast({
          type: 'success',
          title: 'Objeto guardado',
          message: 'Tu donación queda registrada en este dispositivo.',
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
      id: (pubData.type === 'donation' ? 'don_loc_' : 'req_loc_') + Date.now(),
      type: pubData.type,
      title: pubData.title,
      description: pubData.description,
      category: pubData.category,
      condition: pubData.condition,
      images: pubData.images.length > 0 ? pubData.images : ['https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop'],
      locationName: pubData.locationName || currentUser.location,
      distanceKm: 0.2,
      createdAt: 'Hace un momento',
      urgent: pubData.urgent,
      emergencyTag: pubData.emergencyTag,
      status: 'disponible',
      isLocal: true,
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
        title: 'Donación publicada',
        message: 'Tu donación queda registrada en este dispositivo.',
      });
      setCurrentView('donations');
    } else {
      setRequests((prev) => [newPub, ...prev]);
      addToast({
        type: 'success',
        title: 'Solicitud publicada',
        message: 'Tu solicitud quedó publicada. Las personas cercanas podrán verla y contactarte.',
      });
      setCurrentView('requests');
    }

    closeCreateModal();
  };

  const deletePublication = (id: string) => {
    setDonations((prev) => prev.filter((item) => item.id !== id));
    setRequests((prev) => prev.filter((item) => item.id !== id));
    if (activeItem?.id === id) {
      closeItemDetail();
    }
    addToast({
      type: 'info',
      title: 'Publicación eliminada',
      message: 'La solicitud fue eliminada de este dispositivo.',
    });
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

    setTimeout(() => {
      const replies = [
        'Entendido, quedamos atentos para coordinar la entrega.',
        'Muchas gracias por comunicarte. Nos vemos en el punto acordado.',
        'Excelente, agradezco el apoyo directo.',
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
        title: next ? 'Modo sin conexión' : 'Conexión restaurada',
        message: next ? 'Navegando con copia local' : 'Conectado a la red',
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
            title: 'Aplicación instalada',
            message: 'RedSolidaria ahora está disponible en tu pantalla de inicio.',
          });
        }
        setDeferredPrompt(null);
        setCanInstallPWA(false);
      });
    } else {
      addToast({
        type: 'info',
        title: 'Instalación PWA',
        message: 'Presiona "Añadir a pantalla de inicio" desde el menú de tu navegador.',
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
  };

  const fulfillRequest = (item: ItemPublication) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    startChatWithUser(item);
    closeItemDetail();
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        donations,
        requests,
        emergencies,
        chats,
        notifications,
        toasts,
        savedItemIds,
        highContrast,
        fontSize,
        toggleHighContrast,
        setFontSize,
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
        scrollToEmergencies,
        addPublication,
        deletePublication,
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
