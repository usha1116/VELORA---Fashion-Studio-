import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, Compass } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalItems, openCart } = useCart();
  const { totalWishlisted } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Silhouettes', path: '/collections' },
    { label: 'SS26 Campaign', path: '/collections/architectural-silhouettes' },
    { label: 'Gazette', path: '/journal' },
    { label: 'Maison', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Floating Glass Navigation Bar conforming strictly to Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0C10]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/50'
            : 'bg-transparent border-b border-white/[0.05] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element in Avant-Garde Syne) */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-left group cursor-pointer focus:outline-none shrink-0 flex items-center gap-2.5"
            aria-label="VELORA STUDIO Homepage"
          >
            <span className="w-2 h-2 rounded-full bg-[#853744] group-hover:scale-125 transition-transform" />
            <span className="font-syne text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#F5F2EB] uppercase group-hover:text-white transition-colors">
              VELORA
            </span>
            <span className="font-tech text-[10px] tracking-[0.3em] uppercase text-[#9C9EAE] font-light hidden sm:inline">
              STUDIO
            </span>
          </button>

          {/* Zone 2: 4–5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-9 font-tech text-xs tracking-[0.2em] uppercase text-[#9C9EAE]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 transition-all duration-200 whitespace-nowrap shrink-0 hover:text-[#F5F2EB] cursor-pointer ${
                    isActive ? 'text-[#F5F2EB] font-medium' : 'text-[#9C9EAE]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#853744] to-transparent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#9C9EAE] hover:text-[#F5F2EB] transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
              aria-label="Search catalog"
              title="Search collection (⌘K)"
            >
              <Search size={17} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('/collections')}
              className="relative p-2 text-[#9C9EAE] hover:text-[#F5F2EB] transition-colors cursor-pointer rounded-full hover:bg-white/[0.05] hidden sm:block"
              aria-label={`Wishlist (${totalWishlisted} saved)`}
              title="Archived Favorites"
            >
              <Heart size={17} className={totalWishlisted > 0 ? 'fill-[#853744] text-[#853744]' : ''} />
              {totalWishlisted > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#853744] text-white text-[9px] font-tech flex items-center justify-center tabular-nums">
                  {totalWishlisted}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with kinetic indicator */}
            <button
              onClick={openCart}
              className="group relative flex items-center gap-2.5 px-3.5 py-2 text-xs font-tech tracking-[0.15em] uppercase text-[#F5F2EB] bg-[#151720]/90 border border-white/10 hover:border-[#853744]/70 hover:bg-[#1A1D29] transition-all cursor-pointer rounded-full shadow-lg"
              aria-label={`Shopping bag containing ${totalItems} items`}
            >
              <ShoppingBag size={14} className="text-[#C49774] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-tech text-xs text-[#F5F2EB] tabular-nums font-semibold">
                ({totalItems})
              </span>
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#9C9EAE] hover:text-[#F5F2EB] cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-full bg-[#0B0C10]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl animate-fade-in">
            <nav className="flex flex-col space-y-3 font-tech">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-sm uppercase tracking-[0.2em] py-3 border-b border-white/[0.05] transition-colors ${
                    currentPath === link.path ? 'text-[#FFFFFF] pl-2 font-medium border-[#853744]' : 'text-[#9C9EAE]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
