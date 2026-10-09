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
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Layers,
  Wrench,
  Clock,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { ClientBot, BotChannel, BotStatus } from '../../types';

interface ClientsAdminViewProps {
  clients: ClientBot[];
  onSelectClient: (client: ClientBot) => void;
  onOpenNewBotWizard: () => void;
  onOpenTireShopSolution: () => void;
}

export const ClientsAdminView: React.FC<ClientsAdminViewProps> = ({
  clients,
  onSelectClient,
  onOpenNewBotWizard,
  onOpenTireShopSolution
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchesChannel =
      selectedChannel === 'all' || c.channels.includes(selectedChannel as BotChannel);

    const matchesStatus =
      selectedStatus === 'all' || c.status === (selectedStatus as BotStatus);

    return matchesSearch && matchesChannel && matchesStatus;
  });

  const totalDialogsToday = clients.reduce((acc, c) => acc + c.dialogsToday, 0);
  const totalLeads = clients.reduce((acc, c) => acc + c.leadsCaptured, 0);

  return (
    <div className="p-3 sm:p-4 space-y-3.5 max-w-2xl mx-auto">
      {/* Top Welcome & KPI Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Администрирование клиентов</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {clients.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Сегодня обработано <strong className="text-emerald-400">{totalDialogsToday}</strong> диалогов •{' '}
            <strong className="text-blue-400">{totalLeads}</strong> заявок
          </p>
        </div>

        <button
          onClick={onOpenNewBotWizard}
          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить бота</span>
        </button>
      </div>

      {/* Featured Shortcut: Tire Shop 89437653289 */}
      <div className="p-3 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Шиномонтаж (тел. 89437653289)</span>
              <span className="text-[10px] text-emerald-400 font-semibold">• Готовое решение</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Telegram + МАКС бот с калькулятором радиусов R13-R22 и живой очередью
            </div>
          </div>
        </div>

        <button
          onClick={onOpenTireShopSolution}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl font-medium text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
        >
          Открыть кейс →
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Поиск по названию, нише или номеру телефона..."
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
          { id: 'all', label: 'Все статусы' },
          { id: 'active', label: '🟢 Онлайн' },
          { id: 'warning', label: '🟡 Внимание' }
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
          return (
            <div
              key={client.id}
              className={`p-4 bg-slate-900 border rounded-3xl transition-all duration-150 shadow-md ${
                isWarning
                  ? 'border-amber-500/40 hover:border-amber-500/60'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm truncate">{client.orgName}</h3>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          client.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {client.status === 'active' ? '🟢 Онлайн' : '🟡 Оплата'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
                      <span>{client.niche}</span>
                      <span>•</span>
                      <a
                        href={`tel:${client.phone}`}
                        className="font-mono text-emerald-300 hover:underline"
                      >
                        {client.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                    {client.monthlyFee.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-[10px] text-slate-400">тариф {client.plan}</div>
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
                  <span className="font-bold text-blue-400 text-xs">{client.hoursSavedEst} ч</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => onSelectClient(client)}
                  className="flex-1 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Тест бота в чате</span>
                </button>

                <button
                  onClick={() => onSelectClient(client)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                  title="Настройки бота"
                >
                  <Settings className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${client.phone}`}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                  title="Позвонить клиенту"
                >
                  <Phone className="w-4 h-4" />
                </a>
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
    </div>
  );
};
