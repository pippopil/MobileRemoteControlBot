import { ClientBot } from '../types';

export const INITIAL_CLIENTS: ClientBot[] = [
  {
    id: 'bot-shina-24',
    orgName: 'Шиномонтаж 24/7',
    niche: 'Автосервис и шиномонтаж',
    phone: '89437653289',
    contactPerson: 'Алексей (Управляющий)',
    channels: ['telegram', 'max', 'whatsapp'],
    status: 'active',
    plan: 'pro',
    monthlyFee: 4900,
    setupFeePaid: 19900,
    dialogsTotal: 642,
    dialogsToday: 38,
    leadsCaptured: 89,
    conversionRate: 24.8,
    avgResponseTimeSec: 0.8,
    hoursSavedEst: 53.5,
    systemPrompt: `Ты — цифровой мастер-приемщик круглосуточного шиномонтажа «Шиномонтаж 24/7» (тел: 89437653289).
Твоя цель:
1. Записать водителя на удобный свободный бокс (уточнить радиус дисков R13-R22, услугу, госномер или марку авто).
2. Рассчитать стоимость по прайс-листу.
3. Ответить на частые вопросы (живая очередь или по записи, сезонное хранение шин).
4. Перевести на звонок по номеру 89437653289 при сложных нестандартных вопросах (варка аргоном, боковые порезы).
Тон: вежливый, по делу, оперативный.`,
    greetingMessage: 'Здравствуйте! Вас приветствует круглосуточный бот «Шиномонтаж 24/7» 🚗🛞. На какую дату и радиус колес вас записать?',
    botUsername: '@Shina24Express_bot',
    tokenConfigured: true,
    webhookUrl: 'https://api.telegram.org/bot712.../setWebhook',
    services: [
      { id: 's1', name: 'Комплексный шиномонтаж 4 колес (R15-R16)', price: 2200, duration: '25 мин' },
      { id: 's2', name: 'Комплексный шиномонтаж 4 колес (R17-R18)', price: 2800, duration: '30 мин' },
      { id: 's3', name: 'Балансировка 4 колес', price: 600, duration: '15 мин' },
      { id: 's4', name: 'Ремонт прокола жгутом / кордовая латка', price: 450, duration: '10 мин' },
      { id: 's5', name: 'Сезонное хранение комплекта шин (6 месяцев)', price: 2500, duration: 'Сезон' },
      { id: 's6', name: 'Правка литого диска', price: 1500, duration: '30 мин' }
    ],
    faq: [
      { q: 'Работаете ли ночью?', a: 'Да, наш сервис работает 24/7 без перерывов и выходных!' },
      { q: 'Нужна ли предоплата?', a: 'Нет, оплата происходит на месте после выполнения работ (наличные, карта, перевод).' },
      { q: 'Где вы находитесь?', a: 'Центральный бокс у выезда на шоссе. Телефон дежурного мастера: 89437653289.' }
    ],
    nextBillingDate: '2026-10-24',
    createdAt: '2026-08-15',
    lastActive: '3 минуты назад'
  },
  {
    id: 'bot-barber-fade',
    orgName: 'Барбершоп «TopFade»',
    niche: 'Салон красоты и барбершоп',
    phone: '+7 999 444-12-88',
    contactPerson: 'Артур (Владелец)',
    channels: ['telegram', 'vk'],
    status: 'active',
    plan: 'starter',
    monthlyFee: 3500,
    setupFeePaid: 14900,
    dialogsTotal: 380,
    dialogsToday: 19,
    leadsCaptured: 64,
    conversionRate: 28.5,
    avgResponseTimeSec: 0.6,
    hoursSavedEst: 32.0,
    systemPrompt: `Ты — администратор стильного мужского барбершопа «TopFade». Записываешь гостей к барберам, рассказываешь о стрижках, моделировании бороды и уходовой косметике.`,
    greetingMessage: 'Салют! Это бот барбершопа TopFade 💈. Выберите мастера или услугу, и я подберу свободный слот на сегодня или выходные.',
    botUsername: '@TopFade_barber_bot',
    tokenConfigured: true,
    webhookUrl: 'https://api.telegram.org/bot689.../setWebhook',
    services: [
      { id: 'b1', name: 'Мужская стрижка + мытье головы', price: 1800, duration: '45 мин' },
      { id: 'b2', name: 'Моделирование бороды и усов', price: 900, duration: '30 мин' },
      { id: 'b3', name: 'Комплекс «Стрижка + Борода»', price: 2400, duration: '60 мин' },
      { id: 'b4', name: 'Камуфляж седины', price: 1100, duration: '20 мин' }
    ],
    faq: [
      { q: 'Есть ли парковка?', a: 'Да, во дворе бесплатная парковка для наших клиентов со шлагбаумом.' },
      { q: 'Угощаете напитками?', a: 'Конечно! Кофе, прохладительные напитки и PS5 в зоне ожидания.' }
    ],
    nextBillingDate: '2026-10-18',
    createdAt: '2026-09-01',
    lastActive: '12 минут назад'
  },
  {
    id: 'bot-dental-lux',
    orgName: 'Стоматология «ДентаЛюкс»',
    niche: 'Медицинская клиника',
    phone: '+7 495 721-00-11',
    contactPerson: 'Елена Викторовна (Главврач)',
    channels: ['whatsapp', 'telegram', 'web'],
    status: 'active',
    plan: 'enterprise',
    monthlyFee: 7900,
    setupFeePaid: 29900,
    dialogsTotal: 914,
    dialogsToday: 47,
    leadsCaptured: 142,
    conversionRate: 19.2,
    avgResponseTimeSec: 0.9,
    hoursSavedEst: 78.0,
    systemPrompt: `Ты — медицинский координатор клиники «ДентаЛюкс». Записываешь на первичный осмотр, консультацию терапевта, хирурга, ортодонта, предупреждаешь о правилах приема.`,
    greetingMessage: 'Здравствуйте! Вас приветствует стоматологическая клиника «ДентаЛюкс» 🦷. Какой вопрос вас беспокоит?',
    botUsername: '@DentaLux_Clinic_bot',
    tokenConfigured: true,
    services: [
      { id: 'd1', name: 'Первичный осмотр + панорамный снимок 3D', price: 1500, duration: '30 мин' },
      { id: 'd2', name: 'Профессиональная гигиена полости рта (AirFlow)', price: 4500, duration: '45 мин' },
      { id: 'd3', name: 'Лечение кариеса под ключ', price: 3800, duration: '60 мин' },
      { id: 'd4', name: 'Консультация имплантолога', price: 0, duration: '30 мин' }
    ],
    faq: [
      { q: 'Больно ли лечить?', a: 'Мы применяем современную компьютерную анестезию последнего поколения — вы не почувствуете даже укола.' },
      { q: 'Работаете по ДМС?', a: 'Да, сотрудничаем с ведущими страховыми компаниями СОГАЗ, Альфа, РЕСО.' }
    ],
    nextBillingDate: '2026-11-02',
    createdAt: '2026-07-20',
    lastActive: '1 минуту назад'
  },
  {
    id: 'bot-pizza-express',
    orgName: 'Пицца & Паста «Густо»',
    niche: 'Ресторан и доставка еды',
    phone: '+7 916 555-89-21',
    contactPerson: 'Дмитрий (Управляющий)',
    channels: ['telegram', 'max', 'vk'],
    status: 'active',
    plan: 'pro',
    monthlyFee: 4900,
    setupFeePaid: 21900,
    dialogsTotal: 1240,
    dialogsToday: 82,
    leadsCaptured: 210,
    conversionRate: 31.4,
    avgResponseTimeSec: 0.7,
    hoursSavedEst: 104.0,
    systemPrompt: `Ты — бот приема заказов и бронирования столов пиццерии «Густо». Показываешь меню, комбо-наборы, принимаешь адрес доставки и промокоды.`,
    greetingMessage: 'Bon appetit! 🍕 Это бот доставки горячей пиццы «Густо». Оформим доставку или забронируем столик?',
    botUsername: '@Gusto_Pizza_bot',
    tokenConfigured: true,
    services: [
      { id: 'p1', name: 'Пицца «Пепперони гранде» 35 см', price: 790, duration: '30 мин' },
      { id: 'p2', name: 'Пицца «Четыре сыра» с трюфельным соусом', price: 890, duration: '30 мин' },
      { id: 'p3', name: 'Паста Карбонара со свежим пармезаном', price: 620, duration: '20 мин' },
      { id: 'p4', name: 'Комбо «Друзья» (3 пиццы + напиток)', price: 1990, duration: '35 мин' }
    ],
    faq: [
      { q: 'Какая минимальная сумма доставки?', a: 'Бесплатная доставка от 1200 ₽ по всему городу за 40 минут.' },
      { q: 'Есть ли скидка в день рождения?', a: 'Да, 15% на всё меню по промокоду BDAY!' }
    ],
    nextBillingDate: '2026-10-29',
    createdAt: '2026-06-10',
    lastActive: '8 минут назад'
  },
  {
    id: 'bot-law-jurist',
    orgName: 'Юридическое бюро «Правовед»',
    niche: 'Юридические услуги и банкротство',
    phone: '+7 800 200-45-77',
    contactPerson: 'Михаил Сергеевич',
    channels: ['telegram', 'web'],
    status: 'warning',
    plan: 'starter',
    monthlyFee: 3900,
    setupFeePaid: 17500,
    dialogsTotal: 295,
    dialogsToday: 12,
    leadsCaptured: 48,
    conversionRate: 16.5,
    avgResponseTimeSec: 1.1,
    hoursSavedEst: 26.0,
    systemPrompt: `Ты — юридический ассистент бюро «Правовед». Твоя задача — квалифицировать запрос гражданина (банкротство физлиц, споры по недвижимости, арбитраж), уточнить сумму долга и записать на бесплатную консультацию к адвокату.`,
    greetingMessage: 'Добрый день! Вас приветствует правовой ассистент бюро «Правовед» ⚖️. Опишите кратко вашу ситуацию, и я назначу консультацию с профильным юристом.',
    botUsername: '@Pravoved_Legal_bot',
    tokenConfigured: true,
    services: [
      { id: 'l1', name: 'Бесплатная первичная консультация юриста', price: 0, duration: '20 мин' },
      { id: 'l2', name: 'Банкротство физлиц под ключ (рассрочка)', price: 8500, duration: 'Месяц' },
      { id: 'l3', name: 'Анализ договора и правовой аудит', price: 3000, duration: '24 часа' }
    ],
    faq: [
      { q: 'Консультация точно бесплатная?', a: 'Да, первичный разбор ситуации и оценка перспектив дела не стоят ничего.' }
    ],
    nextBillingDate: '2026-10-10', // expiring tomorrow!
    createdAt: '2026-07-01',
    lastActive: '25 минут назад'
  }
];

export const NICHE_PRESETS = [
  {
    id: 'auto',
    name: 'Автосервис / Шиномонтаж',
    icon: 'Wrench',
    typicalPrice: 4900,
    description: 'Запись на подъемник/шиномонтаж, калькулятор колес, напоминание о визите'
  },
  {
    id: 'beauty',
    name: 'Салон красоты / Барбершоп',
    icon: 'Scissors',
    typicalPrice: 3500,
    description: 'Выбор мастера, расписание слотов, отзывы, фото работ'
  },
  {
    id: 'med',
    name: 'Стоматология / Медклиника',
    icon: 'Stethoscope',
    typicalPrice: 7900,
    description: 'Первичный сбор симптомов, запись к врачу, подтверждение визита'
  },
  {
    id: 'food',
    name: 'Ресторан / Доставка еды',
    icon: 'Utensils',
    typicalPrice: 4900,
    description: 'Интерактивное меню, корзина, адрес доставки, бронь столов'
  },
  {
    id: 'legal',
    name: 'Юристы / Недвижимость',
    icon: 'Scale',
    typicalPrice: 4500,
    description: 'Квалификация лидов, скоринг платежеспособности, запись на встречу'
  },
  {
    id: 'edu',
    name: 'Онлайн-школа / Репетиторы',
    icon: 'GraduationCap',
    typicalPrice: 3900,
    description: 'Выдача пробных уроков, ответы на вопросы по курсу, прием оплат'
  }
];
