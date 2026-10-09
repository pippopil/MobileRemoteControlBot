/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MobileBotHubApp } from './components/mobi/MobileBotHubApp';
import { GithubProfileStudio } from './components/github/GithubProfileStudio';
import { TireShopBotSolution } from './components/tire/TireShopBotSolution';
import { LeadFlowStudio } from './components/leadflow/LeadFlowStudio';
import { ReviewBoostStudio } from './components/reviewboost/ReviewBoostStudio';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { BlueprintsSection } from './components/BlueprintsSection';
import { FinancialCalculator } from './components/FinancialCalculator';
import { AiIdeaValidator } from './components/AiIdeaValidator';
import { SalesPlaybook } from './components/SalesPlaybook';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { Blueprint } from './types';
import { BLUEPRINTS } from './data/blueprintsData';
import { Bot, Star, Layers, Calculator, Sparkles, Award, Wrench, Github, Smartphone } from 'lucide-react';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('bothub');
  const [selectedBlueprintForPitch, setSelectedBlueprintForPitch] = useState<Blueprint | null>(BLUEPRINTS[0]);

  const handleSelectForPitch = (blueprint: Blueprint) => {
    setSelectedBlueprintForPitch(blueprint);
    setActiveTab('playbook');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleOpenAiValidator = () => {
    setActiveTab('ai-validator');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleOpenCalculator = () => {
    setActiveTab('calculator');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* 3-zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiValidator={handleOpenAiValidator}
      />

      {/* Main Tab Navigation Sticky Bar */}
      <div className="bg-slate-900/95 border-b border-slate-800 sticky top-16 z-30 py-2.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 overflow-x-auto text-xs font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bothub')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'bothub'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>📱 Мобильный пульт (BotHub)</span>
            </button>

            <button
              onClick={() => setActiveTab('tireshop')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tireshop'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-300" />
              <span>Шиномонтаж (89437653289)</span>
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'github'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Github className="w-3.5 h-3.5 text-emerald-300" />
              <span>GitHub Резюме (pippopil)</span>
            </button>

            <button
              onClick={() => setActiveTab('leadflow')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'leadflow'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-300" />
              <span>LeadFlow (Боты под ключ)</span>
            </button>

            <button
              onClick={() => setActiveTab('reviewboost')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviewboost'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>ReviewBoost (QR-отзывы)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Калькулятор
            </button>

            <button
              onClick={() => setActiveTab('playbook')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'playbook'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Скрипты
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 w-full">
        {activeTab === 'bothub' && (
          <MobileBotHubApp onOpenTireShopSolution={() => setActiveTab('tireshop')} />
        )}

        {activeTab === 'github' && (
          <GithubProfileStudio />
        )}

        {activeTab === 'tireshop' && (
          <TireShopBotSolution />
        )}

        {activeTab === 'leadflow' && (
          <LeadFlowStudio />
        )}

        {activeTab === 'reviewboost' && (
          <ReviewBoostStudio />
        )}

        {activeTab === 'competitors' && (
          <CompetitorAnalysis />
        )}

        {activeTab === 'blueprints' && (
          <BlueprintsSection onSelectForPitch={handleSelectForPitch} />
        )}

        {activeTab === 'calculator' && (
          <FinancialCalculator />
        )}

        {activeTab === 'ai-validator' && (
          <AiIdeaValidator />
        )}

        {activeTab === 'playbook' && (
          <SalesPlaybook initialBlueprint={selectedBlueprintForPitch} />
        )}

        {activeTab === 'comparison' && (
          <ComparisonMatrix />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">BotHub Pro & Launchpad</span>
            <span>·</span>
            <span>Мобильное управление ботами для организаций</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => { setActiveTab('bothub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition-colors cursor-pointer font-bold"
            >
              Пульт ботов 📱
            </button>
            <button
              onClick={() => { setActiveTab('tireshop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Шиномонтаж (89437653289)
            </button>
            <button
              onClick={() => { setActiveTab('github'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              GitHub Резюме
            </button>
          </div>
        </div>
      </footer>
      <OfflineIndicator />
    </div>
  );
}
