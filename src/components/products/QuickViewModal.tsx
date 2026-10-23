import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/currency';

interface QuickViewModalProps {
  onNavigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigate }) => {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!quickViewProduct) return null;

  const activeColor = quickViewProduct.colors[selectedColorIndex] || quickViewProduct.colors[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please specify an atelier size to proceed.');
      return;
    }
    setErrorMsg('');
    const success = addItem(quickViewProduct, selectedSize, activeColor, 1);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeQuickView();
      }, 900);
    }
  };

  const handleFullDetail = () => {
    closeQuickView();
    onNavigate(`/products/${quickViewProduct.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#12141D] border border-white/15 rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 text-[#9C9EAE] hover:text-[#FFFFFF] bg-[#0B0C10]/80 hover:bg-[#0B0C10] rounded-full transition-colors cursor-pointer border border-white/10"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[3/4.2] md:aspect-auto bg-[#161822] overflow-hidden">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Info & Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            <div className="flex items-center gap-2 font-tech text-[10px] text-[#C49774] uppercase tracking-[0.25em]">
              <span>{quickViewProduct.category}</span>
              <span aria-hidden="true">·</span>
              <span>{quickViewProduct.madeIn}</span>
            </div>

            <h2 className="mt-2 font-syne text-2xl font-bold text-[#F5F2EB] leading-tight">
              {quickViewProduct.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-tech text-lg font-bold text-[#F5F2EB] tabular-nums">
                {formatINR(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="font-tech text-xs text-[#9C9EAE]/60 line-through tabular-nums">
                  {formatINR(quickViewProduct.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-4 font-sans text-xs text-[#9C9EAE] leading-relaxed line-clamp-3 font-light">
              {quickViewProduct.description}
            </p>

            {/* Colorway Swatches */}
            <div className="mt-5">
              <label className="block font-tech text-xs uppercase tracking-wider text-[#9C9EAE] mb-2 font-medium">
                Colorway: <span className="text-[#F5F2EB]">{activeColor.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {quickViewProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'ring-2 ring-[#853744] ring-offset-2 ring-offset-[#12141D]'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-5 font-tech">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-[#9C9EAE] font-medium">
                  Size <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-[#9C9EAE]/70">European Metric</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMsg('');
                    }}
                    className={`py-2 px-2 text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center font-medium border ${
                      selectedSize === size
                        ? 'border-[#F5F2EB] bg-[#F5F2EB] text-[#0B0C10] font-semibold'
                        : 'border-white/10 text-[#9C9EAE] hover:border-white/30 bg-[#161822]'
                    }`}
                  >
                    {size.split('/')[0]}
                  </button>
                ))}
              </div>
              {errorMsg && <p className="mt-2 text-xs text-rose-400 font-medium">{errorMsg}</p>}
            </div>
          </div>

          <div className="mt-7 space-y-3 pt-4 border-t border-white/[0.08] font-tech">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#F5F2EB] text-[#0B0C10] hover:bg-white'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check size={16} />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <span>Add to Shopping Bag</span>
              )}
            </button>

            <button
              onClick={handleFullDetail}
              className="w-full py-2 text-xs uppercase tracking-wider text-[#9C9EAE] hover:text-[#FFFFFF] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Full Pattern Blueprint</span>
              <ArrowRight size={13} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#9C9EAE]/70 pt-1">
              <ShieldCheck size={13} className="text-[#C49774]" />
              <span>Complimentary insured air courier & atelier returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
