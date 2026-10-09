import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Smartphone,
  Key,
  Bot,
  DollarSign,
  HelpCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';

interface ClientOnboardingGuideProps {
  onOpenNewBotWizard: () => void;
}

export const ClientOnboardingGuide: React.FC<ClientOnboardingGuideProps> = ({ onOpenNewBotWizard }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Создание бота в Telegram (@BotFather)',
      subtitle: 'Занимает ровно 2 минуты, полностью бесплатно',
      icon: Key
    },
    {
      num: 2,
      title: 'Добавление организации в BotHub Pro',
      subtitle: 'Ввод токена, контактов и выбор каналов',
      icon: Bot
    },
    {
      num: 3,
      title: 'Настройка AI-промпта и прайс-листа',
      subtitle: 'Услуги, цены, часы работы и частые вопросы',
      icon: Sparkles
    },
    {
      num: 4,
      title: 'Тестирование в интерактивном симуляторе',
      subtitle: 'Проверка ответов бота перед сдачей заказчику',
      icon: MessageSquare
    },
    {
      num: 5,
      title: 'Передача заказчику и настройка абонплаты',
      subtitle: 'Сбор разового чека за сетап и ежемесячного MRR',
      icon: DollarSign
    }
  ];

  const pitchScript = `Здравствуйте, [Имя руководителя]! Заметил вашу компанию на картах.
Мы разработали умного Telegram-бота для вашей ниши, который за 1 секунду отвечает клиентам 24/7, рассчитывает стоимость услуг по прайсу и записывает на свободное время прямо в чате.

Готов подключить вам бесплатный тест-драйв на 3 дня на пробу — посмотрите, сколько ночных и утренних заявок он спасет.
Интересно прислать 1-минутное видео или ссылку на демо-бота?`;

  const invoiceMessage = `Здравствуйте, [Имя клиента]!
Напоминаем, что срок оплаченного периода обслуживания вашего Telegram-бота «[Название бота]» подходит к концу ([Дата]).

Сумма ежемесячной поддержки: [Сумма] ₽.
В абонплату входит:
• Бесперебойная работа серверов 24/7
• Обновление прайс-листа и промптов по вашему запросу
• Аналитика заявок и резервное копирование

Реквизиты для оплаты: [Номер карты / СБП / Счет ИП].`;

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-3xl mx-auto text-slate-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/40 border border-emerald-500/30 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Инструкция: как подключать клиентов</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  По шагам
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Пошаговое руководство от создания Telegram-бота до получения первой абонентской платы
              </p>
            </div>
          </div>

          <button
            onClick={onOpenNewBotWizard}
            className="hidden sm:flex px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Zap className="w-4 h-4" />
            <span>Подключить бота</span>
          </button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  Шаг {s.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <div className="text-[11px] font-semibold line-clamp-2 mt-1 leading-tight">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Step Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4">
        {/* STEP 1 */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <Key className="w-5 h-5" />
              <span>Шаг 1. Получение API токена в @BotFather</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Все официальные Telegram-боты создаются через системного бота мессенджера — <strong>@BotFather</strong>. Это занимает ровно 2 минуты и не требует навыков программирования.
            </p>

            <div className="space-y-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">1</div>
                <div>
                  <div className="font-semibold text-white">Откройте Telegram и найдите бота @BotFather</div>
                  <div className="text-slate-400 mt-0.5">
                    Или перейдите по прямой ссылке: <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-mono">t.me/BotFather</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">2</div>
                <div>
                  <div className="font-semibold text-white">Отправьте команду <code className="bg-slate-800 text-emerald-300 px-1 py-0.5 rounded">/newbot</code></div>
                  <div className="text-slate-400 mt-0.5">
                    BotFather попросит вас указать отображаемое имя бота (например, <em>«Шиномонтаж 24/7»</em> или <em>«Барбершоп TopFade»</em>).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">3</div>
                <div>
                  <div className="font-semibold text-white">Укажите уникальный username бота</div>
                  <div className="text-slate-400 mt-0.5">
                    Username обязательно должен заканчиваться на <code>bot</code>, например: <code>Shina24_express_bot</code>.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">4</div>
                <div>
                  <div className="font-semibold text-white">Скопируйте полученный HTTP API Token</div>
                  <div className="text-slate-400 mt-0.5 font-mono break-all bg-slate-900 p-2 rounded-lg border border-slate-800 text-emerald-300">
                    7128394851:AAFpL89Qz_xY81290KmnOPqrStuVwXyZ123
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Этот токен вставляется в BotHub Pro на следующем шаге.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Далее: Шаг 2 (Добавление организации)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <Bot className="w-5 h-5" />
              <span>Шаг 2. Добавление организации в BotHub Pro</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              В приложении BotHub Pro перейдите во вкладку <strong>«Новый бот»</strong> или нажмите зелёную кнопку <strong>«Добавить бота»</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1. Выбор готовой ниши</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Выберите подходящую сферу: Автосервис, Салон красоты, Стоматология, Ресторан/доставка или Юристы. Система автоматически подставит средний рыночный чек абонплаты (3 500 – 7 900 ₽/мес).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>2. Контакты и телефон ЛПРа</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Укажите номер телефона организации (куда бот будет переводить сложные звонки клиентов) и имя управляющего.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>3. Вставка токена Telegram</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Вставьте токен из BotFather. BotHub Pro проверит его формат и создаст защищенный канал взаимодействия.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>4. Тариф и стоимость обслуживания</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Установите размер ежемесячной абонплаты (например, 4 900 ₽/мес) и разового чека за настройку (19 900 ₽).
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-3.5 py-1.5 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Далее: Шаг 3 (Настройка AI и прайса)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5" />
              <span>Шаг 3. Настройка AI-промпта и прайс-листа</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Главная ценность вашего бота для заказчика — он точно знает цены, услуги и график работы компании.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Генерация через AI-помощника в 1 клик</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  В мастере создания бота нажмите <strong>«Сгенерировать AI-конфигурацию»</strong>. Наш встроенный AI автоматически создаст профессиональный системный промпт, приветствие с эмодзи, перечень из 4-6 рыночных услуг и блок ответов на частые вопросы (FAQ).
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white">Пример системного промпта:</div>
                <div className="font-mono text-[11px] bg-slate-900 p-3 rounded-xl text-slate-300 border border-slate-800 leading-relaxed">
                  Ты — цифровой мастер-приемщик компании «АвтоЛидер 24» (тел: +7 999 123-45-67).<br/>
                  1. Вежливо узнай марку автомобиля и причину обращения.<br/>
                  2. Предложи свободный слот на сегодня или завтра.<br/>
                  3. Сориентируй по стоимости услуг по нашему прайсу (Замена масла 1500 ₽, ТО 4500 ₽).<br/>
                  4. Возьми номер телефона водителя для подтверждения бронирования.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="px-3.5 py-1.5 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Далее: Шаг 4 (Тестирование)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <MessageSquare className="w-5 h-5" />
              <span>Шаг 4. Тестирование бота в реальном времени</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Перед тем как отправить бота заказчику, проверьте его диалог прямо в BotHub Pro через <strong>встроенный симулятор</strong>.
            </p>

            <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="font-bold text-white mb-1">Чек-лист проверки перед запуском:</div>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Бот здоровается и называет правильное название компании</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>На вопрос «Сколько стоит?» отвечает точными ценами из прайс-листа</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>При запросе записи спрашивает дату, время и номер телефона</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>При нестандартном вопросе предлагает позвонить по номеру организации</span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep(3)}
                className="px-3.5 py-1.5 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Далее: Шаг 5 (Монетизация и абонплата)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {activeStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <DollarSign className="w-5 h-5" />
              <span>Шаг 5. Сдача клиенту и сбор ежемесячной абонплаты</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Главное преимущество модели BotHub Pro — это <strong>MRR (Monthly Recurring Revenue)</strong>. Вы не просто делаете бота один раз, а получаете стабильную абонентскую плату каждый месяц от 10-20 компаний.
            </p>

            {/* Cold pitch template */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">Шаблон сообщения для предложения бота заказчику:</span>
                <button
                  onClick={() => copyToClipboard(pitchScript, 'pitch')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === 'pitch' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'pitch' ? 'Скопировано!' : 'Копировать'}</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-300 font-sans whitespace-pre-line bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                {pitchScript}
              </div>
            </div>

            {/* Invoice template */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">Шаблон счета / напоминания об абонплате:</span>
                <button
                  onClick={() => copyToClipboard(invoiceMessage, 'invoice')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === 'invoice' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'invoice' ? 'Скопировано!' : 'Копировать'}</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-300 font-sans whitespace-pre-line bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                {invoiceMessage}
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 text-[11px]">
                  Готовы подключить первую компанию? Нажмите кнопку справа:
                </span>
              </div>
              <button
                onClick={onOpenNewBotWizard}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>Создать бота</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
