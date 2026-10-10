import React, { useState, useEffect } from 'react';
import {
  Users,
  PlusCircle,
  Bot,
  Wallet,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { ClientBot } from '../../types';
import { INITIAL_CLIENTS } from '../../data/clientsData';
import { ClientsAdminView } from './ClientsAdminView';
import { NewBotWizard } from './NewBotWizard';
import { AgencyCopilotView } from './AgencyCopilotView';
import { AgencyFinanceView } from './AgencyFinanceView';
import { ClientDetailModal } from './ClientDetailModal';
import { ClientOnboardingGuide } from './ClientOnboardingGuide';

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

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Native Mobile App Header */}
      <header className="shrink-0 bg-slate-900/95 border-b border-slate-800/80 px-3.5 py-2.5 flex items-center justify-between backdrop-blur-md z-30">
        <div className="flex items-center gap-2.5">
          <img
            src="/icon.svg"
            alt="BotHub Pro"
            className="w-8 h-8 rounded-xl shadow-md border border-cyan-500/30"
          />
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-1.5 leading-tight">
              <span>BotHub Pro</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-semibold border border-emerald-500/30">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {activeNavTab === 'clients' && 'Администрирование клиентов'}
              {activeNavTab === 'new-bot' && 'Конструктор нового бота'}
              {activeNavTab === 'guide' && 'Инструкция по подключению'}
              {activeNavTab === 'agency-copilot' && 'Ассистент Нашего Агентства'}
              {activeNavTab === 'finance' && 'MRR и Абонплаты'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Bots Counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-400 text-[11px] font-bold">
              {clients.length}
            </span>
            <span className="text-slate-400 text-[11px] hidden xs:inline">
              клиентов
            </span>
          </div>

          {/* Reset Mock Defaults */}
          <button
            onClick={handleResetDefaults}
            title="Восстановить примеры клиентов"
            className="p-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Scrollable Main Mobile Body */}
      <main className="flex-1 overflow-y-auto bg-slate-950 pb-20 w-full">
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
      </main>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav className="shrink-0 bg-slate-900/95 border-t border-slate-800/80 py-1.5 px-2 flex items-center justify-around text-[10px] backdrop-blur-md shadow-2xl z-30">
        <button
          onClick={() => setActiveNavTab('clients')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            activeNavTab === 'clients'
              ? 'text-emerald-400 font-bold bg-emerald-500/15 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span>Клиенты ({clients.length})</span>
        </button>

        <button
          onClick={() => setActiveNavTab('new-bot')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            activeNavTab === 'new-bot'
              ? 'text-emerald-400 font-bold bg-emerald-500/15 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PlusCircle className="w-4 h-4 mb-0.5" />
          <span>Новый бот</span>
        </button>

        <button
          onClick={() => setActiveNavTab('guide')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            activeNavTab === 'guide'
              ? 'text-cyan-400 font-bold bg-cyan-500/15 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Инструкция</span>
        </button>

        <button
          onClick={() => setActiveNavTab('agency-copilot')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer relative ${
            activeNavTab === 'agency-copilot'
              ? 'text-purple-300 font-bold bg-purple-500/15 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="absolute -top-0.5 right-2 w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
          <Bot className="w-4 h-4 mb-0.5 text-purple-400" />
          <span>Наш бот</span>
        </button>

        <button
          onClick={() => setActiveNavTab('finance')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            activeNavTab === 'finance'
              ? 'text-emerald-400 font-bold bg-emerald-500/15 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-4 h-4 mb-0.5" />
          <span>Финансы</span>
        </button>
      </nav>

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
