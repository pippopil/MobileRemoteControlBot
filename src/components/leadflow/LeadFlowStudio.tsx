import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  FileText,
  Code,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Clock,
  Briefcase,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Volume2
} from 'lucide-react';

interface Lead {
  id: string;
  clientName: string;
  phone: string;
  serviceNeeded: string;
  details: string;
  estimatedValue: number;
  status: 'new' | 'qualified' | 'booked' | 'won' | 'lost';
  source: string;
  preferredTime: string;
  createdAt: string;
  conversationSnippet: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const NICHES = [
  {
    id: 'autoservice',
    title: 'Автосервис & Детейлинг',
    defaultBusinessName: 'АвтоТехЦентр «Формула»',
    greeting: 'Здравствуйте! Я онлайн-мастер приёмщик АвтоТехЦентра «Формула» 🚗 Помогу рассчитать стоимость ремонта и забронировать пост без ожидания.',
    samplePrompts: ['Сколько стоит замена колодок на BMW?', 'Записаться на замену масла завтра', 'Стучит подвеска спереди'],
    suggestedServices: ['ТО и замена масла', 'Диагностика ходовой', 'Замена тормозных колодок', 'Кузовной ремонт / Детейлинг'],
    avgCheck: 14500
  },
  {
    id: 'dental',
    title: 'Стоматология & Клиника',
    defaultBusinessName: 'Клиника «ДентаЛюкс»',
    greeting: 'Здравствуйте! Я виртуальный координатор клиники «ДентаЛюкс» 🦷 Помогу подобрать удобное время к врачу и сориентирую по ценам.',
    samplePrompts: ['Острая боль в зубе, нужно срочно', 'Сколько стоит профессиональная чистка?', 'Хочу записаться на консультацию по имплантации'],
    suggestedServices: ['Лечение кариеса', 'Профессиональная гигиена', 'Консультация имплантолога', 'Острая боль'],
    avgCheck: 8500
  },
  {
    id: 'renovation',
    title: 'Ремонт квартир & Отделка',
    defaultBusinessName: 'Студия ремонта «Эталон»',
    greeting: 'Приветствую! Я ассистент студии «Эталон» 🏗️ Помогу рассчитать примерную смету ремонта и записаться на бесплатный выезд замерщика.',
    samplePrompts: ['Сколько стоит ремонт 2-комнатной 65м²?', 'Нужен только санузел под ключ', 'Вызвать замерщика в субботу в новостройку'],
    suggestedServices: ['Капитальный ремонт под ключ', 'Косметический ремонт', 'Ремонт санузла', 'Вызов замерщика со сметой'],
    avgCheck: 280000
  },
  {
    id: 'legal',
    title: 'Юрист & Банкротство',
    defaultBusinessName: 'Юридическая группа «Право»',
    greeting: 'Здравствуйте! Я дежурный юрист центра «Право» ⚖️ Помогу оценить вашу ситуацию и назначить бесплатную 20-минутную консультацию с ведущим адвокатом.',
    samplePrompts: ['Списание долгов через банкротство', 'Раздел имущества при разводе', 'Арбитражный спор с поставщиком'],
    suggestedServices: ['Банкротство физлиц', 'Семейные споры', 'Арбитраж и B2B споры', 'Защита прав потребителей'],
    avgCheck: 65000
  }
];

export const LeadFlowStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'crm' | 'integration' | 'proposal'>('simulator');
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
  const [businessName, setBusinessName] = useState(NICHES[0].defaultBusinessName);

  // Chat Simulator State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: NICHES[0].greeting,
      time: '14:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [crmFilter, setCrmFilter] = useState<'all' | 'new' | 'booked' | 'won'>('all');
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null);

  // Proposal State
  const [proposalClientCompany, setProposalClientCompany] = useState('АвтоТехЦентр «Драйв»');
  const [proposalClientOwner, setProposalClientOwner] = useState('Виктор Михайлович (Директор)');
  const [proposalData, setProposalData] = useState<any>(null);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Load Leads from Backend
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error('Error fetching leads:', e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update initial greeting when niche changes
  const handleNicheChange = (niche: typeof NICHES[0]) => {
    setSelectedNiche(niche);
    setBusinessName(niche.defaultBusinessName);
    setChatMessages([
      {
        id: `greet-${Date.now()}`,
        sender: 'bot',
        text: niche.greeting,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isBotThinking]);

  // Send message in simulator
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsBotThinking(true);

    try {
      const history = chatMessages.map(m => ({ role: m.sender, content: m.text }));
      const res = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          niche: selectedNiche.title,
          businessName
        })
      });

      const data = await res.json();
      if (data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botMsg]);

        // If phone or booking detected, auto create lead in CRM!
        const hasPhone = text.match(/\+?\d[\d\s\-\(\)]{8,}\d/);
        if (data.isBookingReady || hasPhone) {
          const newLeadPayload = {
            clientName: data.extractedData?.clientName || 'Пользователь Telegram',
            phone: hasPhone ? hasPhone[0] : (data.extractedData?.phone || '+7 (999) 714-23-01'),
            serviceNeeded: data.extractedData?.service || selectedNiche.suggestedServices[0],
            details: text,
            estimatedValue: selectedNiche.avgCheck,
            preferredTime: data.extractedData?.preferredTime || 'Завтра, 14:00',
            source: 'Telegram Бот (Живой тест-драйв)',
            conversationSnippet: text
          };

          const leadRes = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLeadPayload)
          });
          const leadData = await leadRes.json();
          if (leadData.success) {
            setLeads(prev => [leadData.lead, ...prev]);
            setNewLeadNotification(`🔔 Новый горячий лид: ${newLeadPayload.phone} (${newLeadPayload.serviceNeeded})`);
            setTimeout(() => setNewLeadNotification(null), 5000);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBotThinking(false);
    }
  };

  // Update lead status in CRM
  const handleUpdateStatus = async (id: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Generate Commercial Proposal
  const handleGenerateProposal = async () => {
    setIsGeneratingProposal(true);
    try {
      const res = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientCompanyName: proposalClientCompany,
          niche: selectedNiche.title,
          ownerName: proposalClientOwner
        })
      });
      const data = await res.json();
      if (data.success) {
        setProposalData(data.proposal);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filtered leads
  const filteredLeads = crmFilter === 'all'
    ? leads
    : leads.filter(l => l.status === crmFilter);

  const totalPipelineRevenue = leads.reduce((acc, l) => acc + (l.status !== 'lost' ? l.estimatedValue : 0), 0);
  const bookedCount = leads.filter(l => l.status === 'booked' || l.status === 'won').length;

  return (
    <div className="space-y-6">
      {/* LeadFlow Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ГОТОВЫЙ ПРОДУКТ: ВАРИАНТ №1</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              LeadFlow AI — Telegram/WhatsApp Бот-квалификатор и запись клиентов 24/7
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Готовая платформа для продажи локальным бизнесам. Клиенты платят <strong className="text-white">15 000 – 35 000 ₽ за внедрение</strong> и <strong className="text-emerald-400">3 500 – 7 000 ₽/мес абонплату</strong> за каждого подключенного бота.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Выручка в пайплайне</div>
              <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                {totalPipelineRevenue.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        </div>

        {/* Studio Subtabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveSubTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>1. Симулятор Telegram-бота</span>
          </button>

          <button
            onClick={() => setActiveSubTab('crm')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'crm'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. CRM-Панель владельца ({leads.length} лидов)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('integration')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'integration'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>3. Виджет & Код интеграции</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('proposal');
              if (!proposalData) handleGenerateProposal();
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'proposal'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>4. Генератор КП для клиента (19 000 ₽)</span>
          </button>
        </div>
      </div>

      {/* Floating Lead Notification */}
      {newLeadNotification && (
        <div className="bg-emerald-500 text-slate-950 font-bold text-xs p-3 rounded-xl shadow-lg flex items-center justify-between animate-bounce">
          <span>{newLeadNotification}</span>
          <button
            onClick={() => setActiveSubTab('crm')}
            className="underline cursor-pointer text-slate-900 hover:text-black font-semibold ml-2"
          >
            Открыть CRM →
          </button>
        </div>
      )}

      {/* SUBTAB 1: LIVE BOT SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Settings & Niche Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Выберите нишу для тест-драйва</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Попробуйте протестировать бота от лица реального клиента. Посмотрите, как робот мгновенно квалифицирует запрос и передает лида в CRM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NICHES.map(niche => (
                  <button
                    key={niche.id}
                    onClick={() => handleNicheChange(niche)}
                    className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
                      selectedNiche.id === niche.id
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{niche.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Чек: ~{niche.avgCheck.toLocaleString('ru-RU')} ₽
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Название компании клиента:</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Fast prompt clickers */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">
                  Быстрые вопросы для проверки бота:
                </span>
                <div className="space-y-1.5">
                  {selectedNiche.samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="w-full text-left p-2 bg-slate-950 border border-slate-800/80 rounded-lg text-xs text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="truncate">«{p}»</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Value Proposition Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Что говорить владельцу на демо:</span>
              </div>
              <p className="leading-relaxed">
                «Покажите этот экран владельцу автосервиса прямо с телефона. Напишите: <em>«Стучит подвеска, запишите на завтра»</em>. Когда бот попросит телефон и зафиксирует запись в CRM за 20 секунд — 9 из 10 владельцев говорят: <em>«Сколько стоит поставить мне такое же?»</em>
              </p>
            </div>
          </div>

          {/* Right: Phone Frame Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700/80 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[580px]">
              {/* Telegram Phone Header */}
              <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700/60 text-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">{businessName}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>робот на связи 24/7 (отвечает мгновенно)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNicheChange(selectedNiche)}
                  title="Очистить чат"
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Message Scroll Area */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-950 to-slate-900 text-xs"
              >
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                          : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60 shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <div
                        className={`text-[9px] mt-1 text-right font-mono ${
                          msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}

                {isBotThinking && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5 text-slate-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                      <span className="text-[11px] ml-1">Печатает ответ...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-800/90 border-t border-slate-700/60 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите вопрос или телефон..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CRM DASHBOARD */}
      {activeSubTab === 'crm' && (
        <div className="space-y-6">
          {/* Metrics bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Всего лидов с бота</div>
              <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                {leads.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">зафиксировано 100% заявок</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Записаны на визит</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                {bookedCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">готовые слоты в графике</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Средний чек заявки</div>
              <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums mt-0.5">
                {Math.round(totalPipelineRevenue / (leads.length || 1)).toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-[11px] text-slate-400 mt-1">подтвержденная платежеспособность</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Спасённая прибыль</div>
              <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
                {totalPipelineRevenue.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-[11px] text-slate-400 mt-1">лиды, которые не ушли конкурентам</div>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Журнал входящих лидов</span>
                <span className="text-xs text-slate-400 font-mono tabular-nums">({filteredLeads.length})</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setCrmFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    crmFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => setCrmFilter('new')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    crmFilter === 'new' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Новые
                </button>
                <button
                  onClick={() => setCrmFilter('booked')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    crmFilter === 'booked' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Записанные
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-950/40">
                    <th className="p-3.5">Клиент & Контакты</th>
                    <th className="p-3.5">Услуга / Задача</th>
                    <th className="p-3.5">Слот записи</th>
                    <th className="p-3.5">Сумма заказа</th>
                    <th className="p-3.5">Статус</th>
                    <th className="p-3.5">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-850/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{lead.clientName}</div>
                        <div className="font-mono text-emerald-400 text-[11px] mt-0.5">{lead.phone}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{lead.source} · {lead.createdAt}</div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <div className="text-slate-200 font-medium">{lead.serviceNeeded}</div>
                        <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{lead.details}</div>
                      </td>

                      <td className="p-3.5 font-mono text-slate-300">
                        {lead.preferredTime}
                      </td>

                      <td className="p-3.5 font-mono font-bold text-white tabular-nums">
                        {lead.estimatedValue.toLocaleString('ru-RU')} ₽
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium font-mono ${
                          lead.status === 'booked' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                          lead.status === 'new' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          lead.status === 'qualified' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {lead.status === 'booked' ? 'Записан' :
                           lead.status === 'new' ? 'Новый лид' :
                           lead.status === 'qualified' ? 'Квалифицирован' : 'Закрыт'}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="new">Новый</option>
                          <option value="qualified">Квалифицирован</option>
                          <option value="booked">Записан</option>
                          <option value="won">Оплачено</option>
                          <option value="lost">Отказ</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: INTEGRATION & WIDGET CODE */}
      {activeSubTab === 'integration' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>Код виджета для сайта клиента (1 строчка)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Чтобы встроить бота на сайт заказчика (Tilda, WordPress, кастомный сайт), достаточно скопировать этот скрипт и вставить перед тегом <code>&lt;/body&gt;</code>:
            </p>

            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`<!-- LeadFlow AI Assistant Widget -->
<script 
  src="https://leadflow-ai.app/widget.js" 
  data-business-id="client-${selectedNiche.id}-2026"
  data-channel="telegram"
  data-auto-open="true"
  async>
</script>`}
              </pre>

              <button
                onClick={() => handleCopyCode(`<!-- LeadFlow AI Widget -->\n<script src="https://leadflow-ai.app/widget.js" data-business-id="client-${selectedNiche.id}-2026" async></script>`)}
                className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-2 border-t border-slate-800">
              <div className="font-semibold text-slate-200">Прямая ссылка для Telegram-рекламы и соцсетей:</div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-emerald-400 flex items-center justify-between">
                <span>https://t.me/leadflow_booking_bot?start={selectedNiche.id}</span>
                <button
                  onClick={() => handleCopyCode(`https://t.me/leadflow_booking_bot?start=${selectedNiche.id}`)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Копировать
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Настройка уведомлений владельца бизнеса</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Каждый раз, когда бот фиксирует телефон и услугу, уведомление мгновенно отправляется директору компании:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
              <div className="text-emerald-400 font-semibold font-mono text-[11px] flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>ПРИМЕР PUSH-УВЕДОМЛЕНИЯ В TELEGRAM ДИРЕКТОРА:</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/90 text-slate-200 font-mono text-[11px] leading-relaxed">
                🚨 <strong>НОВАЯ ГОРЯЧАЯ ЗАПИСЬ С БОТА!</strong><br />
                👤 <strong>Клиент:</strong> Алексей Смирнов<br />
                📞 <strong>Телефон:</strong> +7 (926) 451-88-29<br />
                🔧 <strong>Услуга:</strong> ТО и замена колодок BMW X5<br />
                📅 <strong>Время визита:</strong> Завтра в 11:30<br />
                💰 <strong>Ожидаемый чек:</strong> 18 500 ₽
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>Совет по внедрению:</strong> Подключите бота к личному Telegram владельца за 5 минут через BotFather и Webhook — это производит колоссальный «вау-эффект».
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: COMMERCIAL PROPOSAL GENERATOR */}
      {activeSubTab === 'proposal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Данные для КП под конкретного клиента</span>
            </h3>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Компания заказчика:</label>
              <input
                type="text"
                value={proposalClientCompany}
                onChange={(e) => setProposalClientCompany(e.target.value)}
                placeholder="Автосервис «Драйв»"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Имя руководителя / ЛПРа:</label>
              <input
                type="text"
                value={proposalClientOwner}
                onChange={(e) => setProposalClientOwner(e.target.value)}
                placeholder="Виктор Михайлович (Владелец)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleGenerateProposal}
              disabled={isGeneratingProposal}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {isGeneratingProposal ? 'Формирую КП...' : 'Пересчитать Коммерческое Предложение'}
            </button>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <strong className="text-white block">Скрипт отправки КП в WhatsApp директору:</strong>
              <p className="italic text-slate-300">
                «Виктор Михайлович, здравствуйте! Как договаривались на созвоне, подготовил расчет окупаемости внедрения умного бота для «{proposalClientCompany}». Документ прикрепил ниже. Если утверждаем — завтра начинаем сборку.»
              </p>
            </div>
          </div>

          {/* Right: Printable Proposal View */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-200 shadow-2xl">
            {proposalData ? (
              <div className="space-y-5 text-xs">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    {proposalData.date} · КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {proposalData.title}
                  </h3>
                  <div className="text-slate-400 text-xs mt-0.5">
                    Кому: <span className="text-white font-medium">{proposalData.preparedFor}</span>
                  </div>
                </div>

                {/* Problem Audit */}
                <div>
                  <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Аудит текущей ситуации и потерь:</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                    {proposalData.problemAudit.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Что входит во внедрение решения «под ключ»:</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                    {proposalData.solutionDeliverables.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">РАЗОВОЕ ВНЕДРЕНИЕ:</div>
                    <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                      {proposalData.pricing.setupFee}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">АБОНЕНТСКАЯ ПЛАТА:</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      {proposalData.pricing.monthlyRetainer}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-[11px] leading-relaxed">
                  🛡️ <strong>100% Финансовая гарантия:</strong> {proposalData.guarantee}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Печать / Сохранить как PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                Загрузка данных коммерческого предложения...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
