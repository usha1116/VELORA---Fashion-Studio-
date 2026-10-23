import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#090A0E] border-t border-white/[0.08] text-[#9C9EAE] pt-16 pb-12 mt-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#853744]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Guarantee Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-white/[0.06]">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#12141D] border border-white/[0.05]">
            <ShieldCheck size={20} className="text-[#C49774] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-tech text-xs uppercase tracking-[0.2em] text-[#F5F2EB] font-medium">Bespoke Atelier Joinery</h4>
              <p className="text-xs text-[#9C9EAE] mt-1 leading-relaxed font-light">
                Hand-padded floating canvas chests and grade-A Italian virgin wools built for decades of wear.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#12141D] border border-white/[0.05]">
            <Truck size={20} className="text-[#C49774] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-tech text-xs uppercase tracking-[0.2em] text-[#F5F2EB] font-medium">White-Glove Insured Delivery</h4>
              <p className="text-xs text-[#9C9EAE] mt-1 leading-relaxed font-light">
                Complimentary insured courier delivery across India on orders over ₹15,000 in signature archival boxes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#12141D] border border-white/[0.05]">
            <RefreshCw size={20} className="text-[#C49774] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-tech text-xs uppercase tracking-[0.2em] text-[#F5F2EB] font-medium">Private Sizing Guarantee</h4>
              <p className="text-xs text-[#9C9EAE] mt-1 leading-relaxed font-light">
                Complimentary sizing adjustments in our Milan & Mumbai partner ateliers within 14 days of receipt.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-14 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left font-syne text-3xl font-bold tracking-[0.2em] text-[#F5F2EB] uppercase cursor-pointer hover:opacity-80 transition-opacity"
            >
              VELORA STUDIO
            </button>
            <p className="mt-4 font-sans text-xs text-[#9C9EAE] leading-relaxed max-w-sm font-light">
              An independent luxury house interrogating architectural form, tactile materialism, and statuesque femininity. Built with uncompromised precision for deliberate living.
            </p>
            <div className="mt-6 font-tech text-xs text-[#C49774] tracking-[0.2em] uppercase">
              <span>Milan</span>
              <span className="mx-2 text-white/20">/</span>
              <span>Paris</span>
              <span className="mx-2 text-white/20">/</span>
              <span>Mumbai</span>
            </div>
          </div>

          {/* Links 1: Collections */}
          <div className="md:col-span-2 font-tech">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F5F2EB] font-semibold mb-4">
              Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9C9EAE]">
              <li>
                <button
                  onClick={() => onNavigate('/collections/architectural-silhouettes')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Architectural SS26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/mulberry-and-raw-linen')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Mulberry & Raw Linen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/nocturne-tailoring')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Nocturne Evening Silks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  All 10 Silhouettes
                </button>
              </li>
            </ul>
          </div>

          {/* Links 2: Editorial & Brand */}
          <div className="md:col-span-2 font-tech">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F5F2EB] font-semibold mb-4">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9C9EAE]">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  House Constitution
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/journal')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Atelier Gazette
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Provenance Atlas
                </button>
              </li>
              <li>
                <span className="text-[#666666]">Private Appointments</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="font-tech text-xs uppercase tracking-[0.25em] text-[#F5F2EB] font-semibold mb-2">
              The Atelier Gazette
            </h4>
            <p className="text-xs text-[#9C9EAE] mb-4 leading-relaxed font-light">
              Receive private salon invitations, seasonal essays, and early access to numbered capsule editions.
            </p>

            {isSubscribed ? (
              <div className="bg-[#12141D] border border-white/10 p-4 rounded-xl text-xs text-[#F5F2EB] flex items-center gap-3">
                <Check size={16} className="text-[#C49774] shrink-0" />
                <span>You have been added to the private salon registry. (Demo)</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter email for private gazette"
                    className="w-full bg-[#13151D] border border-white/10 px-4 py-2.5 text-xs text-[#F5F2EB] placeholder-[#666666] rounded-l-full focus:outline-none focus:border-[#C49774]"
                  />
                  <button
                    type="submit"
                    className="bg-[#853744] hover:bg-[#A84E59] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-tech font-semibold rounded-r-full transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-400 font-tech">{error}</p>}
                <p className="text-[10px] text-[#666666] font-tech">
                  Zero spam. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-tech text-xs text-[#706B64] gap-4">
          <p>© {new Date().getFullYear()} VELORA STUDIO S.p.A. All rights reserved. Architectural Haute Couture Demo.</p>
          <div className="flex items-center gap-6">
            <span>Currency: INR (₹)</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Terms of Atelier</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Privacy Registry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
