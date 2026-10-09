import React, { useState } from 'react';
import {
  X,
  Bot,
  Settings,
  MessageSquare,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  Check,
  Send,
  Smartphone,
  Phone
} from 'lucide-react';
import { ClientBot, BotServiceItem } from '../../types';
import { ClientLiveTester } from './ClientLiveTester';

interface ClientDetailModalProps {
  client: ClientBot;
  onClose: () => void;
  onUpdateClient: (updated: ClientBot) => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  client,
  onClose,
  onUpdateClient
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tester' | 'knowledge' | 'channels'>('tester');
  const [copiedLink, setCopiedLink] = useState(false);
  const [services, setServices] = useState<BotServiceItem[]>(client.services);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(client.systemPrompt);
  const [greetingMessage, setGreetingMessage] = useState(client.greetingMessage);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    const price = parseInt(newServicePrice) || 0;
    const updated = [
      ...services,
      { id: 's-' + Date.now(), name: newServiceName.trim(), price, duration: '30 мин' }
    ];
    setServices(updated);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleRemoveService = (idx: number) => {
    setServices(services.filter((_, i) => i !== idx));
  };

  const handleSaveConfig = () => {
    const updated: ClientBot = {
      ...client,
      services,
      systemPrompt,
      greetingMessage
    };
    onUpdateClient(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleToggleStatus = () => {
    const nextStatus = client.status === 'active' ? 'paused' : 'active';
    onUpdateClient({ ...client, status: nextStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">{client.orgName}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    client.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : client.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {client.status === 'active' ? '🟢 Онлайн' : client.status === 'warning' ? '🟡 Внимание' : '⚪ Пауза'}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{client.niche}</span>
                <span>•</span>
                <span className="font-mono text-emerald-300">{client.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStatus}
              className={`text-xs px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                client.status === 'active'
                  ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
              }`}
            >
              {client.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{client.status === 'active' ? 'Пауза' : 'Включить'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tester'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Тест диалога</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Метрики & Финансы</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'knowledge'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Промпт & Услуги ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'channels'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Каналы ({client.channels.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'tester' && (
            <div>
              <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                <span>Проверьте ответы бота в реальном времени перед клиентом:</span>
                <span className="font-mono text-emerald-400 font-semibold">{client.botUsername}</span>
              </div>
              <ClientLiveTester client={{ ...client, services, systemPrompt, greetingMessage }} />
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Диалогов за месяц</div>
                  <div className="text-xl font-bold text-white mt-1">{client.dialogsTotal}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">+{client.dialogsToday} сегодня</div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Лидов записано</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{client.leadsCaptured}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Конверсия {client.conversionRate}%</div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Сэкономлено времени</div>
                  <div className="text-xl font-bold text-blue-400 mt-1">{client.hoursSavedEst} ч</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">вместо оператора</div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Абонплата MRR</div>
                  <div className="text-xl font-bold text-emerald-300 mt-1">{client.monthlyFee.toLocaleString('ru-RU')} ₽</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">до {client.nextBillingDate}</div>
                </div>
              </div>

              {/* Client Info Panel */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
                <div className="font-semibold text-white text-sm">Параметры клиента</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div><strong>Контактное лицо:</strong> {client.contactPerson}</div>
                  <div><strong>Телефон для заявок:</strong> <span className="font-mono text-emerald-400">{client.phone}</span></div>
                  <div><strong>Тарифный план:</strong> <span className="uppercase text-emerald-400 font-bold">{client.plan}</span></div>
                  <div><strong>Разовый Setup Fee:</strong> {client.setupFeePaid.toLocaleString('ru-RU')} ₽ (Оплачен)</div>
                  <div><strong>Подключен с:</strong> {client.createdAt}</div>
                  <div><strong>Последняя активность:</strong> {client.lastActive}</div>
                </div>
              </div>

              {/* Payment Bill Generator Action */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">Сформировать счет на абонентскую плату</div>
                  <div className="text-slate-300">Ежемесячный платеж {client.monthlyFee.toLocaleString('ru-RU')} ₽ за поддержку и сервер бота.</div>
                </div>
                <button
                  onClick={() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Ссылка скопирована' : 'Скопировать ссылку на оплату'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-4 text-xs">
              {/* Greeting */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200">Приветственное сообщение бота:</label>
                <textarea
                  rows={2}
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 text-slate-100 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* System Prompt */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200">Системный промпт (Роль и логика ИИ):</label>
                <textarea
                  rows={5}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 font-mono text-[11px] text-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Services & Prices */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-200">Прайс-лист и услуги клиента:</label>
                  <span className="text-[11px] text-slate-400">Бот использует эти цены для точного расчета</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {services.map((s, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                      <div className="font-medium text-slate-200 truncate flex-1">{s.name}</div>
                      <div className="font-mono text-emerald-400 font-bold shrink-0">{s.price.toLocaleString('ru-RU')} ₽</div>
                      <button
                        onClick={() => handleRemoveService(idx)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Service Row */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Название услуги..."
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="flex-1 p-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="number"
                    placeholder="Цена, ₽"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-24 p-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleAddService}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить</span>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-emerald-400 text-xs font-medium">
                  {saveSuccess && '✓ Настройки успешно сохранены!'}
                </span>
                <button
                  onClick={handleSaveConfig}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="font-semibold text-white text-sm">Подключенные платформы</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {client.channels.map((ch) => (
                    <div key={ch} className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 font-medium capitalize text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{ch === 'max' ? 'МАКС (РФ без VPN)' : ch}</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                        Подключен
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="font-semibold text-white">Интеграция с Telegram (@BotFather)</div>
                <div className="text-slate-400">Токен бота активен и настроен на сервер автоматической обработки:</div>
                <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-slate-300 break-all select-all">
                  7189432049:AAFXkL81938_demoTokenActive
                </div>
              </div>

              <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-1.5">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Канал мессенджера МАКС (Работает в РФ без VPN)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Бот подключен к корпоративному шлюзу МАКС через Webhook API. Все клиенты без VPN могут сразу бронировать запись со смартфона.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
