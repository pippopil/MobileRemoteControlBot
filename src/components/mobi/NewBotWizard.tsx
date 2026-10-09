import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Wrench,
  Scissors,
  Stethoscope,
  Utensils,
  Scale,
  GraduationCap,
  Plus,
  CheckCircle2,
  Phone,
  Send,
  Loader2,
  DollarSign,
  Smartphone
} from 'lucide-react';
import { ClientBot, BotChannel, BotPlan, BotServiceItem } from '../../types';
import { NICHE_PRESETS } from '../../data/clientsData';

interface NewBotWizardProps {
  onBotCreated: (bot: ClientBot) => void;
  onCancel: () => void;
}

export const NewBotWizard: React.FC<NewBotWizardProps> = ({ onBotCreated, onCancel }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNiche, setSelectedNiche] = useState(NICHE_PRESETS[0].name);
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [channels, setChannels] = useState<BotChannel[]>(['telegram', 'max']);
  const [plan, setPlan] = useState<BotPlan>('pro');
  const [monthlyFee, setMonthlyFee] = useState<number>(4900);
  const [setupFee, setSetupFee] = useState<number>(19900);

  // Bot intelligence
  const [servicesInput, setServicesInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [services, setServices] = useState<BotServiceItem[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleChannel = (ch: BotChannel) => {
    if (channels.includes(ch)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== ch));
      }
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleSelectNiche = (nicheName: string, fee: number) => {
    setSelectedNiche(nicheName);
    setMonthlyFee(fee);
  };

  const handleGenerateAiConfig = async () => {
    if (!orgName.trim()) {
      setErrorMsg('Пожалуйста, укажите название компании');
      return;
    }
    setErrorMsg('');
    setIsGeneratingAi(true);

    try {
      const res = await fetch('/api/generate-bot-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName,
          niche: selectedNiche,
          phone: phone || '+7 900 000-00-00',
          servicesText: servicesInput || selectedNiche,
          channels
        })
      });

      const data = await res.json();
      setGreetingMessage(data.greeting || `Здравствуйте! Вас приветствует бот компании «${orgName}» 🤖.`);
      setSystemPrompt(data.systemPrompt || `Ты — бот-помощник компании ${orgName}.`);
      if (Array.isArray(data.services) && data.services.length > 0) {
        setServices(data.services);
      } else {
        setServices([
          { name: 'Основная услуга', price: 2000, duration: '30 мин' },
          { name: 'Комплексный пакет', price: 4500, duration: '60 мин' }
        ]);
      }
      setStep(3);
    } catch {
      setErrorMsg('Не удалось связаться с сервером. Применены базовые шаблоны.');
      setGreetingMessage(`Здравствуйте! Вас приветствует бот компании «${orgName}» 🤖.`);
      setSystemPrompt(`Ты — бот-помощник компании ${orgName} (тел: ${phone}). Записываешь клиентов на услуги и отвечаешь на вопросы.`);
      setServices([
        { name: 'Стандартная услуга', price: 2500, duration: '30 мин' },
        { name: 'Экспресс-консультация', price: 1000, duration: '15 мин' }
      ]);
      setStep(3);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleFinishCreate = () => {
    const newBot: ClientBot = {
      id: 'bot-' + Date.now(),
      orgName: orgName.trim() || 'Новый клиент',
      niche: selectedNiche,
      phone: phone.trim() || '+7 900 000-00-00',
      contactPerson: contactPerson.trim() || 'Представитель',
      channels,
      status: 'active',
      plan,
      monthlyFee,
      setupFeePaid: setupFee,
      dialogsTotal: 0,
      dialogsToday: 0,
      leadsCaptured: 0,
      conversionRate: 0,
      avgResponseTimeSec: 0.8,
      hoursSavedEst: 0,
      systemPrompt: systemPrompt || `Ты — бот-помощник компании ${orgName}.`,
      greetingMessage: greetingMessage || `Здравствуйте! Это бот «${orgName}» 🤖. Чем могу помочь?`,
      botUsername: `@${orgName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}_bot`,
      tokenConfigured: true,
      services: services.length > 0 ? services : [{ name: 'Базовая услуга', price: 2000 }],
      faq: [
        { q: 'Как записаться?', a: 'Напишите желаемую дату и время прямо в этот чат.' },
        { q: 'Какой телефон?', a: `Номер для связи: ${phone || 'контактный'}.` }
      ],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Только что'
    };

    onBotCreated(newBot);
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      {/* Wizard Progress Steps */}
      <div className="flex items-center justify-between px-2 text-xs font-semibold">
        <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">1</span>
          <span>Компания</span>
        </div>
        <div className="h-0.5 w-8 bg-slate-800"></div>
        <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">2</span>
          <span>Каналы & ИИ</span>
        </div>
        <div className="h-0.5 w-8 bg-slate-800"></div>
        <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full bg-slate-800 border border-current flex items-center justify-center text-[10px]">3</span>
          <span>Запуск</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">
          {errorMsg}
        </div>
      )}

      {/* Step 1: Organization & Niche */}
      {step === 1 && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Шаг 1: Выберите нишу и параметры компании</span>
            </h3>
            <p className="text-xs text-slate-400">
              Бот получит готовую базу знаний и профессиональный контекст для общения.
            </p>
          </div>

          {/* Niche Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {NICHE_PRESETS.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleSelectNiche(n.name, n.typicalPrice)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedNiche === n.name
                    ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold">{n.name}</div>
                <div className="text-[10px] text-emerald-400 mt-1">от {n.typicalPrice} ₽/мес</div>
              </button>
            ))}
          </div>

          {/* Form Inputs */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Название организации *</label>
              <input
                type="text"
                placeholder="например, Автокомплекс Восток или Студия Красоты"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Контактный телефон *</label>
                <input
                  type="text"
                  placeholder="89437653289"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Контактное лицо (ЛПР)</label>
                <input
                  type="text"
                  placeholder="Иван, управляющий"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => {
                if (!orgName.trim()) {
                  setErrorMsg('Введите название организации');
                  return;
                }
                setStep(2);
              }}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Далее: Каналы и ИИ →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Channels & AI Generation */}
      {step === 2 && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Шаг 2: Мессенджеры и генерация роли</span>
            </h3>
            <p className="text-xs text-slate-400">
              Выберите, где будет отвечать бот, и сгенерируйте системный промпт через Gemini.
            </p>
          </div>

          {/* Channels Selection */}
          <div className="space-y-2 text-xs">
            <label className="block text-slate-300 font-medium">Каналы подключения:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'telegram' as BotChannel, label: 'Telegram Бот', note: 'Основной канал' },
                { id: 'max' as BotChannel, label: 'МАКС Мессенджер', note: 'Для РФ без VPN' },
                { id: 'whatsapp' as BotChannel, label: 'WhatsApp Business', note: 'По номеру телефона' },
                { id: 'web' as BotChannel, label: 'Виджет на сайт', note: 'Всплывающий чат' }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleChannel(c.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    channels.includes(c.id)
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{c.label}</span>
                    {channels.includes(c.id) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{c.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Plan */}
          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            {[
              { id: 'starter' as BotPlan, name: 'Старт', price: 3500 },
              { id: 'pro' as BotPlan, name: 'Про 🚀', price: 4900 },
              { id: 'enterprise' as BotPlan, name: 'VIP', price: 7900 }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPlan(p.id);
                  setMonthlyFee(p.price);
                }}
                className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                  plan === p.id
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>{p.name}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">{p.price} ₽/мес</div>
              </button>
            ))}
          </div>

          {/* Freeform services hint */}
          <div className="space-y-1.5 text-xs pt-2">
            <label className="block text-slate-300 font-medium">
              Особенности или примерные услуги (необязательно):
            </label>
            <input
              type="text"
              placeholder="например: шиномонтаж R15-R20, хранение шин, правка дисков"
              value={servicesInput}
              onChange={(e) => setServicesInput(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* AI Generator CTA Button */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Генерация готового бота за 2 секунды</span>
            </div>
            <p className="text-[11px] text-slate-300">
              ИИ автоматически напишет приветствие, системный промпт роли и составит прайс-лист для «{orgName}».
            </p>
            <button
              type="button"
              disabled={isGeneratingAi}
              onClick={handleGenerateAiConfig}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ИИ проектирует бота...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Сгенерировать конфигурацию ИИ →</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              ← Назад
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Пропустить генерацию
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation and Launch */}
      {step === 3 && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Шаг 3: Проверка и добавление в пульт</span>
            </h3>
            <p className="text-xs text-slate-400">
              Бот сконфигурирован и готов к тестированию в живом чате.
            </p>
          </div>

          {/* Summary Preview */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{orgName}</span>
              <span className="text-emerald-400 font-semibold">{monthlyFee.toLocaleString('ru-RU')} ₽/мес</span>
            </div>
            <div className="text-slate-400">
              Сфера: {selectedNiche} • Тел: <span className="font-mono text-emerald-300">{phone}</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {channels.map((c) => (
                <span key={c} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Greeting Preview */}
          <div className="space-y-1 text-xs">
            <label className="font-semibold text-slate-300">Приветствие бота:</label>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs">
              {greetingMessage || 'Здравствуйте! Чем могу помочь?'}
            </div>
          </div>

          {/* Services Generated */}
          {services.length > 0 && (
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300">Сгенерированные услуги ({services.length}):</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {services.map((s, idx) => (
                  <div key={idx} className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex justify-between text-xs">
                    <span className="text-slate-300 truncate">{s.name}</span>
                    <span className="font-mono text-emerald-400 font-bold shrink-0">{s.price} ₽</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Finish Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              ← Изменить
            </button>
            <button
              type="button"
              onClick={handleFinishCreate}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              ✓ Добавить бота в систему
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
