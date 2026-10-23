import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { JOURNAL_ARTICLES } from '../../data/journal';
import { formatINR } from '../../lib/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.material.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedArticles = trimmed
    ? JOURNAL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.excerpt.toLowerCase().includes(trimmed) ||
          a.kicker.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSelect = (path: string) => {
    onClose();
    onNavigate(path);
  };

  const quickKeywords = ['Virgin Wool', 'Mulberry Silk', 'Tailoring', 'Outerwear', 'Nocturne', 'Cashmere'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-[#2D2D2D] shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#2B2B2B] flex items-center gap-3">
          <SearchIcon size={20} className="text-[#8E877E] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, material, category, or essay..."
            className="w-full bg-transparent text-[#F1EEE7] placeholder-[#666666] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8E877E] hover:text-[#FFFFFF] text-xs p-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#8E877E] hover:text-[#FFFFFF] cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="p-6">
            <span className="text-xs uppercase tracking-widest text-[#8E877E] block mb-3 font-medium">
              Popular Atelier Inquiries
            </span>
            <div className="flex flex-wrap gap-2">
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 bg-[#222222] hover:bg-[#2C2C2C] text-xs text-[#C8C1B7] hover:text-[#F1EEE7] border border-[#333333] transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {matchedProducts.length === 0 && matchedArticles.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#8E877E]">
                No matching creations or articles found for "{query}".
              </div>
            ) : (
              <>
                {/* Product Matches */}
                {matchedProducts.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#8E877E] mb-3 font-semibold">
                      Creations ({matchedProducts.length})
                    </h3>
                    <div className="divide-y divide-[#242424]">
                      {matchedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelect(`/products/${product.slug}`)}
                          className="py-3 flex items-center justify-between hover:bg-[#202020] px-2 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-12 object-cover bg-[#222222]"
                            />
                            <div>
                              <h4 className="text-sm font-editorial text-[#F1EEE7] group-hover:text-white">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-[#8E877E]">{product.category} · {product.material}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-[#F1EEE7] tabular-nums">
                              {formatINR(product.price)}
                            </span>
                            <ArrowUpRight size={14} className="text-[#8E877E] group-hover:text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Matches */}
                {matchedArticles.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs uppercase tracking-widest text-[#8E877E] mb-3 font-semibold">
                      Journal & Philosophy ({matchedArticles.length})
                    </h3>
                    <div className="divide-y divide-[#242424]">
                      {matchedArticles.map((article) => (
                        <div
                          key={article.id}
                          onClick={() => handleSelect(`/journal/${article.slug}`)}
                          className="py-3 flex items-center justify-between hover:bg-[#202020] px-2 transition-colors cursor-pointer group"
                        >
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#8E877E]">{article.kicker}</span>
                            <h4 className="text-sm font-editorial text-[#F1EEE7] group-hover:text-white">
                              {article.title}
                            </h4>
                          </div>
                          <ArrowUpRight size={14} className="text-[#8E877E] group-hover:text-white shrink-0 ml-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
