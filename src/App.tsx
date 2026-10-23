/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { QuickViewModal } from './components/products/QuickViewModal';
import { SizeGuideModal } from './components/products/SizeGuideModal';
import { SearchModal } from './components/search/SearchModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { HomeView } from './views/HomeView';
import { CollectionsView } from './views/CollectionsView';
import { CollectionDetailView } from './views/CollectionDetailView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { JournalDetailView } from './views/JournalDetailView';
import { X, Check } from 'lucide-react';

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { notification, clearNotification } = useCart();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Fallback
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomeView onNavigate={navigate} />;
    }

    if (currentPath === '/collections') {
      return <CollectionsView onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/collections/')) {
      const slug = currentPath.replace('/collections/', '');
      return <CollectionDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return <ProductDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutView onNavigate={navigate} />;
    }

    if (currentPath === '/journal') {
      return <JournalView onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      return <JournalDetailView slug={slug} onNavigate={navigate} />;
    }

    return <HomeView onNavigate={navigate} />;
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#0B0C10] text-[#F5F2EB] selection:bg-[#853744] selection:text-white">
      {/* Bespoke Interactive Custom Cursor */}
      <CustomCursor />

      {/* Subtle Living Background Atmosphere */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#853744]/[0.08] rounded-full blur-[140px] pointer-events-none animate-ambient-glow -z-10" />
      <div className="fixed bottom-1/4 right-10 w-[500px] h-[500px] bg-[#C49774]/[0.06] rounded-full blur-[150px] pointer-events-none animate-ambient-glow -z-10" />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#13151D] border border-white/20 text-xs font-tech text-[#F5F2EB] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check size={16} className="text-emerald-400 shrink-0" />
          <span>{notification}</span>
          <button
            onClick={clearNotification}
            className="text-[#888888] hover:text-[#FFFFFF] ml-2 p-1 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Floating Glass Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 w-full relative z-10">
        {renderView()}
      </main>

      {/* Architectural Maison Footer */}
      <Footer onNavigate={navigate} />

      {/* Modals and Drawers */}
      <CartDrawer onNavigate={navigate} />
      <CheckoutModal onNavigate={navigate} />
      <QuickViewModal onNavigate={navigate} />
      <SizeGuideModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <MainApp />
      </WishlistProvider>
    </CartProvider>
  );
}
