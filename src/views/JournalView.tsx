import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { ArrowRight, Clock } from 'lucide-react';

interface JournalViewProps {
  onNavigate: (path: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onNavigate }) => {
  const leadArticle = JOURNAL_ARTICLES[0];
  const secondaryArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Journal Header */}
      <div className="border-b border-[#262626] pb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E877E] block mb-2">
          The Atelier Gazette
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl text-[#F1EEE7] font-light">
          Chronique & Essays
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#9E978E] max-w-xl leading-relaxed">
          Critical essays, technical textile studies, and seasonal meditations from the creative directors, tailors, and textile historians of VELORA STUDIO.
        </p>
      </div>

      {/* Lead Feature Story (Large Editorial Spread) */}
      <article
        onClick={() => onNavigate(`/journal/${leadArticle.slug}`)}
        className="group bg-[#181818] border border-[#282828] hover:border-[#383838] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
      >
        <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-[#202020] overflow-hidden">
          <img
            src={leadArticle.heroImage}
            alt={leadArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#8E877E] uppercase tracking-wider">
              <span>{leadArticle.kicker}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>{leadArticle.readTime}</span>
              </span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-4xl text-[#F1EEE7] leading-tight group-hover:text-white transition-colors">
              {leadArticle.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#9E978E] leading-relaxed line-clamp-3">
              {leadArticle.excerpt}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#262626] flex items-center justify-between text-xs">
            <span className="text-[#706B64]">{leadArticle.author} · {leadArticle.date}</span>
            <span className="uppercase tracking-widest text-[#F1EEE7] group-hover:underline flex items-center gap-1 font-medium">
              <span>Read Essay</span>
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </article>

      {/* Secondary Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {secondaryArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onNavigate(`/journal/${article.slug}`)}
            className="group bg-[#181818] border border-[#282828] hover:border-[#383838] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="aspect-[16/10] bg-[#222222] overflow-hidden">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8E877E] uppercase tracking-wider mb-2">
                  <span>{article.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-editorial text-2xl text-[#F1EEE7] leading-snug group-hover:text-white transition-colors">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs text-[#9E978E] leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#8E877E]">
                <span>{article.author}</span>
                <span className="uppercase tracking-widest text-[#F1EEE7] font-medium flex items-center gap-1">
                  <span>Read</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
