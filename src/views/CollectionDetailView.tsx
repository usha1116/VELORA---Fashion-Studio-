import React, { useState, useMemo } from 'react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CollectionDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const CollectionDetailView: React.FC<CollectionDetailViewProps> = ({ slug, onNavigate }) => {
  const collection = COLLECTIONS.find((c) => c.slug === slug) || COLLECTIONS[0];
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const collectionProducts = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => collection.productIds.includes(p.id) || p.collectionSlug === collection.slug
    );
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [collection, sortBy]);

  return (
    <div className="space-y-16">
      {/* Campaign Header / Split Hero */}
      <section className="border-b border-[#262626] bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <button
            onClick={() => onNavigate('/collections')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8E877E] hover:text-[#FFFFFF] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>All Collections</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8C1B7] font-medium block">
                {collection.season}
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl text-[#F1EEE7] font-light leading-tight">
                {collection.title}
              </h1>
              <p className="font-editorial italic text-xl text-[#C8C1B7]">
                {collection.editorialQuote}
              </p>
              <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed max-w-xl">
                {collection.concept}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-[#222] border border-[#2D2D2D] overflow-hidden shadow-2xl">
                <img
                  src={collection.heroImage}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing for this Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#252525] text-xs text-[#8E877E]">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-[#F1EEE7] font-medium">Edition Silhouettes</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{collectionProducts.length} items</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="col-sort" className="uppercase tracking-wider">Sort:</label>
            <select
              id="col-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1C1C1C] border border-[#333333] px-2.5 py-1 text-xs text-[#F1EEE7] focus:outline-none cursor-pointer"
            >
              <option value="featured">Editorial Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
