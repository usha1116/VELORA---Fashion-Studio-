import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../lib/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/products/ProductCard';
import {
  Heart,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  Check,
  ArrowLeft,
  Share2,
} from 'lucide-react';

interface ProductDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ slug, onNavigate }) => {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const { addItem, openSizeGuide } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    details: true,
    care: false,
    shipping: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isFav = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage('Please specify an atelier size to proceed.');
      return;
    }
    setErrorMessage('');
    const success = addItem(product, selectedSize, activeColor, quantity);
    if (success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1500);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collectionSlug === product.collectionSlug)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between font-tech text-xs text-[#9C9EAE] pb-4 border-b border-white/[0.08]">
        <button
          onClick={() => onNavigate('/collections')}
          className="inline-flex items-center gap-2 hover:text-[#FFFFFF] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Silhouettes / {product.category}</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-[#FFFFFF] transition-colors cursor-pointer"
            title="Copy link"
          >
            <Share2 size={13} />
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Purchase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Arched Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image in Arched Vessel */}
          <div className="relative aspect-[3/4.2] rounded-[100px_100px_24px_24px] overflow-hidden bg-[#13151D] border border-white/15 shadow-2xl">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} editorial view`}
              className="w-full h-full object-cover object-top"
            />

            {/* Blueprint Index Tag */}
            <div className="absolute bottom-5 right-5 bg-[#0B0C10]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-tech text-[#C49774] border border-white/10">
              FRAME 0{selectedImageIndex + 1} / 0{product.images.length}
            </div>
          </div>

          {/* Thumbnail Selectors */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 aspect-[3/4] rounded-2xl bg-[#161822] border cursor-pointer overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#F5F2EB] ring-2 ring-[#853744]'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 self-start">
          <div>
            {/* Category and Made In */}
            <div className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.25em] text-[#C49774]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.madeIn}</span>
            </div>

            {/* Title in bold Syne */}
            <h1 className="mt-2 font-syne text-3xl sm:text-4xl font-bold text-[#F5F2EB] leading-tight">
              {product.name}
            </h1>

            {/* Price in INR */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-tech text-2xl font-bold text-[#F5F2EB] tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-tech text-base text-[#9C9EAE]/60 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-1 font-tech text-xs text-[#9C9EAE] font-light">
              Includes complimentary insured air delivery and signature archival box.
            </p>
          </div>

          {/* Editorial Note Callout */}
          <div className="p-4 bg-[#13151D] border border-white/[0.08] rounded-2xl text-xs text-[#9C9EAE] leading-relaxed">
            <span className="text-[#F5F2EB] font-syne font-semibold block uppercase tracking-wider text-[11px] mb-1">
              Creative Director’s Thesis
            </span>
            {product.editorialNote}
          </div>

          {/* Colorway Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-tech text-xs uppercase tracking-wider">
              <span className="text-[#9C9EAE]">Atelier Hue:</span>
              <span className="text-[#F5F2EB] font-medium">{activeColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-8 h-8 rounded-full border transition-all cursor-pointer ${
                    selectedColorIndex === idx
                      ? 'border-[#F5F2EB] ring-2 ring-[#853744] ring-offset-2 ring-offset-[#0B0C10]'
                      : 'border-white/20 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3 font-tech">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-[#9C9EAE] font-medium">
                Atelier Sizing <span className="text-rose-400">*</span>
              </span>
              <button
                type="button"
                onClick={openSizeGuide}
                className="flex items-center gap-1 text-[#C49774] hover:text-[#FFFFFF] underline cursor-pointer"
              >
                <Ruler size={13} />
                <span>Size & Measurements Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setErrorMessage('');
                  }}
                  className={`py-2.5 px-2 text-xs uppercase tracking-wider rounded-xl transition-all font-medium border cursor-pointer ${
                    selectedSize === size
                      ? 'border-[#F5F2EB] bg-[#F5F2EB] text-[#0B0C10] font-semibold'
                      : 'border-white/10 bg-[#13151D] text-[#9C9EAE] hover:border-white/30'
                  }`}
                >
                  {size.split('/')[0]}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 font-medium pt-1 animate-pulse">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-[#9C9EAE]/80">
              {product.fit} · {product.dimensions}
            </p>
          </div>

          {/* Primary Buy CTA & Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 font-tech text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#F5F2EB] hover:bg-white text-[#0B0C10]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · {formatINR(product.price * quantity)}</span>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-14 rounded-full border border-white/15 hover:border-[#853744] bg-[#13151D] flex items-center justify-center text-[#9C9EAE] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} className={isFav ? 'fill-[#853744] text-[#853744]' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 font-tech text-[10px] text-[#9C9EAE]">
              <div className="p-2.5 rounded-xl bg-[#13151D] border border-white/[0.06]">
                <Truck size={13} className="mx-auto mb-1 text-[#C49774]" />
                <span>White-Glove Courier</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#13151D] border border-white/[0.06]">
                <ShieldCheck size={13} className="mx-auto mb-1 text-[#C49774]" />
                <span>Numbered Atelier Edition</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#13151D] border border-white/[0.06]">
                <RefreshCw size={13} className="mx-auto mb-1 text-[#C49774]" />
                <span>14-Day Adjustment</span>
              </div>
            </div>
          </div>

          {/* Accordion Modules */}
          <div className="border-t border-white/[0.08] divide-y divide-white/[0.08] font-tech text-xs">
            {/* Details & Construction */}
            <div className="py-4">
              <button
                onClick={() => toggleSection('details')}
                className="w-full flex items-center justify-between text-[#F5F2EB] uppercase tracking-wider font-medium text-left cursor-pointer"
              >
                <span>Construction & Materials</span>
                {openSections.details ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSections.details && (
                <div className="mt-3 space-y-2 text-[#9C9EAE] leading-relaxed font-light">
                  <p><strong>Primary Fabric:</strong> {product.material}</p>
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Atelier Care */}
            <div className="py-4">
              <button
                onClick={() => toggleSection('care')}
                className="w-full flex items-center justify-between text-[#F5F2EB] uppercase tracking-wider font-medium text-left cursor-pointer"
              >
                <span>Garment Care & Longevity</span>
                {openSections.care ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSections.care && (
                <div className="mt-3 space-y-1.5 text-[#9E978E] leading-relaxed font-light">
                  <ul className="list-disc pl-4 space-y-1">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="py-4">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between text-[#F5F2EB] uppercase tracking-wider font-medium text-left cursor-pointer"
              >
                <span>White-Glove Shipping & Returns</span>
                {openSections.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSections.shipping && (
                <div className="mt-3 space-y-2 text-[#9C9EAE] leading-relaxed font-light">
                  <p>
                    All creations are hand-packaged in our breathable cotton atelier suit carrier with personalized consignment docket.
                  </p>
                  <p>
                    Dispatched within 24-48 hours via insured air express courier across India. Sizing exchanges accommodated within 14 days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Capsule Pieces */}
      <section className="pt-16 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block mb-1">
              Harmonies
            </span>
            <h2 className="font-syne text-3xl text-[#F5F2EB] font-bold uppercase">
              Complete The Silhouette
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/collections')}
            className="font-tech text-xs uppercase tracking-[0.2em] text-[#9C9EAE] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Explore Wardrobe
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
};
