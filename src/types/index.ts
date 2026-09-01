export type ViewScreen =
  | 'landing'
  | 'donations'
  | 'requests'
  | 'profile'
  | 'my-donations'
  | 'my-requests'
  | 'chat'
  | 'settings';

export type PublicationType = 'donation' | 'request';

export type CategoryType =
  | 'Todas'
  | 'Tecnología'
  | 'Ropa'
  | 'Alimentos'
  | 'Muebles'
  | 'Salud/Medicinas'
  | 'Juguetes'
  | 'Mascotas'
  | 'Herramientas'
  | 'Educación'
  | 'Hogar'
  | 'Medicamentos'
  | 'Emergencias';

export type ItemCondition = 'Nuevo / Sin Usar' | 'Como Nuevo' | 'Buen Estado' | 'Usado Aceptable';

export type EmergencyStatus = 'urgente' | 'en_proceso' | 'parcialmente_cubierta' | 'cubierta';

export interface EmergencyCardData {
  id: string;
  type: string;
  location: string;
  exactNeeds: string;
  urgencyLevel: 'Alta Urgencia' | 'Urgencia Media' | 'Baja Urgencia';
  timeRemaining: string;
  status: EmergencyStatus;
  statusText: string;
  category: 'Alimentos' | 'Ropa' | 'Medicamentos' | 'Hogar' | 'Emergencias';
  description: string;
  linkedPublication: ItemPublication;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  verified: boolean;
  donationsCount: number;
  requestsFulfilled: number;
  co2SavedKg: number;
  rating: number;
  ratingCount: number;
  joinedDate: string;
  bio: string;
}

export interface ItemPublication {
  id: string;
  type: PublicationType;
  title: string;
  description: string;
  category: CategoryType;
  condition: ItemCondition;
  images: string[];
  locationName: string;
  distanceKm: number;
  createdAt: string;
  urgent: boolean;
  emergencyTag?: string;
  status: 'disponible' | 'en_proceso' | 'completado' | 'pausado';
  isLocal?: boolean;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
  };
  goalCount?: number;
  currentCount?: number;
  unit?: string;
  savedByUsers?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  locationShare?: {
    name: string;
    lat: number;
    lng: number;
  };
}

export interface ChatConversation {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemType: PublicationType;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  status: 'active' | 'agreed' | 'completed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'chat' | 'request' | 'system' | 'emergency';
  linkId?: string;
}

export interface ToastAlert {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}
