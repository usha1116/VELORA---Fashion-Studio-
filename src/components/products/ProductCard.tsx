import React, { useState } from 'react';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../lib/currency';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  index = 0,
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickView } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFav = isWishlisted(product.id);

  const handleCardClick = () => {
    onNavigate(`/products/${product.slug}`);
  };

  return (
    <div className="group relative flex flex-col transition-all duration-500">
      {/* Outer Sculptural Vessel Frame */}
      <div className="relative w-full aspect-[3/4.2] rounded-[48px_48px_16px_16px] overflow-hidden bg-[#13151D] border border-white/[0.08] hover:border-white/20 transition-all duration-500 shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        
        {/* Subtle Architectural Blueprint Crosshairs */}
        <div className="absolute top-4 left-5 z-20 pointer-events-none flex items-center gap-1.5 font-tech text-[9px] tracking-[0.25em] text-[#9C9EAE]/70 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#853744]" />
          <span>[S-{String(index + 1).padStart(2, '0')}]</span>
        </div>

        {/* Fallback container */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#13151D] text-[#9C9EAE]">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-3">
              <span className="font-syne text-sm text-[#F5F2EB]">V</span>
            </div>
            <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#9C9EAE]">
              {product.name}
            </span>
          </div>
        )}

        {/* Actual Image with smooth kinetic depth */}
        {!imageError && (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={handleCardClick}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06] cursor-pointer filter contrast-[1.03] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#0B0C10]/80 backdrop-blur-md border border-white/10 hover:border-[#853744] flex items-center justify-center text-[#9C9EAE] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} className={isFav ? 'fill-[#853744] text-[#853744]' : ''} />
        </button>

        {/* Quick View Button: Slides Up from bottom on hover */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full py-2.5 px-4 bg-[#0B0C10]/90 hover:bg-[#853744] text-[#F5F2EB] text-[11px] font-tech uppercase tracking-[0.2em] rounded-full border border-white/15 hover:border-[#853744] transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer font-medium shadow-xl"
          >
            <Eye size={12} />
            <span>Quick Inspect</span>
          </button>
        </div>
      </div>

      {/* Product Metadata in avant-garde Syne & Tech fonts */}
      <div className="pt-4 px-1 flex flex-col justify-between">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-[10px] font-tech text-[#9C9EAE] uppercase tracking-[0.25em]">
            <span>{product.category}</span>
            <span className="text-[#C49774]">{product.material.split('&')[0]}</span>
          </div>

          {/* Product Name in sculptural Syne */}
          <h3
            onClick={handleCardClick}
            className="mt-1.5 font-syne text-base sm:text-lg font-semibold text-[#F5F2EB] group-hover:text-white transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Swatches */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-tech text-sm font-semibold text-[#F5F2EB] tabular-nums">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-tech text-xs text-[#9C9EAE]/60 line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colorway preview */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <button
              onClick={handleCardClick}
              className="text-[#9C9EAE] hover:text-[#FFFFFF] ml-1 transition-colors"
              aria-label={`View ${product.name}`}
            >
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
