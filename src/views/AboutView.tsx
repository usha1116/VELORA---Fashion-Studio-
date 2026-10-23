import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24">
      {/* Editorial Header */}
      <section className="border-b border-[#262626] bg-[#141414] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8C1B7] font-medium block">
              The House of VELORA
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-[#F1EEE7] font-light leading-[1.1]">
              Clothing as Personal Architecture.
            </h1>
            <p className="text-sm sm:text-base text-[#9E978E] font-light leading-relaxed">
              VELORA STUDIO was founded on a singular conviction: that contemporary luxury does not reside in decorative excess, but in the absolute mastery of silhouette, tactile cloth, and structural poise.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: The Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#8E877E]">
              Foundational Thesis
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F1EEE7] leading-tight">
              Statuesque Femininity without Constraint
            </h2>
            <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed">
              Our silhouettes draw inspiration from brutalist architecture—the clean cantilever of reinforced concrete, the dramatic play of daylight against raw travertine, and the calm spatial volume of sacred spaces.
            </p>
            <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed">
              When transposed onto the human body, this philosophy translates into garments with distinct physical presence: structured shoulders that grant confidence, bias-cut drapes that move with liquid grace, and generous hemlines that break with rhythmic dignity.
            </p>
            <div className="pt-2">
              <blockquote className="font-editorial italic text-xl text-[#F1EEE7] border-l-2 border-[#612C35] pl-4">
                "We do not decorate the woman; we provide the architectural space for her presence to command the room."
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/5] bg-[#222] border border-[#2D2D2D] overflow-hidden shadow-2xl">
              <img
                src="/src/assets/images/hero_velora_editorial_1792764508905.jpg"
                alt="Atelier Architectural Form"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Material Provenance Atlas */}
      <section className="bg-[#121212] border-t border-b border-[#252525] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#8E877E] block mb-2">
              Provenance Atlas
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F1EEE7]">
              Centuries of Mill Heritage
            </h2>
            <p className="text-xs sm:text-sm text-[#9E978E] mt-3 leading-relaxed">
              We reject industrial homogenization. Every fabric in the VELORA repertoire is sourced directly from heritage family-owned mills dedicated to artisanal methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-[#181818] border border-[#282828]">
              <div className="flex items-center gap-2 text-xs text-[#612C35] font-mono mb-3">
                <MapPin size={14} />
                <span>BIELLA, ITALY</span>
              </div>
              <h3 className="font-editorial text-xl text-[#F1EEE7] mb-2">High-Twist Virgin Wool</h3>
              <p className="text-xs text-[#8E877E] leading-relaxed">
                Milled from pure alpine spring water and natural wools. Unmatched resilience, crisp crease retention, and zero synthetic polymers.
              </p>
            </div>

            <div className="p-6 bg-[#181818] border border-[#282828]">
              <div className="flex items-center gap-2 text-xs text-[#612C35] font-mono mb-3">
                <MapPin size={14} />
                <span>COMO, ITALY</span>
              </div>
              <h3 className="font-editorial text-xl text-[#F1EEE7] mb-2">40-Momme Silk Crepe</h3>
              <p className="text-xs text-[#8E877E] leading-relaxed">
                Grade-6A Mulberry silk woven on traditional looms. A weighty, cooling hand that cascades like liquid marble.
              </p>
            </div>

            <div className="p-6 bg-[#181818] border border-[#282828]">
              <div className="flex items-center gap-2 text-xs text-[#612C35] font-mono mb-3">
                <MapPin size={14} />
                <span>HAWICK, SCOTLAND</span>
              </div>
              <h3 className="font-editorial text-xl text-[#F1EEE7] mb-2">Scottish Cashmere</h3>
              <p className="text-xs text-[#8E877E] leading-relaxed">
                Spun in the Scottish borders from 2-ply long-staple fibers. Dense 7-gauge knitting that resists pilling across decades.
              </p>
            </div>

            <div className="p-6 bg-[#181818] border border-[#282828]">
              <div className="flex items-center gap-2 text-xs text-[#612C35] font-mono mb-3">
                <MapPin size={14} />
                <span>KYOTO, JAPAN</span>
              </div>
              <h3 className="font-editorial text-xl text-[#F1EEE7] mb-2">Raw Mulberry Slub</h3>
              <p className="text-xs text-[#8E877E] leading-relaxed">
                Hand-reeled wild silk with tactile slub variations, colored exclusively in vegetable tannins and mineral earth dyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 3: The Atelier Craft */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[4/3] bg-[#222] border border-[#2D2D2D] overflow-hidden">
              <img
                src="/src/assets/images/editorial_craft_atelier_1792764511170.jpg"
                alt="Tactile Atelier Fabrics"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#8E877E]">
              Atelier Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F1EEE7] leading-tight">
              Floating Canvas & Hand-Finished Joinery
            </h2>
            <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed">
              Every VELORA tailored jacket requires 38 hours of meticulous assembly. Rather than fusing stiff glue to the outer cloth, our master tailors secure floating horsehair canvas by thousands of loose blind stitches.
            </p>
            <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed">
              The result is a garment that breathes, flexes, and conforms dynamically to your individual posture. It is tailoring as an intimate partnership between garment and body.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/collections/architectural-silhouettes')}
                className="px-6 py-3 bg-[#F1EEE7] hover:bg-[#FFFFFF] text-[#151515] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Experience The Tailoring</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
