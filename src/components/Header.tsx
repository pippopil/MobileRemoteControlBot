import React from 'react';
import { Rocket, Sparkles, Bot, Star, Calculator, Award, Wrench, Github } from 'lucide-react';
import { PWAInstallButton } from './pwa/PWAInstallButton';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiValidator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAiValidator }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="BotHub Pro" className="w-9 h-9 rounded-xl shadow-lg border border-cyan-500/30" />
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap leading-tight flex items-center gap-1.5">
              BotHub Pro
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">PWA</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Mobile Remote Control</span>
          </div>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('bothub')}
            className={`transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bothub' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>📱 Мобильный пульт ботов</span>
          </button>

          <button
            onClick={() => setActiveTab('tireshop')}
            className={`transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tireshop' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-400" />
            <span>Шиномонтаж (89437653289)</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'github' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5 text-emerald-400" />
            <span>GitHub Профиль (pippopil)</span>
          </button>

          <button
            onClick={() => setActiveTab('leadflow')}
            className={`transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'leadflow' ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>LeadFlow</span>
          </button>

          <button
            onClick={() => setActiveTab('reviewboost')}
            className={`transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reviewboost' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>ReviewBoost</span>
          </button>
        </nav>

        {/* Zone 3: Direct CTA for Mobile BotHub & PWA Install */}
        <div className="flex items-center gap-2.5">
          <PWAInstallButton />
          <button
            onClick={() => setActiveTab('bothub')}
            className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Пульт ботов 📱</span>
          </button>
        </div>
      </div>
    </header>
  );
};
