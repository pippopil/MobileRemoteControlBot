import React from 'react';
import { Header } from './components/Header';
import { MobileBotHubApp } from './components/mobi/MobileBotHubApp';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* BotHub Pro Header */}
      <Header />

      {/* Main BotHub Pro Mobile & Desktop Operating Hub */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-2 sm:py-6">
        <MobileBotHubApp />
      </main>

      {/* Offline Status Listener */}
      <OfflineIndicator />
    </div>
  );
}
