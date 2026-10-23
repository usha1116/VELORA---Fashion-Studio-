import React, { useState, useMemo } from 'react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, X } from 'lucide-react';

interface CollectionsViewProps {
  onNavigate: (path: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { label: 'All Silhouettes', value: 'all' },
    { label: 'Tailoring', value: 'Tailoring' },
    { label: 'Outerwear', value: 'Outerwear' },
    { label: 'Dresses & Silks', value: 'Dresses & Silks' },
    { label: 'Knitwear', value: 'Knitwear' },
    { label: 'Accessories', value: 'Accessories' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#C49774] block mb-2">
          Atelier Registry
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl text-[#F5F2EB] font-bold uppercase">
          Silhouettes & Series
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#9C9EAE] max-w-2xl leading-relaxed font-light">
          Curated seasonal narratives and permanent architectural foundations. Each piece represents an intentional balance between structural tension and tactile cloth.
        </p>
      </div>

      {/* 3 Core Series Showcases */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-tech text-xs uppercase tracking-[0.25em] text-[#9C9EAE] font-semibold">
            Curated Series
          </h2>
          <span className="font-tech text-xs text-[#C49774]">3 Collections Active</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => onNavigate(`/collections/${col.slug}`)}
              className="group bg-[#13151D] border border-white/[0.08] hover:border-white/20 rounded-[32px] overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="aspect-[16/10] bg-[#161822] overflow-hidden relative">
                <img
                  src={col.heroImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B0C10]/80 backdrop-blur-md border border-white/10 font-tech text-[9px] uppercase tracking-[0.2em] text-[#C49774]">
                  Series 0{idx + 1}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-[#9C9EAE] block mb-1">
                    {col.season}
                  </span>
                  <h3 className="font-syne text-2xl font-bold text-[#F5F2EB] group-hover:text-white transition-colors">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#9C9EAE] line-clamp-2 leading-relaxed font-light">
                    {col.concept}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-tech text-xs uppercase tracking-[0.2em] text-[#F5F2EB] font-medium">
                  <span>Explore Series</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C49774]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filterable Catalog Section */}
      <section className="pt-10 border-t border-white/[0.08]">
        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-tech">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all rounded-full whitespace-nowrap shrink-0 cursor-pointer border ${
                  selectedCategory === cat.value
                    ? 'border-[#F5F2EB] bg-[#F5F2EB] text-[#0B0C10] font-semibold shadow-md'
                    : 'border-white/10 bg-[#13151D] text-[#9C9EAE] hover:text-[#F5F2EB] hover:border-white/25'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-4 font-tech text-xs text-[#9C9EAE] justify-between md:justify-end">
            <span className="tabular-nums text-[#F5F2EB]">
              {filteredProducts.length} Silhouettes
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="uppercase tracking-wider text-[11px]">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#13151D] border border-white/15 px-3 py-1.5 rounded-lg text-xs text-[#F5F2EB] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clear filter button if filtered */}
        {selectedCategory !== 'all' && (
          <div className="pt-4 flex items-center gap-3 font-tech text-xs text-[#C49774]">
            <span>Filter applied: <strong>{selectedCategory}</strong></span>
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-1 text-[#9C9EAE] hover:text-white underline cursor-pointer"
            >
              <X size={12} />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#13151D] border border-white/10 rounded-3xl">
              <h3 className="font-syne text-2xl text-[#F5F2EB]">No silhouettes found</h3>
              <p className="font-tech text-xs text-[#9C9EAE] mt-2">No creations currently match your selected filter.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-2.5 bg-[#F5F2EB] text-[#0B0C10] font-tech text-xs uppercase tracking-wider rounded-full font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
