import React, { useState, useEffect } from 'react';
import {
  Users,
  PlusCircle,
  Bot,
  Wallet,
  Smartphone,
  Maximize2,
  Minimize2,
  Wifi,
  Battery,
  Sparkles,
  BookOpen,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { ClientBot } from '../../types';
import { INITIAL_CLIENTS } from '../../data/clientsData';
import { ClientsAdminView } from './ClientsAdminView';
import { NewBotWizard } from './NewBotWizard';
import { AgencyCopilotView } from './AgencyCopilotView';
import { AgencyFinanceView } from './AgencyFinanceView';
import { ClientDetailModal } from './ClientDetailModal';
import { ClientOnboardingGuide } from './ClientOnboardingGuide';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

const STORAGE_KEY = 'bothub_pro_clients_v2';

export const MobileBotHubApp: React.FC = () => {
  const [clients, setClients] = useState<ClientBot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read clients from localStorage:', e);
    }
    return INITIAL_CLIENTS;
  });

  const [activeNavTab, setActiveNavTab] = useState<'clients' | 'new-bot' | 'guide' | 'agency-copilot' | 'finance'>('clients');
  const [selectedClientForDetail, setSelectedClientForDetail] = useState<ClientBot | null>(null);
  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch (e) {
      console.warn('Could not save clients to localStorage:', e);
    }
  }, [clients]);

  const handleBotCreated = (newBot: ClientBot) => {
    const updated = [newBot, ...clients];
    setClients(updated);
    setSelectedClientForDetail(newBot);
    setActiveNavTab('clients');
  };

  const handleUpdateClient = (updated: ClientBot) => {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedClientForDetail(updated);
  };

  const handleToggleStatus = (clientId: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const nextStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: nextStatus };
      })
    );
  };

  const handleDeleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    if (selectedClientForDetail?.id === clientId) {
      setSelectedClientForDetail(null);
    }
  };

  const handleMarkPaid = (clientId: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        // Extend billing date by 30 days
        const currentDate = new Date(c.nextBillingDate);
        currentDate.setDate(currentDate.getDate() + 30);
        const newBillingDate = currentDate.toISOString().split('T')[0];
        return {
          ...c,
          status: 'active',
          nextBillingDate: newBillingDate
        };
      })
    );
  };

  const handleResetDefaults = () => {
    if (window.confirm('Сбросить список ботов к стандартным проверенным организациям?')) {
      setClients(INITIAL_CLIENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENTS));
    }
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-[85vh] bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4">
      {/* Top Controller Bar (Switch frame / Fullscreen / Reset) */}
      <div className="w-full max-w-4xl mx-auto mb-3 flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-bold text-white tracking-wide">
            BotHub Pro — Мобильный пульт управления ботами
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">
            {clients.length} подключенных организаций
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            title="Восстановить примеры клиентов"
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Сброс</span>
          </button>

          <button
            onClick={() => setIsPhoneFrameMode(!isPhoneFrameMode)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            {isPhoneFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Во весь экран</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Вид смартфона</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Either Phone Frame or Full Width */}
      <div
        className={`w-full transition-all duration-300 ${
          isPhoneFrameMode
            ? 'max-w-[420px] rounded-[42px] border-[6px] border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-slate-950 flex flex-col h-[780px]'
            : 'max-w-4xl rounded-3xl border border-slate-800 bg-slate-950 flex flex-col min-h-[700px] shadow-2xl'
        }`}
      >
        {/* Smartphone Native Status Bar */}
        <div className="bg-slate-950 px-5 pt-3 pb-2 flex items-center justify-between text-xs text-slate-400 select-none border-b border-slate-900">
          <span className="font-semibold text-white tracking-tight">{currentTime}</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono">5G</span>
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Mobile App Header */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="BotHub Pro" className="w-7 h-7 rounded-lg shadow-sm border border-cyan-500/30" />
            <div>
              <div className="font-bold text-xs text-white flex items-center gap-1">
                <span>BotHub</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-semibold">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                {activeNavTab === 'clients' && 'Администрирование клиентов'}
                {activeNavTab === 'new-bot' && 'Конструктор нового бота'}
                {activeNavTab === 'guide' && 'Инструкция по подключению'}
                {activeNavTab === 'agency-copilot' && 'Ассистент Нашего Агентства'}
                {activeNavTab === 'finance' && 'MRR и Абонплаты'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PWAInstallButton />
          </div>
        </div>

        {/* Scrollable Main Mobile Body */}
        <div className="flex-1 overflow-y-auto bg-slate-950 pb-16">
          {activeNavTab === 'clients' && (
            <ClientsAdminView
              clients={clients}
              onSelectClient={(c) => setSelectedClientForDetail(c)}
              onOpenNewBotWizard={() => setActiveNavTab('new-bot')}
              onOpenGuide={() => setActiveNavTab('guide')}
              onToggleStatus={handleToggleStatus}
              onDeleteClient={handleDeleteClient}
              onMarkPaid={handleMarkPaid}
            />
          )}

          {activeNavTab === 'new-bot' && (
            <NewBotWizard
              onBotCreated={handleBotCreated}
              onCancel={() => setActiveNavTab('clients')}
            />
          )}

          {activeNavTab === 'guide' && (
            <ClientOnboardingGuide
              onOpenNewBotWizard={() => setActiveNavTab('new-bot')}
            />
          )}

          {activeNavTab === 'agency-copilot' && (
            <AgencyCopilotView
              clients={clients}
              onOpenNewBotWizard={() => setActiveNavTab('new-bot')}
            />
          )}

          {activeNavTab === 'finance' && (
            <AgencyFinanceView clients={clients} />
          )}
        </div>

        {/* Fixed Mobile Bottom Navigation Bar (Тактильный нативный навбар) */}
        <div className="bg-slate-900/95 border-t border-slate-800 p-1.5 flex items-center justify-around text-[10px] backdrop-blur-md shrink-0 shadow-lg">
          <button
            onClick={() => setActiveNavTab('clients')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeNavTab === 'clients'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Клиенты ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveNavTab('new-bot')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeNavTab === 'new-bot'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 mb-0.5" />
            <span>Новый бот</span>
          </button>

          <button
            onClick={() => setActiveNavTab('guide')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeNavTab === 'guide'
                ? 'text-cyan-400 font-bold bg-cyan-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Инструкция</span>
          </button>

          <button
            onClick={() => setActiveNavTab('agency-copilot')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer relative ${
              activeNavTab === 'agency-copilot'
                ? 'text-purple-300 font-bold bg-purple-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <Bot className="w-4 h-4 mb-0.5 text-purple-400" />
            <span>Наш бот</span>
          </button>

          <button
            onClick={() => setActiveNavTab('finance')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeNavTab === 'finance'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4 mb-0.5" />
            <span>Финансы</span>
          </button>
        </div>
      </div>

      {/* Client Detail & Interactive Tester Modal */}
      {selectedClientForDetail && (
        <ClientDetailModal
          client={selectedClientForDetail}
          onClose={() => setSelectedClientForDetail(null)}
          onUpdateClient={handleUpdateClient}
        />
      )}
    </div>
  );
};
