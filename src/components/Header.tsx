import React from 'react';
import { Bot, ShieldCheck, Wifi, Sparkles, Smartphone } from 'lucide-react';
import { PWAInstallButton } from './pwa/PWAInstallButton';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand wordmark */}
        <div className="flex items-center gap-2.5">
          <img
            src="/icon.svg"
            alt="BotHub Pro"
            className="w-9 h-9 rounded-xl shadow-lg border border-cyan-500/30"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap leading-tight">
                BotHub Pro
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                PWA / APK
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              Мобильный пульт управления ботами организаций
            </span>
          </div>
        </div>

        {/* Live Status Indicator (Center) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[11px] text-slate-300 font-medium">Шлюз активен</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-mono text-emerald-400">Telegram / МАКС / WhatsApp / VK</span>
        </div>

        {/* Right CTA: Install PWA */}
        <div className="flex items-center gap-2.5">
          <PWAInstallButton />
        </div>
      </div>
    </header>
  );
};
