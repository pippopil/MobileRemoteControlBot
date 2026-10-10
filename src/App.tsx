import React from 'react';
import { MobileBotHubApp } from './components/mobi/MobileBotHubApp';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

export default function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <MobileBotHubApp />
      <OfflineIndicator />
    </div>
  );
}
