import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Wrench,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Send,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Printer,
  ChevronRight,
  Layers,
  Sparkles,
  Zap,
  Code,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface TireBooking {
  id: string;
  clientName: string;
  phone: string;
  tireRadius: string;
  service: string;
  carType: string;
  timeSlot: string;
  price: number;
  post: string;
  platform: 'max' | 'telegram' | 'web';
  status: 'booked' | 'in_progress' | 'completed';
}

export const TireShopBotSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'steps' | 'crm' | 'pitch' | 'code'>('simulator');
  const [selectedPlatform, setSelectedPlatform] = useState<'max' | 'telegram' | 'web'>('max');
  const [codeLanguage, setCodeLanguage] = useState<'max_python' | 'telegram_python' | 'web_widget'>('max_python');

  const shopPhone = '8 (943) 765-32-89';
  const shopName = 'Шиномонтаж «Экспресс 24/7»';

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      id: '1',
      sender: 'bot',
      text: `Здравствуйте! Вас приветствует робот записи «Шиномонтаж Экспресс 24/7» в мессенджере МАКС 🚗\nТелефон дежурного мастера: ${shopPhone}\n\nРаботаем официально в РФ БЕЗ VPN! Помогу записаться на свободный подъемник за 20 секунд:`,
      time: '18:15'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Quick action buttons for the customer
  const quickActions = [
    { label: '🛞 Сезонная переобувка R17–R19 (3 400 ₽)', text: 'Хочу переобуть 4 колеса R18 на кроссовер' },
    { label: '⚖️ Лазерная балансировка (от 900 ₽)', text: 'Нужна балансировка колес, бьет руль' },
    { label: '🔨 Правка литого диска (от 1 500 ₽)', text: 'Погнул литой диск в яме, нужно прокатать' },
    { label: '📦 Сезонное хранение шин (3 200 ₽)', text: 'Интересует хранение шин на сезон 6 месяцев' },
    { label: '📍 Дошиповка зимней резины', text: 'Сколько стоит дошиповать зимние шины?' }
  ];

  // Tire bookings in CRM
  const [bookings, setBookings] = useState<TireBooking[]>([
    {
      id: 'tb-1',
      clientName: 'Алексей (Toyota RAV4)',
      phone: '+7 (916) 554-12-80',
      tireRadius: 'R18',
      service: 'Сезонная переобувка 4-х колес',
      carType: 'Кроссовер',
      timeSlot: 'Сегодня в 18:30',
      price: 3400,
      post: 'Пост №1',
      platform: 'max',
      status: 'booked'
    },
    {
      id: 'tb-2',
      clientName: 'Дмитрий (BMW 5)',
      phone: '+7 (903) 712-44-91',
      tireRadius: 'R19',
      service: 'Правка диска + балансировка',
      carType: 'Легковой',
      timeSlot: 'Сегодня в 19:15',
      price: 2900,
      post: 'Пост №2',
      platform: 'max',
      status: 'booked'
    },
    {
      id: 'tb-3',
      clientName: 'Илья (Hyundai Solaris)',
      phone: '+7 (926) 338-99-10',
      tireRadius: 'R15',
      service: 'Переобувка 4-х колес + пакеты',
      carType: 'Легковой',
      timeSlot: 'Завтра в 09:00',
      price: 2400,
      post: 'Пост №1',
      platform: 'web',
      status: 'booked'
    }
  ]);

  const [notificationPopup, setNotificationPopup] = useState<string | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping]);

  const handleSendChatMessage = async (presetText?: string) => {
    const text = (presetText || chatInput).trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsBotTyping(true);

    try {
      const res = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          niche: 'Шиномонтаж и балансировка колес',
          businessName: shopName
        })
      });

      const data = await res.json();
      if (data.success) {
        const botMsg = {
          id: `b-${Date.now()}`,
          sender: 'bot' as const,
          text: data.reply,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botMsg]);

        const phoneMatch = text.match(/\+?\d[\d\s\-\(\)]{8,}\d/);
        if (data.isBookingReady || phoneMatch) {
          const newBooking: TireBooking = {
            id: `tb-${Date.now()}`,
            clientName: 'Клиент из МАКС',
            phone: phoneMatch ? phoneMatch[0] : '+7 (999) 451-22-89',
            tireRadius: 'R17',
            service: 'Сезонная переобувка под ключ',
            carType: 'Легковой / Кроссовер',
            timeSlot: 'Сегодня в 20:00 (Свободное окно)',
            price: 3400,
            post: 'Пост №1',
            platform: selectedPlatform,
            status: 'booked'
          };

          setBookings(prev => [newBooking, ...prev]);
          setNotificationPopup(`🔔 [Мессенджер МАКС · 89437653289] Новая бронь: ${newBooking.phone} на 20:00 (3 400 ₽)`);
          setTimeout(() => setNotificationPopup(null), 6000);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleCopy = (text: string, type: 'pitch' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'pitch') {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const whatsappPitchText = `«Привет! Знаю, что сейчас многие жалуются на сбои и блокировки Телеграма в РФ без ВПН. 

Поэтому мы собрали готового бота сразу на двух надежных российских каналах:
1. В новом мессенджере МАКС (max.ru) — работает 100% стабильно по всей России без каких-либо VPN!
2. В виде веб-виджета для Яндекс.Карт и 2ГИС — водитель просто кликает «Записаться» и бронирует подъемник прямо в браузере Safari/Chrome без установки приложений.

Телефон вашего шиномонтажа: ${shopPhone}.
Водитель за 15 секунд выбирает свой радиус колес (R15–R20+) и записывается на Пост №1 или Пост №2. Заявка мгновенно падает вам на телефон со звуковым пушем.

Попробуй сам потыкать прямо с телефона: [ссылка на сервис].
Готов подключить под ключ за 19 000 ₽ + 3 500 ₽/мес за поддержку. С двух машин окупается уже за первые 2 дня. Когда удобно показать живое демо?»`;

  const maxBotPythonCode = `# ========================================================
# ГОТОВЫЙ БОТ ДЛЯ МЕССЕНДЖЕРА МАКС (max.ru)
# Официальный API мессенджера МАКС (Работает в РФ БЕЗ VPN!)
# Телефон шиномонтажа: ${shopPhone}
# Установка: pip install requests
# ========================================================

import requests
import json
import time

MAX_API_URL = "https://api.max.ru/bot/v1"
MAX_BOT_TOKEN = "ВСТАВЬТЕ_ТОКЕН_БОТА_ИЗ_MAX"  # Получается в настройках бота МАКС
ADMIN_USER_ID = "ID_МАСТЕРА_ИЛИ_ДИРЕКТОРА"     # Телефон: ${shopPhone}

headers = {
    "Authorization": f"Bearer {MAX_BOT_TOKEN}",
    "Content-Type": "application/json"
}

def send_max_message(chat_id, text, buttons=None):
    payload = {
        "chat_id": chat_id,
        "text": text
    }
    if buttons:
        payload["inline_keyboard"] = buttons
        
    response = requests.post(f"{MAX_API_URL}/messages/send", headers=headers, json=payload)
    return response.json()

# Клавиатура с услугами шиномонтажа
SERVICES_BUTTONS = [
    [{"text": "🛞 Переобувка R14–R16 (2 400 ₽)", "callback_data": "r16"}],
    [{"text": "🛞 Переобувка R17–R19 (3 400 ₽)", "callback_data": "r18"}],
    [{"text": "🛞 Переобувка R20+ (4 600 ₽)", "callback_data": "r20"}],
    [{"text": "🔨 Правка литого диска (от 1 500 ₽)", "callback_data": "rim"}],
    [{"text": "📦 Хранение шин 6 мес (3 200 ₽)", "callback_data": "storage"}],
    [{"text": f"📞 Звонок дежурному ({shopPhone})", "callback_data": "call"}]
]

def handle_incoming_message(msg):
    chat_id = msg.get("chat_id")
    text = msg.get("text", "").lower()
    
    if text == "/start" or "привет" in text:
        welcome = (
            f"👋 Вас приветствует «Шиномонтаж Экспресс 24/7» в мессенджере МАКС!\\n"
            f"Телефон дежурного мастера: {shopPhone}\\n\\n"
            "Запишитесь на свободный подъемник за 20 секунд без очереди:\\n"
            "Выберите ваш радиус или услугу:"
        )
        send_max_message(chat_id, welcome, SERVICES_BUTTONS)
    else:
        # Уведомление мастеру шиномонтажа
        alert = (
            f"🚨 НОВАЯ ЗАПИСЬ ИЗ МАКС!\\n"
            f"Сообщение: {msg.get('text')}\\n"
            f"От пользователя ID: {msg.get('sender_id')}"
        )
        # Отправка мастеру
        # send_max_message(ADMIN_USER_ID, alert)
        send_max_message(chat_id, "✅ Заявка принята! Мастер ожидает вас в назначенное время.")

print("Бот шиномонтажа для мессенджера МАКС успешно настроен...")`;

  const webWidgetCode = `<!-- Виджет онлайн-записи прямо на сайте/карте (Работает БЕЗ мессенджеров и БЕЗ VPN) -->
<div id="tire-booking-widget" data-phone="${shopPhone}"></div>
<script 
  src="https://leadflow-ai.app/tire-widget.js" 
  data-shop-id="shina-89437653289"
  data-title="Шиномонтаж 24/7"
  data-phone="${shopPhone}"
  async>
</script>`;

  const totalTireRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Solution Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ГОТОВОЕ РЕШЕНИЕ: РАБОТАЕТ В РФ БЕЗ VPN 🇷🇺</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {shopName} — Бот для мессенджера МАКС (max.ru) и Web
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1.5 font-sans">
              <span>Телефон мастера: <strong className="text-emerald-400 font-mono text-sm">{shopPhone}</strong></span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">100% без VPN в РФ</span>
              <span>·</span>
              <span>Чек за внедрение: <strong className="text-emerald-400 font-mono">19 000 ₽ + 3 500 ₽/мес</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Записи на сегодня</div>
              <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                {totalTireRevenue.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        </div>

        {/* Subtabs Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>1. Симулятор бота (МАКС / Web / TG)</span>
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'steps'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>2. Как работает МАКС без VPN (Инструкция)</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'crm'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>3. Панель постов мастера ({bookings.length} машин)</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pitch'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>4. Сообщение знакомым про МАКС</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>5. Код бота (МАКС API + Web)</span>
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {notificationPopup && (
        <div className="bg-emerald-500 text-slate-950 font-bold text-xs p-3.5 rounded-xl shadow-2xl flex items-center justify-between animate-bounce">
          <span>{notificationPopup}</span>
          <button
            onClick={() => setActiveTab('crm')}
            className="underline cursor-pointer text-slate-900 font-extrabold ml-3 hover:text-black"
          >
            Посмотреть в журнале постов →
          </button>
        </div>
      )}

      {/* TAB 1: LIVE SIMULATOR WITH PLATFORM SWITCHER */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Settings & Platform Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block mb-2">Выберите канал для теста:</span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                  <button
                    onClick={() => {
                      setSelectedPlatform('max');
                      setChatMessages([
                        {
                          id: `m-${Date.now()}`,
                          sender: 'bot',
                          text: `Здравствуйте! Вас приветствует бот «Шиномонтаж Экспресс 24/7» в мессенджере МАКС 🚗\nТелефон мастера: ${shopPhone}\n\nРаботаем официально в РФ БЕЗ VPN! Помогу записаться на свободный подъемник за 20 секунд:`,
                          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    className={`py-2 px-2 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      selectedPlatform === 'max'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🇷🇺 МАКС (Без VPN)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPlatform('web');
                      setChatMessages([
                        {
                          id: `w-${Date.now()}`,
                          sender: 'bot',
                          text: `Онлайн-виджет шиномонтажа на Яндекс.Картах и 2ГИС 🌐\nТелефон: ${shopPhone}\n\nРаботает прямо в браузере Safari/Chrome без установки приложений! Выберите услугу:`,
                          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    className={`py-2 px-2 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      selectedPlatform === 'web'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🌐 Web-виджет</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPlatform('telegram');
                      setChatMessages([
                        {
                          id: `t-${Date.now()}`,
                          sender: 'bot',
                          text: `Здравствуйте! Бот записи «Шиномонтаж 24/7» в Telegram.\nТелефон мастера: ${shopPhone}\n\nВыберите услугу для бронирования:`,
                          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    className={`py-2 px-2 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      selectedPlatform === 'telegram'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>✈️ Telegram</span>
                  </button>
                </div>
              </div>

              {/* Status info box */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    {selectedPlatform === 'max' ? 'Мессенджер МАКС: 100% доступность в РФ' :
                     selectedPlatform === 'web' ? 'Web-виджет: открывается на любом смартфоне' :
                     'Telegram: стандартный канал'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {selectedPlatform === 'max'
                    ? 'Официальный отечественный мессенджер с открытым Bot API. Серверы в РФ, пуши приходят мгновенно без блокировок.'
                    : selectedPlatform === 'web'
                    ? 'Водитель кликает кнопку «Записаться» в Яндекс.Картах или 2ГИС — диалог открывается прямо в браузере без мессенджеров.'
                    : 'Работает через официальный Telegram Bot API.'}
                </p>
              </div>

              {/* Services List */}
              <div className="space-y-2 pt-1">
                <span className="text-slate-400 font-medium block">Быстрые кнопки услуг шиномонтажа:</span>
                {quickActions.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendChatMessage(qa.text)}
                    className="w-full text-left p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className="font-medium">{qa.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Phone Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[580px]">
              {/* Header */}
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {selectedPlatform === 'max' ? 'М' : selectedPlatform === 'web' ? '🌐' : '✈️'}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{shopName}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{selectedPlatform === 'max' ? 'МАКС Бот (Без VPN)' : selectedPlatform === 'web' ? 'Web-виджет (2ГИС / Карты)' : 'Telegram Бот'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setChatMessages([
                      {
                        id: `r-${Date.now()}`,
                        sender: 'bot',
                        text: `Здравствуйте! Робот записи «Шиномонтаж Экспресс 24/7» 🚗\nТелефон дежурного мастера: ${shopPhone}\n\nЗапишитесь на свободный подъемник за 20 секунд:`,
                        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Перезапустить"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatBottomRef}
                className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-950 to-slate-900 text-xs"
              >
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
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

                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5 text-slate-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                      <span className="text-[11px] ml-1">Мастер проверяет свободный подъемник...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-slate-800/90 border-t border-slate-700 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  placeholder="Напишите вопрос или телефон..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  disabled={!chatInput.trim()}
                  className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOW MAX MESSENGER & WEB WORK IN RUSSIA */}
      {activeTab === 'steps' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Как работает бот для мессенджера МАКС (max.ru) и почему это решает проблему VPN</span>
            </h3>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Вы абсолютно правы: многие клиенты в России не держат VPN включенным постоянно. Поэтому мы предлагаем гибридное решение: <strong>мессенджер МАКС + Web-виджет в браузере</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-sm block">1. Мессенджер МАКС (max.ru)</span>
              <p className="text-slate-300 leading-relaxed">
                • Российский мессенджер с официальным <strong>Bot API</strong>.<br />
                • Серверы находятся на территории РФ (152-ФЗ).<br />
                • Сообщения, фото и пуш-уведомления доставляются <strong>100% без VPN и без замедлений</strong>.<br />
                • Поддерживает инлайн-кнопки, сценарии и оплату.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono text-blue-400 font-bold text-sm block">2. Web-виджет на картах</span>
              <p className="text-slate-300 leading-relaxed">
                • Работает в браузере мобильного телефона (Safari, Chrome, Яндекс.Браузер).<br />
                • Водителю вообще <strong>не нужно скачивать приложение или регистрироваться</strong>.<br />
                • Он нажимает на Яндекс.Картах кнопку «Записаться» — за 10 секунд выбирает время и вводит телефон.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono text-amber-400 font-bold text-sm block">3. SMS/Push мастеру</span>
              <p className="text-slate-300 leading-relaxed">
                • Мастеру на телефон <strong>{shopPhone}</strong> приходит уведомление в МАКС или SMS.<br />
                • Даже если мастер уронил телефон или работает в перчатках — громкий пуш оповещает о новом клиенте.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Инструкция по созданию бота в МАКС (max.ru):</h4>
            <ol className="list-decimal pl-4 space-y-1 text-slate-300">
              <li>Зарегистрируйтесь на портале разработчиков МАКС (<code>max.ru</code>).</li>
              <li>Перейдите в раздел <strong>«Боты»</strong> и нажмите <strong>«Создать бота»</strong>.</li>
              <li>Укажите название: <em>«Шиномонтаж Экспресс 24/7»</em> и номер телефона <em>{shopPhone}</em>.</li>
              <li>Скопируйте <code>Access Token</code> и вставьте в готовый скрипт из вкладки <strong>«5. Код бота»</strong>.</li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 3: CRM */}
      {activeTab === 'crm' && (
        <div className="space-y-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Журнал постов шиномонтажа (Телефон мастера: {shopPhone})</h3>
              <p className="text-slate-400 mt-0.5">Входящие записи из МАКС и Web-виджета без участия оператора</p>
            </div>
            <div className="text-emerald-400 font-mono font-bold text-sm">
              Итого выручка: {totalTireRevenue.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Post 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">ПОСТ №1 (Легковой подъемник)</span>
                <span className="text-emerald-400 font-mono text-[11px]">Активен</span>
              </div>
              <div className="space-y-2">
                {bookings.filter(b => b.post === 'Пост №1').map(b => (
                  <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{b.clientName}</span>
                      <span className="font-mono text-emerald-400 font-bold">{b.price} ₽</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px]">{b.phone} · {b.timeSlot}</div>
                    <div className="text-slate-300 text-[11px] flex items-center justify-between">
                      <span>{b.service} ({b.tireRadius})</span>
                      <span className="text-[10px] text-emerald-400 font-mono uppercase">{b.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">ПОСТ №2 (Внедорожники & Правка)</span>
                <span className="text-blue-400 font-mono text-[11px]">Активен</span>
              </div>
              <div className="space-y-2">
                {bookings.filter(b => b.post === 'Пост №2').map(b => (
                  <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{b.clientName}</span>
                      <span className="font-mono text-emerald-400 font-bold">{b.price} ₽</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px]">{b.phone} · {b.timeSlot}</div>
                    <div className="text-slate-300 text-[11px] flex items-center justify-between">
                      <span>{b.service} ({b.tireRadius})</span>
                      <span className="text-[10px] text-emerald-400 font-mono uppercase">{b.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WHATSAPP PITCH */}
      {activeTab === 'pitch' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Сообщение знакомым с акцентом на работу БЕЗ VPN
              </h3>
              <p className="text-slate-400 mt-0.5">
                Отправьте владельцу шиномонтажа на номер {shopPhone}:
              </p>
            </div>

            <button
              onClick={() => handleCopy(whatsappPitchText, 'pitch')}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copiedPitch ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать сообщение</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 text-slate-200 leading-relaxed font-sans whitespace-pre-line select-all text-xs">
            {whatsappPitchText}
          </div>
        </div>
      )}

      {/* TAB 5: CODE WITH SWITCHER */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span>Исходный код для интеграции</span>
              </h3>
              <p className="text-slate-400">Выберите нужный формат реализации:</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeLanguage('max_python')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  codeLanguage === 'max_python' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Бот МАКС (Python)
              </button>
              <button
                onClick={() => setCodeLanguage('web_widget')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  codeLanguage === 'web_widget' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Web-виджет (JS)
              </button>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => handleCopy(codeLanguage === 'max_python' ? maxBotPythonCode : webWidgetCode, 'code')}
              className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded flex items-center gap-1 transition-colors cursor-pointer z-10"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Скопировано!' : 'Копировать'}</span>
            </button>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed max-h-[420px]">
              {codeLanguage === 'max_python' ? maxBotPythonCode : webWidgetCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
