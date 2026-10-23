import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useCart();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isSizeGuideOpen) return null;

  const sizeData = [
    {
      size: 'FR 34 / XS',
      bust: { cm: '80–84', in: '31.5–33' },
      waist: { cm: '60–64', in: '23.6–25.2' },
      hip: { cm: '86–90', in: '33.8–35.4' },
      shoulder: { cm: '37.5', in: '14.8' },
    },
    {
      size: 'FR 36 / S',
      bust: { cm: '84–88', in: '33–34.6' },
      waist: { cm: '64–68', in: '25.2–26.8' },
      hip: { cm: '90–94', in: '35.4–37.0' },
      shoulder: { cm: '38.5', in: '15.2' },
    },
    {
      size: 'FR 38 / M',
      bust: { cm: '88–92', in: '34.6–36.2' },
      waist: { cm: '68–72', in: '26.8–28.3' },
      hip: { cm: '94–98', in: '37.0–38.6' },
      shoulder: { cm: '39.5', in: '15.6' },
    },
    {
      size: 'FR 40 / L',
      bust: { cm: '92–96', in: '36.2–37.8' },
      waist: { cm: '72–76', in: '28.3–29.9' },
      hip: { cm: '98–102', in: '38.6–40.2' },
      shoulder: { cm: '40.5', in: '16.0' },
    },
    {
      size: 'FR 42 / XL',
      bust: { cm: '96–100', in: '37.8–39.4' },
      waist: { cm: '76–80', in: '29.9–31.5' },
      hip: { cm: '102–106', in: '40.2–41.7' },
      shoulder: { cm: '41.5', in: '16.3' },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-[#2D2D2D] shadow-2xl p-6 md:p-8">
        <button
          onClick={closeSizeGuide}
          className="absolute top-4 right-4 p-2 text-[#C8C1B7] hover:text-[#FFFFFF] cursor-pointer"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-between pb-4 border-b border-[#2C2C2C]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E877E]">Atelier Proportions</span>
            <h2 className="font-editorial text-2xl text-[#F1EEE7]">Sizing & Measurement Guide</h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-[#222222] border border-[#333333] p-0.5">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                unit === 'cm' ? 'bg-[#F1EEE7] text-[#151515] font-semibold' : 'text-[#8E877E] hover:text-[#F1EEE7]'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                unit === 'in' ? 'bg-[#F1EEE7] text-[#151515] font-semibold' : 'text-[#8E877E] hover:text-[#F1EEE7]'
              }`}
            >
              IN
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A2A] text-[#8E877E] uppercase tracking-wider">
                <th className="py-2.5 px-3 font-medium">Standard</th>
                <th className="py-2.5 px-3 font-medium">Bust ({unit})</th>
                <th className="py-2.5 px-3 font-medium">Waist ({unit})</th>
                <th className="py-2.5 px-3 font-medium">Hip ({unit})</th>
                <th className="py-2.5 px-3 font-medium">Shoulder ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222] text-[#F1EEE7] font-mono tabular-nums">
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-[#202020] transition-colors">
                  <td className="py-3 px-3 font-sans font-medium text-[#C8C1B7]">{row.size}</td>
                  <td className="py-3 px-3">{row.bust[unit]}</td>
                  <td className="py-3 px-3">{row.waist[unit]}</td>
                  <td className="py-3 px-3">{row.hip[unit]}</td>
                  <td className="py-3 px-3">{row.shoulder[unit]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div className="mt-6 pt-5 border-t border-[#262626] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#9E978E]">
          <div>
            <h4 className="uppercase tracking-widest text-[#F1EEE7] text-[11px] mb-1 font-medium">
              Bust & Chest
            </h4>
            <p>Measure across the fullest part of the bust, keeping the measuring tape horizontal across your shoulder blades.</p>
          </div>
          <div>
            <h4 className="uppercase tracking-widest text-[#F1EEE7] text-[11px] mb-1 font-medium">
              Waist & High Rise
            </h4>
            <p>Measure around your natural waistline, approximately 2.5cm above your navel, where the garment waistband rests.</p>
          </div>
        </div>

        <div className="mt-6 bg-[#202020] border border-[#2F2F2F] p-3 text-xs text-[#C8C1B7] flex items-center justify-between">
          <span>Uncertain between two sizes? Our concierge provides custom tailored measurements.</span>
          <button
            onClick={closeSizeGuide}
            className="text-xs uppercase tracking-wider text-[#F1EEE7] underline hover:text-[#FFFFFF] cursor-pointer shrink-0 ml-4"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
