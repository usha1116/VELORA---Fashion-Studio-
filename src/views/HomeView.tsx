import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Compass, Sparkles, Layers, Sliders, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ProductCard } from '../components/products/ProductCard';
import { formatINR } from '../lib/currency';
import { useCart } from '../context/CartContext';
import { useScrollParallax } from '../hooks/useScrollParallax';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { openQuickView } = useCart();
  const [activeSilhouetteIndex, setActiveSilhouetteIndex] = useState(0);

  // Subtle scroll parallax offsets for depth
  const heroParallax = useScrollParallax(0.14);
  const editorialParallax = useScrollParallax(0.08);

  // 4 flagship campaign looks for interactive silhouette dial
  const flagshipSilhouettes = [
    {
      id: 'vel-002',
      slug: 'sculpted-cocoon-trench-coat',
      title: 'The Sculpted Cocoon Trench',
      category: 'Outerwear',
      weight: '480gsm Melange Storm Wool',
      fabric: 'Biella Wool & Cashmere',
      image: '/src/assets/images/hero_velora_editorial_1792764508905.jpg',
      price: 76000,
      quote: 'Pagoda shoulder articulation sculpted to command spatial presence.',
    },
    {
      id: 'vel-003',
      slug: 'fluid-cowl-silk-column-gown',
      title: 'The Fluid Cowl Silk Column',
      category: 'Dresses & Silks',
      weight: '40-Momme Pure Silk Crepe',
      fabric: 'Como Mulberry Silk',
      image: '/src/assets/images/product_silk_column_dress_1792764512732.jpg',
      price: 52000,
      quote: 'Statuesque liquid obsidian drape revealing a dramatic cowl spine.',
    },
    {
      id: 'vel-001',
      slug: 'architectural-double-breasted-blazer',
      title: 'Architectural Peak Blazer',
      category: 'Tailoring',
      weight: '320gsm High-Twist Weave',
      fabric: 'Italian Virgin Wool',
      image: '/src/assets/images/product_architectural_blazer_1792764512764.jpg',
      price: 48500,
      quote: 'Exaggerated peak lapels floating over horsehair canvas structure.',
    },
    {
      id: 'vel-004',
      slug: 'raw-mulberry-pleated-wrap-tunic',
      title: 'Raw Mulberry Origami Tunic',
      category: 'Dresses & Silks',
      weight: 'Hand-Reeled Textured Slub',
      fabric: 'Kyoto Raw Silk & Belgian Flax',
      image: '/src/assets/images/editorial_craft_atelier_1792764511170.jpg',
      price: 38500,
      quote: 'Accordion pleats folded by hand following ancient origami mathematics.',
    },
  ];

  const activeLook = flagshipSilhouettes[activeSilhouetteIndex];
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="space-y-24 sm:space-y-36 overflow-hidden">
      {/* 1. HERO OPENING: Dynamic Avant-Garde Composition with Subtle Scroll Parallax */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Top Blueprint Coordinates Header */}
        <div className="flex items-center justify-between font-tech text-[10px] tracking-[0.25em] text-[#9C9EAE] uppercase pb-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#853744] animate-pulse" />
            <span className="text-[#F5F2EB] font-medium">SS26 Runway Debut</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>45.4642° N · Milan Atelier</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#C49774]">
            <span>Architectural Volumetrics</span>
            <span className="text-white/20">/</span>
            <span>Hand-Numbered 01–50</span>
          </div>
        </div>

        {/* Center Split: Dramatic Typography + Arched Floating Hero Frame with Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-10 sm:py-14 flex-1">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            <div className="space-y-2">
              <span className="font-tech text-xs uppercase tracking-[0.35em] text-[#C49774] font-medium block">
                Collection 01 · Kinetic Architecture
              </span>
              <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F5F2EB] leading-[1.04] tracking-tight uppercase">
                Forms in Tension.<br />
                <span className="font-italiana italic lowercase text-[#C49774] font-normal tracking-normal text-5xl sm:text-7xl lg:text-8xl">
                  silhouettes
                </span> in motion.
              </h1>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#9C9EAE] font-light leading-relaxed max-w-xl">
              An avant-garde dialogue between brutalist geometric tailoring and liquid Mulberry silks. Engineered in our Milanese atelier with floating horsehair canvas to grant the body statuesque poise without restriction.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/collections/architectural-silhouettes')}
                className="px-7 py-4 bg-[#F5F2EB] hover:bg-white text-[#0B0C10] font-tech text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-full cursor-pointer flex items-center gap-3 shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:scale-105"
              >
                <span>Explore SS26 Silhouettes</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('/journal/the-anatomy-of-drape')}
                className="px-6 py-4 bg-[#151720]/80 hover:bg-[#1E212D] text-[#9C9EAE] hover:text-[#F5F2EB] border border-white/10 font-tech text-xs uppercase tracking-[0.2em] rounded-full transition-all cursor-pointer"
              >
                Read Atelier Treatise
              </button>
            </div>

            {/* Technical Spec Matrix */}
            <div className="pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 font-tech text-xs">
              <div>
                <span className="block text-[#F5F2EB] font-bold text-sm">320–480<span className="text-[10px] text-[#9C9EAE]">gsm</span></span>
                <span className="text-[10px] text-[#9C9EAE] uppercase tracking-wider">Italian Wool Weave</span>
              </div>
              <div>
                <span className="block text-[#F5F2EB] font-bold text-sm">40<span className="text-[10px] text-[#9C9EAE]">momme</span></span>
                <span className="text-[10px] text-[#9C9EAE] uppercase tracking-wider">Mulberry Crepe</span>
              </div>
              <div>
                <span className="block text-[#C49774] font-bold text-sm">Zero<span className="text-[10px] text-[#9C9EAE] ml-1">Glue</span></span>
                <span className="text-[10px] text-[#9C9EAE] uppercase tracking-wider">Floating Canvas</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column: Arched Frame with Smooth Scroll Parallax */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#853744]/25 to-[#C49774]/15 rounded-full blur-3xl -z-10 animate-ambient-glow" />

            {/* Arched Architectural Photo with Scroll-Triggered Parallax */}
            <div
              data-cursor="image"
              data-cursor-text="SS26 RUNWAY"
              className="relative w-full max-w-md aspect-[3/4.2] rounded-[140px_140px_20px_20px] overflow-hidden bg-[#13151D] border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] cursor-pointer"
              onClick={() => onNavigate('/products/sculpted-cocoon-trench-coat')}
            >
              {/* Inner Parallax Image Layer */}
              <div
                className="w-full h-[115%] -mt-[7%] transition-transform duration-100 ease-out will-change-transform"
                style={{
                  transform: `translate3d(0, ${heroParallax * 0.45}px, 0)`,
                }}
              >
                <img
                  src="/src/assets/images/hero_velora_editorial_1792764508905.jpg"
                  alt="VELORA SS26 Campaign Silhouette"
                  className="w-full h-full object-cover object-center filter contrast-[1.04]"
                />
              </div>

              {/* Floating Architectural Overlay Card */}
              <div className="absolute bottom-5 inset-x-5 p-3.5 bg-[#0B0C10]/85 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between text-xs font-tech z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C49774] block">
                    SS26 Cornerstone
                  </span>
                  <span className="text-[#F5F2EB] font-syne font-medium text-sm">
                    The Sculpted Cocoon Trench
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('/products/sculpted-cocoon-trench-coat');
                  }}
                  className="w-8 h-8 rounded-full bg-[#853744] hover:bg-[#A84E59] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Inspect Cocoon Trench"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="pt-4 flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.25em] text-[#9C9EAE]">
          <span>Maison Founded 2026</span>
          <div className="flex items-center gap-2">
            <span>Scroll for Kinetic Archive</span>
            <span className="text-[#C49774] animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS KINETIC TICKER RIBBON */}
      <div className="w-full overflow-hidden border-y border-white/[0.08] bg-[#0E1017] py-3.5 relative">
        <div className="animate-ticker flex items-center gap-8 font-tech text-xs tracking-[0.3em] uppercase text-[#9C9EAE]">
          <span>Architectural Silhouettes</span>
          <span className="text-[#853744]">✦</span>
          <span>40-Momme Mulberry Silk Crepe</span>
          <span className="text-[#C49774]">✦</span>
          <span>Biella High-Twist Virgin Wool</span>
          <span className="text-[#853744]">✦</span>
          <span>Floating Horsehair Canvas</span>
          <span className="text-[#C49774]">✦</span>
          <span>Milanese Atelier Joinery</span>
          <span className="text-[#853744]">✦</span>
          <span>Complimentary White-Glove Courier</span>
          <span className="text-[#C49774]">✦</span>
          <span>Architectural Silhouettes</span>
          <span className="text-[#853744]">✦</span>
          <span>40-Momme Mulberry Silk Crepe</span>
          <span className="text-[#C49774]">✦</span>
          <span>Biella High-Twist Virgin Wool</span>
          <span className="text-[#853744]">✦</span>
          <span>Floating Horsehair Canvas</span>
          <span className="text-[#C49774]">✦</span>
        </div>
      </div>

      {/* 3. INTERACTIVE SILHOUETTE REEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-b from-[#13151F] to-[#0E1017] border border-white/10 rounded-[36px] shadow-2xl relative overflow-hidden">
          
          <div className="absolute inset-0 blueprint-pattern opacity-40 pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/[0.08] gap-6">
            <div>
              <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block mb-2">
                Interactive Lookbook
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-bold text-[#F5F2EB] uppercase">
                The Silhouette Dial
              </h2>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 font-tech text-xs uppercase tracking-wider">
              {flagshipSilhouettes.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSilhouetteIndex(idx)}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                    activeSilhouetteIndex === idx
                      ? 'border-[#F5F2EB] bg-[#F5F2EB] text-[#0B0C10] font-semibold'
                      : 'border-white/10 text-[#9C9EAE] hover:text-white hover:border-white/25'
                  }`}
                >
                  Look 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Dial Content: Dynamic Stage */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-10">
            {/* Left: Garment Specifications & Quote */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 font-tech text-xs text-[#9C9EAE] uppercase tracking-[0.2em]">
                <span className="text-[#C49774] font-medium">[ARCHIVE 0{activeSilhouetteIndex + 1}]</span>
                <span className="text-white/20">/</span>
                <span>{activeLook.category}</span>
              </div>

              <h3 className="font-syne text-3xl sm:text-4xl font-bold text-[#F5F2EB] leading-tight">
                {activeLook.title}
              </h3>

              <blockquote className="font-italiana italic text-2xl text-[#C49774] leading-relaxed">
                "{activeLook.quote}"
              </blockquote>

              <div className="p-4 bg-[#0B0C10]/60 border border-white/[0.08] rounded-xl grid grid-cols-2 gap-4 font-tech text-xs">
                <div>
                  <span className="text-[#9C9EAE] text-[10px] uppercase tracking-wider block">Textile Spec</span>
                  <span className="text-[#F5F2EB] font-medium">{activeLook.weight}</span>
                </div>
                <div>
                  <span className="text-[#9C9EAE] text-[10px] uppercase tracking-wider block">Mill Provenance</span>
                  <span className="text-[#F5F2EB] font-medium">{activeLook.fabric}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <span className="font-tech text-xl font-bold text-[#F5F2EB] tabular-nums">
                  {formatINR(activeLook.price)}
                </span>
                <button
                  onClick={() => onNavigate(`/products/${activeLook.slug}`)}
                  className="px-6 py-3 bg-[#F5F2EB] hover:bg-white text-[#0B0C10] font-tech text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Examine Pattern</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right: Arched Garment Showcase with Parallax Response */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                data-cursor="image"
                data-cursor-text="LOOKBOOK"
                onClick={() => onNavigate(`/products/${activeLook.slug}`)}
                className="relative w-full max-w-sm aspect-[3/4.2] rounded-[100px_100px_16px_16px] overflow-hidden bg-[#161822] border border-white/20 shadow-2xl cursor-pointer"
              >
                <div
                  className="w-full h-[112%] -mt-[6%] transition-transform duration-100 ease-out will-change-transform"
                  style={{
                    transform: `translate3d(0, ${editorialParallax * 0.3}px, 0)`,
                  }}
                >
                  <img
                    key={activeLook.image}
                    src={activeLook.image}
                    alt={activeLook.title}
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                  />
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const prod = PRODUCTS.find((p) => p.slug === activeLook.slug);
                    if (prod) openQuickView(prod);
                  }}
                  className="absolute bottom-4 right-4 bg-[#0B0C10]/80 hover:bg-[#853744] text-[#F5F2EB] p-2.5 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer z-10"
                  title="Quick View"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED SILHOUETTES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.08] mb-10 gap-4">
          <div>
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block mb-1">
              Archival Registry
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-[#F5F2EB] uppercase">
              Curated Capsule
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/collections')}
            className="font-tech text-xs uppercase tracking-[0.2em] text-[#9C9EAE] hover:text-[#F5F2EB] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All 10 Silhouettes</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 3-Column Responsive Architectural Arched Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL CRAFTSMANSHIP TREATISE ("The Anatomy of Drape") with Parallax */}
      <section className="border-y border-white/[0.08] bg-[#0E1017] py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#853744]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual with Scroll Parallax */}
            <div className="lg:col-span-6 relative">
              <div
                data-cursor="image"
                data-cursor-text="ATELIER"
                className="relative aspect-[4/3] rounded-[80px_20px_80px_20px] overflow-hidden bg-[#161822] border border-white/15 shadow-2xl"
              >
                <div
                  className="w-full h-[115%] -mt-[7%] transition-transform duration-100 ease-out will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(editorialParallax - 40) * 0.4}px, 0)`,
                  }}
                >
                  <img
                    src="/src/assets/images/editorial_craft_atelier_1792764511170.jpg"
                    alt="Raw Mulberry Silk and Wool Drape"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between font-tech text-[10px] text-[#9C9EAE] tracking-[0.2em] uppercase">
                <span>Figure 04 · Pattern drafting on 320gsm Biella wool</span>
                <span className="text-[#C49774]">Milan Atelier</span>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block">
                Atelier Notes · Chapter 01
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight uppercase">
                The Anatomy of Drape: Tactile Architecture
              </h2>
              <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed font-light">
                We believe true luxury is the complete absence of unnecessary ornamentation. In our atelier, every seam is tested against kinetic gravity. By securing floating horsehair canvas rather than synthetic fusibles, a VELORA silhouette gently memorizes your posture over time.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/[0.08] font-tech text-xs">
                <div>
                  <h4 className="uppercase tracking-[0.2em] text-[#F5F2EB] font-semibold mb-1">
                    Biella Virgin Wool
                  </h4>
                  <p className="text-[#9C9EAE] text-[11px] leading-relaxed">
                    Custom high-twist yarns offering natural crease recovery and razor-sharp lapel articulation.
                  </p>
                </div>
                <div>
                  <h4 className="uppercase tracking-[0.2em] text-[#F5F2EB] font-semibold mb-1">
                    Raw Mulberry Silk
                  </h4>
                  <p className="text-[#9C9EAE] text-[11px] leading-relaxed">
                    Hand-reeled slub fibers that catch ambient twilight rather than synthetic artificial sheen.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/journal/the-anatomy-of-drape')}
                  className="px-6 py-3.5 bg-[#151720] hover:bg-[#853744] text-[#F5F2EB] font-tech text-xs uppercase tracking-[0.2em] rounded-full border border-white/10 hover:border-[#853744] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Read Full Atelier Treatise</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROVENANCE MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block mb-2">
            The Atelier Constitution
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold text-[#F5F2EB] uppercase">
            Principles of Modern Form
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#12141D] border border-white/[0.08] hover:border-[#853744]/60 transition-colors group">
            <span className="font-tech text-xs text-[#C49774] block mb-4 tracking-[0.2em]">[01. PROPORTION]</span>
            <h3 className="font-syne text-2xl text-[#F5F2EB] font-bold mb-3 uppercase">Architectural Math</h3>
            <p className="text-xs text-[#9C9EAE] leading-relaxed font-light">
              We design from spatial blueprints before cutting fabric. Shoulder lines are calculated to create tension, and hemlines fall with cantilevered balance.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#12141D] border border-white/[0.08] hover:border-[#853744]/60 transition-colors group">
            <span className="font-tech text-xs text-[#C49774] block mb-4 tracking-[0.2em]">[02. MATERIAL]</span>
            <h3 className="font-syne text-2xl text-[#F5F2EB] font-bold mb-3 uppercase">Honest Provenance</h3>
            <p className="text-xs text-[#9C9EAE] leading-relaxed font-light">
              Every yard of wool, silk, and cashmere is sourced from century-old family mills in Biella, Como, and Kyoto with verified humane standards and zero petroleum additives.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#12141D] border border-white/[0.08] hover:border-[#853744]/60 transition-colors group">
            <span className="font-tech text-xs text-[#C49774] block mb-4 tracking-[0.2em]">[03. LONGEVITY]</span>
            <h3 className="font-syne text-2xl text-[#F5F2EB] font-bold mb-3 uppercase">Permanent Presence</h3>
            <p className="text-xs text-[#9C9EAE] leading-relaxed font-light">
              We reject rapid seasonal obsolescence. Our pieces are engineered to be worn across decades, developing richer tactile patina with every chapter of your life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
