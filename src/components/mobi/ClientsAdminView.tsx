import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bot,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  MessageSquare,
  Settings,
  Phone,
  Trash2,
  DollarSign,
  BookOpen,
  Send,
  Zap,
  TrendingUp,
  Clock,
  Check
} from 'lucide-react';
import { ClientBot, BotChannel, BotStatus } from '../../types';

interface ClientsAdminViewProps {
  clients: ClientBot[];
  onSelectClient: (client: ClientBot) => void;
  onOpenNewBotWizard: () => void;
  onOpenGuide: () => void;
  onToggleStatus: (clientId: string) => void;
  onDeleteClient: (clientId: string) => void;
  onMarkPaid: (clientId: string) => void;
}

export const ClientsAdminView: React.FC<ClientsAdminViewProps> = ({
  clients,
  onSelectClient,
  onOpenNewBotWizard,
  onOpenGuide,
  onToggleStatus,
  onDeleteClient,
  onMarkPaid
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [clientToDelete, setClientToDelete] = useState<ClientBot | null>(null);
  const [paidToastId, setPaidToastId] = useState<string | null>(null);

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.botUsername && c.botUsername.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesChannel =
      selectedChannel === 'all' || c.channels.includes(selectedChannel as BotChannel);

    const matchesStatus =
      selectedStatus === 'all' || c.status === (selectedStatus as BotStatus);

    return matchesSearch && matchesChannel && matchesStatus;
  });

  const totalDialogsToday = clients.reduce((acc, c) => acc + c.dialogsToday, 0);
  const totalLeads = clients.reduce((acc, c) => acc + c.leadsCaptured, 0);
  const totalMrr = clients
    .filter((c) => c.status === 'active' || c.status === 'warning')
    .reduce((acc, c) => acc + c.monthlyFee, 0);

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      onDeleteClient(clientToDelete.id);
      setClientToDelete(null);
    }
  };

  const handlePayClick = (clientId: string) => {
    onMarkPaid(clientId);
    setPaidToastId(clientId);
    setTimeout(() => setPaidToastId(null), 2500);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3.5 max-w-2xl mx-auto">
      {/* Top Welcome & KPI Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Подключенные организации</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {clients.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            MRR: <strong className="text-emerald-400 font-mono">{totalMrr.toLocaleString('ru-RU')} ₽/мес</strong> •{' '}
            Сегодня: <strong className="text-cyan-400">{totalDialogsToday}</strong> диалогов
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewBotWizard}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить бота</span>
          </button>
        </div>
      </div>

      {/* Guide & Onboarding Callout Card */}
      <div className="p-3 bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Как подключать реальных клиентов?</span>
              <span className="text-[10px] text-emerald-300 font-semibold">• Пошаговый гайд</span>
            </div>
            <div className="text-[11px] text-slate-400">
              BotFather → токен → настройка промпта и цен → сбор абонплаты (MRR)
            </div>
          </div>
        </div>

        <button
          onClick={onOpenGuide}
          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
        >
          Инструкция →
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Поиск организации, ниши, телефона или @бота..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Filter Tabs by Channel & Status */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        {[
          { id: 'all', label: 'Все каналы' },
          { id: 'telegram', label: 'Telegram' },
          { id: 'max', label: 'МАКС (РФ)' },
          { id: 'whatsapp', label: 'WhatsApp' },
          { id: 'vk', label: 'ВКонтакте' },
          { id: 'web', label: 'Сайт' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedChannel(tab.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedChannel === tab.id
                ? 'bg-slate-800 text-white font-bold border border-slate-700'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-800 mx-1 shrink-0"></div>

        {[
          { id: 'all', label: 'Все' },
          { id: 'active', label: '🟢 Онлайн' },
          { id: 'paused', label: '⏸ На паузе' },
          { id: 'warning', label: '🟡 Оплата' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStatus(s.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedStatus === s.id
                ? 'bg-slate-800 text-white font-bold border border-slate-700'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Client Bot Cards List */}
      <div className="space-y-3">
        {filteredClients.map((client) => {
          const isWarning = client.status === 'warning';
          const isPaused = client.status === 'paused';
          const isActive = client.status === 'active';

          return (
            <div
              key={client.id}
              className={`p-4 bg-slate-900 border rounded-3xl transition-all duration-150 shadow-md ${
                isWarning
                  ? 'border-amber-500/40 hover:border-amber-500/60'
                  : isPaused
                  ? 'border-slate-800/80 opacity-80'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isWarning
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm truncate">{client.orgName}</h3>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : isWarning
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isActive ? '🟢 Онлайн' : isWarning ? '🟡 Требует оплаты' : '⏸ На паузе'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5 truncate flex items-center gap-1.5 flex-wrap">
                      <span>{client.niche}</span>
                      <span>•</span>
                      <a
                        href={`tel:${client.phone}`}
                        className="font-mono text-emerald-300 hover:underline"
                      >
                        {client.phone}
                      </a>
                      {client.botUsername && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-cyan-400">{client.botUsername}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                    {client.monthlyFee.toLocaleString('ru-RU')} ₽/мес
                  </div>
                  <div className="text-[10px] text-slate-400">
                    до {new Date(client.nextBillingDate).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </div>

              {/* Channel Badges & Activity Strip */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {client.channels.map((ch) => (
                    <span
                      key={ch}
                      className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-lg font-mono capitalize"
                    >
                      {ch === 'max' ? 'МАКС (РФ)' : ch}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Активен: {client.lastActive}
                </div>
              </div>

              {/* Performance Metrics Strip */}
              <div className="mt-2.5 grid grid-cols-3 gap-2 text-center text-xs bg-slate-950 p-2 rounded-2xl border border-slate-800/60">
                <div>
                  <span className="text-[10px] text-slate-400 block">Диалогов:</span>
                  <span className="font-bold text-white text-xs">
                    {client.dialogsTotal}{' '}
                    <span className="text-emerald-400 text-[10px] font-normal">
                      (+{client.dialogsToday})
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Заявок (Лидов):</span>
                  <span className="font-bold text-emerald-400 text-xs">
                    {client.leadsCaptured}{' '}
                    <span className="text-slate-400 text-[10px] font-normal">
                      ({client.conversionRate}%)
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Сэкономлено:</span>
                  <span className="font-bold text-cyan-400 text-xs">{client.hoursSavedEst} ч</span>
                </div>
              </div>

              {/* Action Buttons Strip */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {/* 1. Live Chat Tester */}
                <button
                  onClick={() => onSelectClient(client)}
                  className="flex-1 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-w-[120px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Тест диалога</span>
                </button>

                {/* 2. Pause / Resume Toggle */}
                <button
                  onClick={() => onToggleStatus(client.id)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 hover:bg-amber-950/60 border-slate-700 text-slate-300 hover:text-amber-400'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-500/40 text-emerald-400'
                  }`}
                  title={isActive ? 'Поставить бота на паузу' : 'Запустить бота'}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                {/* 3. Mark Paid Button */}
                <button
                  onClick={() => handlePayClick(client.id)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-xl transition-colors cursor-pointer border border-slate-700"
                  title="Отметить получение абонплаты (продлить на 1 месяц)"
                >
                  {paidToastId === client.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                </button>

                {/* 4. Settings & Knowledge Base */}
                <button
                  onClick={() => onSelectClient(client)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer border border-slate-700"
                  title="Настройки системного промпта, прайса и токена"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* 5. Call Client */}
                <a
                  href={`tel:${client.phone}`}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-xl transition-colors cursor-pointer border border-slate-700"
                  title="Позвонить клиенту"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* 6. Delete Client */}
                <button
                  onClick={() => setClientToDelete(client)}
                  className="p-2 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-xl transition-colors cursor-pointer border border-slate-700"
                  title="Удалить организацию"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredClients.length === 0 && (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Bot className="w-10 h-10 text-slate-500 mx-auto" />
            <div className="text-sm font-semibold text-white">Ни одного бота не найдено</div>
            <p className="text-xs text-slate-400">Попробуйте изменить поисковый запрос или фильтры</p>
            <button
              onClick={onOpenNewBotWizard}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
            >
              Добавить первого бота
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Удалить организацию?</h3>
                <p className="text-xs text-slate-400">«{clientToDelete.orgName}»</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Вы уверены, что хотите удалить этого бота из пульта управления? Все сохранённые настройки промпта и прайс-лист будут стёрты.
            </p>

            <div className="flex items-center gap-2 justify-end pt-2">
              <button
                onClick={() => setClientToDelete(null)}
                className="px-3.5 py-2 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
