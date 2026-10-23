import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

interface JournalDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JournalDetailView: React.FC<JournalDetailViewProps> = ({ slug, onNavigate }) => {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug) || JOURNAL_ARTICLES[0];

  const relatedProducts = article.relatedProductSlugs
    ? PRODUCTS.filter((p) => article.relatedProductSlugs?.includes(p.slug))
    : PRODUCTS.slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/journal')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8E877E] hover:text-[#FFFFFF] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>The Atelier Gazette</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-6 border-b border-[#262626] pb-10">
        <div className="flex items-center gap-3 text-xs text-[#8E877E] uppercase tracking-wider">
          <span className="text-[#C8C1B7] font-medium">{article.kicker}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            <span>{article.readTime}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{article.date}</span>
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#F1EEE7] font-light leading-[1.1]">
          {article.title}
        </h1>

        <p className="font-editorial italic text-lg sm:text-2xl text-[#C8C1B7] leading-relaxed">
          {article.excerpt}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs text-[#706B64]">
          <div className="flex items-center gap-2">
            <User size={13} />
            <span>Authored by <strong className="text-[#F1EEE7] font-normal">{article.author}</strong></span>
          </div>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="aspect-[16/10] bg-[#1E1E1E] border border-[#2D2D2D] overflow-hidden shadow-2xl">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="space-y-10 text-sm sm:text-base text-[#C8C1B7] leading-relaxed font-light">
        {article.content.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {section.sectionHeading && (
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#F1EEE7] pt-4 font-normal">
                {section.sectionHeading}
              </h2>
            )}

            <p className="leading-relaxed text-[#B5AEA5]">
              {section.paragraph}
            </p>

            {section.pullQuote && (
              <div className="my-8 py-6 px-6 sm:px-8 bg-[#181818] border-l-2 border-[#612C35] text-left">
                <blockquote className="font-editorial italic text-2xl sm:text-3xl text-[#F1EEE7] leading-snug">
                  {section.pullQuote}
                </blockquote>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Author Signoff */}
      <div className="pt-10 border-t border-[#262626] flex items-center justify-between text-xs text-[#8E877E]">
        <div>
          <span>Published by the VELORA STUDIO Editorial Board</span>
          <p className="text-[#605B54] mt-0.5">Milan Atelier · Via Montenapoleone</p>
        </div>
        <button
          onClick={() => onNavigate('/journal')}
          className="uppercase tracking-widest text-[#F1EEE7] hover:underline cursor-pointer"
        >
          Return to Gazette
        </button>
      </div>

      {/* Referenced Creations in this Essay */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#262626] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8E877E] block mb-1">
                Atelier Catalog
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F1EEE7]">
                Silhouettes Discussed in this Essay
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
