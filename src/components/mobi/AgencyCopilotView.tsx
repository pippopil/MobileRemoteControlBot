import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  FileText,
  DollarSign,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Loader2,
  RefreshCw,
  PhoneForwarded,
  ShieldAlert
} from 'lucide-react';
import { ClientBot, AgencyAssistantMessage } from '../../types';

interface AgencyCopilotViewProps {
  clients: ClientBot[];
  onOpenNewBotWizard: () => void;
}

export const AgencyCopilotView: React.FC<AgencyCopilotViewProps> = ({
  clients,
  onOpenNewBotWizard
}) => {
  const [messages, setMessages] = useState<AgencyAssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `👋 **Привет! Я внутренний бизнес-ассистент вашего агентства.**\n\nЯ помогаю развивать и монетизировать компанию по подключению ботов для организаций:\n• Составляю персонализированные **Коммерческие предложения (КП)**\n• Пишу **скрипты продаж и отработки возражений** («дорого», «зачем мне бот»)\n• Анализирую ваш клиентский портфель (${clients.length} клиентов) и нахожу точки роста\n• Проектирую системные промпты и тарифы для новых заказчиков.\n\nЧем помочь прямо сейчас?`,
      timestamp: '09:41',
      suggestions: [
        'Составить КП для автосервиса',
        'Как закрыть клиента на 25 000 ₽',
        'Скрипт отработки: «У нас есть админ»',
        'Экспресс-аудит моих клиентов'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalMRR = clients.reduce((acc, c) => acc + (c.status === 'active' ? c.monthlyFee : 0), 0);
  const totalDialogs = clients.reduce((acc, c) => acc + c.dialogsTotal, 0);

  const handleSendMessage = async (customText?: string) => {
    const text = (customText || inputVal).trim();
    if (!text || isLoading) return;

    const userMsg: AgencyAssistantMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/agency-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: {
            agencyName: 'BotHub Solutions',
            clientsCount: clients.length,
            totalMRR,
            clients: clients.map((c) => ({
              orgName: c.orgName,
              niche: c.niche,
              monthlyFee: c.monthlyFee,
              status: c.status
            }))
          }
        })
      });

      const data = await res.json();
      const assistantMsg: AgencyAssistantMessage = {
        id: 'a-' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'Готово! Чем еще помочь вашему агентству?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || ['Составить КП', 'Скрипт продаж', 'Анализ базы']
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: AgencyAssistantMessage = {
        id: 'a-' + Date.now(),
        sender: 'assistant',
        text: `💼 **План действий:**\n1. Предложите клиенту 3 дня бесплатного пилотного теста.\n2. Установите разовый тариф на запуск 19 900 ₽ + абонплату 3 900 ₽/мес.\n3. Покажите реальную экономию рабочего времени (от 30 часов в месяц).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Как составить КП', 'Скрипт звонка', 'Аналитика клиентов']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-3 p-3 sm:p-4 max-w-2xl mx-auto">
      {/* Agency Quick Stats Banner */}
      <div className="p-3.5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                <span>Ассистент Нашего Агентства</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Автопилот для продаж, КП и клиентского сервиса
              </div>
            </div>
          </div>

          <button
            onClick={onOpenNewBotWizard}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <span>+ Новый бот</span>
          </button>
        </div>

        {/* Micro stats strip */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
          <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Клиентов:</span>
            <span className="font-bold text-white text-xs">{clients.length} орг.</span>
          </div>
          <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Абонплаты MRR:</span>
            <span className="font-bold text-emerald-400 text-xs">{totalMRR.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Диалогов в сети:</span>
            <span className="font-bold text-blue-400 text-xs">{totalDialogs} шт.</span>
          </div>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { label: '💼 Составить КП для клиента', prompt: 'Составь коммерческое предложение для владельца автосервиса на подключение Telegram-бота с расчетом окупаемости' },
          { label: '🎯 Отработать «Дорого»', prompt: 'Как закрыть возражение клиента "25 000 руб за бота — это дорого, у нас есть администратор"?' },
          { label: '📊 Экспресс-аудит базы', prompt: 'Сделай аудит моей текущей клиентской базы и подскажи, кому можно сделать апсейл или предложить доп. услуги' },
          { label: '⚡ Скрипт холодного звонка', prompt: 'Напиши 30-секундный скрипт звонка управляющему автосервиса или салона красоты' }
        ].map((item, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSendMessage(item.prompt)}
            className="text-[11px] whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 min-h-[380px] max-h-[460px] overflow-y-auto p-4 space-y-3 bg-slate-950 border border-slate-800 rounded-3xl shadow-inner">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 max-w-[92%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-line prose prose-invert max-w-none text-xs">
                {m.text}
              </div>

              {m.sender === 'assistant' && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                  <button
                    onClick={() => handleCopy(m.id, m.text)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Скопировать КП / текст</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Suggestions pills below message */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      disabled={isLoading}
                      onClick={() => handleSendMessage(s)}
                      className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-purple-300 hover:text-white px-2 py-1 rounded-lg border border-purple-500/20 transition-colors cursor-pointer"
                    >
                      {s} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <span>Ассистент готовит расчет и ответ...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Спросите ассистента (например: напиши КП для салона)..."
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputVal.trim()}
          className="p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl font-bold transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
