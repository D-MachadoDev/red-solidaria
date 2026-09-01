import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { OfflineBanner, InstallPWAPrompt } from './components/pwa/OfflineBanner';
import { ToastContainer } from './components/common/Toast';
import { LandingView } from './components/landing/LandingView';
import { DonationsFeed } from './components/feed/DonationsFeed';
import { RequestsFeed } from './components/feed/RequestsFeed';
import { UserProfileView } from './components/profile/UserProfileView';
import { ChatModal } from './components/chat/ChatModal';
import { SettingsView } from './components/settings/SettingsView';
import { ItemDetailModal } from './components/detail/ItemDetailModal';
import { PublicationFormModal } from './components/forms/PublicationFormModal';
import { AuthModal } from './components/auth/AuthModal';
import { NotificationsModal } from './components/notifications/NotificationsModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF] text-[#1C1814]">
      {/* Top Banners */}
      <OfflineBanner />
      <InstallPWAPrompt />

      {/* Header Navigation */}
      <Header />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-28 md:pb-0">
        {currentView === 'landing' && <LandingView />}
        {currentView === 'donations' && <DonationsFeed />}
        {currentView === 'requests' && <RequestsFeed />}
        {currentView === 'profile' && <UserProfileView />}
        {currentView === 'my-donations' && <UserProfileView />}
        {currentView === 'my-requests' && <UserProfileView />}
        {currentView === 'chat' && <ChatModal />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      <ItemDetailModal />
      <PublicationFormModal />
      <AuthModal />
      <NotificationsModal />

      {/* Feedback Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
