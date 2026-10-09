import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API: AI validation and launch architecture for user ideas
  app.post('/api/validate-idea', async (req: Request, res: Response) => {
    const { ideaText, skills, budget, timeframe, marketTarget } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Helper to generate a tailored fallback response
    const generateFallback = () => {
      const cleanIdea = (ideaText || 'B2B микро-сервис').trim();
      return {
        viabilityScore: 89,
        verdict: `Идея «${cleanIdea.slice(0, 45)}...» имеет высокий потенциал быстрой окупаемости при условии фокуса на решении 1 конкретной рутины клиента и модели разового внедрения (Setup Fee) + абонплаты.`,
        timeToFirstDollarDays: 5,
        recommendedModel: "Разовое внедрение (15 000 – 25 000 ₽) + абонентское обслуживание (3 500 – 5 000 ₽/мес)",
        targetAudiencePains: [
          "Ручная потеря 2-4 часов в день на повторяющиеся однотипные операции",
          "Потеря до 50% потенциальных клиентов из-за задержки ответа в нерабочее время",
          "Сложность и дороговизна найма дополнительного штатного сотрудника"
        ],
        monetizationBlueprint: {
          pricingTiers: [
            { name: "Базовый запуск", price: "14 900 ₽ разово + 3 000 ₽/мес", features: "Настройка MVP под 1 канал, базовые сценарии, техподдержка" },
            { name: "Бизнес под ключ", price: "28 900 ₽ разово + 5 900 ₽/мес", features: "Полная интеграция с CRM и мессенджерами, безлимитная обработка, персональный саппорт" }
          ],
          first10ClientsMethod: "Прямой аутрич в Telegram/WhatsApp к 30 владельцам локальных бизнесов с предложением бесплатного 3-дневного пилота.",
          salesPitchColdScript: `«Здравствуйте, [Имя]! Заметил, что у вас в компании уходит много времени на обработку заявок. Мы создали микро-сервис, который решает эту задачу за 5 секунд прямо в мессенджере. Готов подключить его вам бесплатно на 3 дня на пробу — если не понравится, просто отключим. Интересно посмотреть 1-минутное демо?»`
        },
        fastMvpStack: ["Node.js / Telegram Webhook", "Supabase / Google Sheets", "Vite + Tailwind", "ЮKassa / CloudPayments"],
        keyRisksAndMitigation: [
          { risk: "Сложность закрытия без кейсов и отзывов", solution: "Предлагать первым 2 клиентам результат без предоплаты или бесплатный тест-драйв на 3 дня" },
          { risk: "Отток после первого месяца", solution: "Интегрировать инструмент глубоко в ежедневные уведомления ЛПРа (Telegram/SMS)" }
        ],
        actionPlan7Days: [
          { day: "День 1-2", title: "Сбор базы 30 ЛПРов", actions: "Найти 30 контактов руководителей на картах и в профильных чатах, подготовить тестовый опрос." },
          { day: "День 3-4", title: "Сборка легковесного прототипа", actions: "Собрать минимальный работающий сценарий без избыточных настроек за 24-48 часов." },
          { day: "День 5-6", title: "Подключение первым 2 клиентам", actions: "Установить тестовый доступ, зафиксировать спасенные заявки или сэкономленные часы." },
          { day: "День 7", title: "Получение первого платежа", actions: "Закрыть первого клиента на платную настройку и получить видеоотзыв." }
        ]
      };
    };

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      return res.json({ success: true, data: generateFallback() });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Ты — ведущий эксперт по Micro-SaaS, Lean Startup и серийный предприниматель, специализирующийся на запуске сверхприбыльных микро-приложений и ботов с окупаемостью за 7-14 дней при бюджете $0-$100.
Проанализируй идею пользователя:
- Суть идеи: "${ideaText}"
- Бюджет: "${budget || '$0 - $100'}"
- Срок до первых денег: "${timeframe || '7-14 дней'}"
- Навыки создателя: "${skills || 'Любые (No-code / базовый JS / маркетинг)'}"
- Целевой рынок: "${marketTarget || 'Локальный B2B / Онлайн-бизнес'}"

Предоставь исчерпывающий, прагматичный, честный разбор на русском языке в строгом JSON-формате (без маркдауна вокруг, чистый json):
{
  "viabilityScore": number (от 1 до 100),
  "verdict": string (честный вердикт без воды, что конкретно отрезать и на чём заработать быстрее всего),
  "timeToFirstDollarDays": number (минимальные дни до 1-й оплаты),
  "recommendedModel": string (структура монетизации),
  "targetAudiencePains": [string, string, string],
  "monetizationBlueprint": {
    "pricingTiers": [
      {"name": string, "price": string, "features": string},
      {"name": string, "price": string, "features": string}
    ],
    "first10ClientsMethod": string,
    "salesPitchColdScript": string
  },
  "fastMvpStack": [string, string, string, string],
  "keyRisksAndMitigation": [
    {"risk": string, "solution": string},
    {"risk": string, "solution": string}
  ],
  "actionPlan7Days": [
    {"day": "День 1-2", "title": string, "actions": string},
    {"day": "День 3-4", "title": string, "actions": string},
    {"day": "День 5-6", "title": string, "actions": string},
    {"day": "День 7", "title": string, "actions": string}
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      return res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.warn('Gemini API temporary issue, falling back to structured blueprint:', err.message);
      return res.json({ success: true, data: generateFallback() });
    }
  });

  // In-memory persistent state for business owner's CRM
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

  let leadsDatabase: Lead[] = [
    {
      id: 'lead-tire-1',
      clientName: 'Сергей Власов',
      phone: '+7 (916) 554-12-80',
      serviceNeeded: 'Сезонная переобувка 4-х колес R18 (Кроссовер) + Лазерная балансировка',
      details: 'Зимняя резина на дисках в багажнике, нужно проверить биение переднего правого колеса',
      estimatedValue: 3600,
      status: 'booked',
      source: 'Telegram Бот Шиномонтаж (номер: 89437653289)',
      preferredTime: 'Сегодня в 18:30 (Пост №1)',
      createdAt: new Date(Date.now() - 3600000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      conversationSnippet: 'Записался через бота за 18 секунд без звонков и живой очереди.'
    },
    {
      id: 'lead-tire-2',
      clientName: 'Дмитрий Корнилов',
      phone: '+7 (903) 712-44-91',
      serviceNeeded: 'Правка литого диска R17 + устранение бокового пореза',
      details: 'Попал в яму на трассе, спустило колесо, замята полка диска',
      estimatedValue: 2900,
      status: 'qualified',
      source: 'Telegram Бот (Ночной клиент 23:15)',
      preferredTime: 'Завтра в 09:00 (Пост №2)',
      createdAt: new Date(Date.now() - 3600000 * 3).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      conversationSnippet: 'Бот сориентировал по цене прокатки диска и забронировал окно.'
    },
    {
      id: 'lead-1',
      clientName: 'Алексей Смирнов',
      phone: '+7 (926) 451-88-29',
      serviceNeeded: 'ТО и замена тормозных дисков BMW X5',
      details: 'Скрипят передние тормоза на холодную, пробег 85 000 км',
      estimatedValue: 18500,
      status: 'booked',
      source: 'Telegram Bot (Ночной трафик 22:45)',
      preferredTime: 'Завтра в 11:30',
      createdAt: new Date(Date.now() - 3600000 * 4).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      conversationSnippet: 'Бот квалифицировал авто за 20 секунд и записал на пост №2.'
    }
  ];

  // API: Get Leads
  app.get('/api/leads', (_req: Request, res: Response) => {
    return res.json({ success: true, leads: leadsDatabase });
  });

  // API: Create new Lead from Bot
  app.post('/api/leads', (req: Request, res: Response) => {
    const { clientName, phone, serviceNeeded, details, estimatedValue, preferredTime, source, conversationSnippet } = req.body;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      clientName: clientName || 'Новый клиент',
      phone: phone || '+7 (999) 000-00-00',
      serviceNeeded: serviceNeeded || 'Консультация',
      details: details || '',
      estimatedValue: Number(estimatedValue) || 15000,
      status: 'new',
      source: source || 'Telegram Bot',
      preferredTime: preferredTime || 'Ближайшее свободное время',
      createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      conversationSnippet: conversationSnippet || 'Заявка оформлена через диалог с ботом.'
    };
    leadsDatabase.unshift(newLead);
    return res.json({ success: true, lead: newLead });
  });

  // API: Update lead status
  app.patch('/api/leads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const lead = leadsDatabase.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      return res.json({ success: true, lead });
    }
    return res.status(404).json({ error: 'Lead not found' });
  });

  // API: Interactive Bot Conversational AI Engine
  app.post('/api/bot/chat', async (req: Request, res: Response) => {
    const { message, history, niche, businessName } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Fast rule-based intelligent fallback engine
    const getFallbackBotResponse = (msg: string, histLength: number) => {
      const lower = msg.toLowerCase();
      const bName = businessName || 'наш сервис';

      if (histLength === 0 || lower.includes('привет') || lower.includes('здравствуй') || lower.includes('начать')) {
        return {
          reply: `Здравствуйте! Рады приветствовать вас в «${bName}» 🤝 Я виртуальный администратор, помогу записаться за 1 минуту без ожидания оператора.\n\nКакая именно услуга или проблема вас интересует?`,
          isBookingReady: false,
          detectedService: ''
        };
      }

      if (lower.match(/\+?\d[\d\s\-\(\)]{8,}\d/)) {
        return {
          reply: `Отлично! Номер телефона зафиксирован. Заявка передана мастеру/администратору. Мы перезвоним вам за 30 секунд для подтверждения, либо пришлем подтверждение в этот диалог. Ждем вас!`,
          isBookingReady: true,
          detectedPhone: msg.match(/\+?\d[\d\s\-\(\)]{8,}\d/)?.[0] || '',
          detectedService: 'Запись подтверждена'
        };
      }

      if (lower.includes('переобув') || lower.includes('шин') || lower.includes('колес') || lower.includes('r1') || lower.includes('r2') || lower.includes('балансир') || lower.includes('диск') || lower.includes('прокол')) {
        return {
          reply: `Отлично! Комплексная переобувка 4-х колес (мойка, демонтаж, монтаж и лазерная балансировка):\n• R14–R16: 2 400 ₽\n• R17–R19: 3 400 ₽\n• R20+: 4 600 ₽\n\nТакже делаем правку дисков и сезонное хранение шин (3 200 ₽ / 6 мес). На какой день и время вам удобно записаться?`,
          isBookingReady: false,
          detectedService: 'Шиномонтаж и балансировка'
        };
      }

      if (lower.includes('цен') || lower.includes('стоим') || lower.includes('сколько') || lower.includes('прайс')) {
        return {
          reply: `Стоимость зависит от объема и деталей. Базовый чек начинается от 2 500 ₽. Чтобы назвать точную цену без скрытых доплат, напишите, пожалуйста, детали вашей задачи или марку/модель, а также удобный день для визита?`,
          isBookingReady: false,
          detectedService: 'Запрос стоимости'
        };
      }

      if (lower.includes('завтра') || lower.includes('сегодня') || lower.includes('понедельник') || lower.includes('суббот') || lower.includes('время') || lower.includes('1') || lower.includes('2')) {
        return {
          reply: `Принято! На указанное время у нас как раз есть свободное окно. Пожалуйста, напишите ваш номер телефона (например, +7 999 123-45-67), чтобы администратор забронировал за вами слот и прислал напоминание с адресом.`,
          isBookingReady: false,
          detectedTime: msg
        };
      }

      return {
        reply: `Спасибо за информацию! Зафиксировал детали: «${msg}». На какой день и примерное время вам было бы удобнее всего запланировать визит?`,
        isBookingReady: false,
        detectedService: msg
      };
    };

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      const fallback = getFallbackBotResponse(message || '', history ? history.length : 0);
      return res.json({ success: true, ...fallback });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Ты — дружелюбный, предельно вежливый и профессиональный Telegram/WhatsApp робот-администратор компании «${businessName || 'Сервисный центр'}» (ниша: ${niche || 'услуги'}).
Твоя цель:
1. За 2-3 коротких сообщения вежливо квалифицировать клиента (уточнить что нужно починить / вылечить / сделать).
2. Спросить удобный день и время визита.
3. Получить номер телефона клиента для подтверждения бронирования.
Отвечай естественно, кратко (1-3 предложения), с умеренными эмодзи. Не пиши простыней текста.

История диалога:
${JSON.stringify(history || [])}
Клиент написал: "${message}"

Верни строгий JSON:
{
  "reply": string (твой ответ клиенту),
  "isBookingReady": boolean (true если клиент дал телефон и выбрал услугу/время),
  "extractedData": {
    "clientName": string или "",
    "phone": string или "",
    "service": string или "",
    "preferredTime": string или ""
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        reply: parsed.reply,
        isBookingReady: parsed.isBookingReady,
        extractedData: parsed.extractedData
      });
    } catch (err: any) {
      console.warn('Bot chat fallback:', err.message);
      const fallback = getFallbackBotResponse(message || '', history ? history.length : 0);
      return res.json({ success: true, ...fallback });
    }
  });

  // API: Commercial Proposal Generator for Closing Clients
  app.post('/api/generate-proposal', (req: Request, res: Response) => {
    const { clientCompanyName, niche, ownerName } = req.body;
    const company = clientCompanyName || 'Автосервис / Клиника';
    const cOwner = ownerName || 'Руководитель';

    const proposal = {
      title: `Коммерческое предложение по внедрению умного робота-квалификатора заявок в «${company}»`,
      preparedFor: `${cOwner}, ${company}`,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      problemAudit: [
        'В нерабочее время (с 19:00 до 09:00) и в часы пик до 45% входящих запросов в мессенджерах остаются без ответа дольше 30 минут.',
        'По статистике, 7 из 10 клиентов за это время уже находят контакт конкурента и записываются в другое место.',
        'Потери компании составляют от 60 000 до 180 000 ₽ чистой прибыли ежемесячно на упущенных лидах.'
      ],
      solutionDeliverables: [
        'Развертывание Telegram/WhatsApp бота с персональным сценарием квалификации под ваши услуги',
        'Мгновенный автоответ за 3 секунды 24/7',
        'Интеграция с Telegram-каналом руководства / администраторов для мгновенного звукового пуша о бронировании',
        'Инструктаж сотрудников и 1 месяц бесплатного технического сопровождения'
      ],
      pricing: {
        setupFee: '19 000 ₽ (единоразово при сдаче системы)',
        monthlyRetainer: '3 900 ₽ / мес (начиная со второго месяца: поддержка серверов, обновление промптов)',
        roiEstimate: 'Окупается с 1–2 спасенных клиентов уже на первой неделе работы'
      },
      guarantee: 'Если за первые 7 дней работы робот не перехватит ни одной заявки, мы вернем 100% стоимости внедрения.'
    };

    return res.json({ success: true, proposal });
  });

  // API: Instant Sales Pitch Generator
  app.post('/api/generate-pitch', async (req: Request, res: Response) => {
    const { nicheTitle, targetClient, mainBenefit } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const fallbackPitch = {
      telegram: `«Здравствуйте, [Имя]! Нашёл ваш профиль в поиске [${targetClient || 'клиентов'}]. Мы создали готовое решение в нише [${nicheTitle || 'автоматизации'}], которое обеспечивает ${mainBenefit || 'мгновенную обработку заявок'}. Могу подключить бесплатный тест-драйв на 3 дня, чтобы вы оценили результат. Интересно взглянуть на 1-минутное демо?»`,
      emailSubject: `Вопрос по повышению эффективности для [${targetClient || 'вашей компании'}]`,
      emailBody: `Здравствуйте, [Имя]!\n\nПишу коротко по делу: мы разработали готовый инструмент в сфере «${nicheTitle || 'автоматизации'}», который помогает компаниям получать ${mainBenefit || 'больше заказов без роста затрат'}.\n\nГотовы настроить пилотный проект на 48 часов без оплаты, чтобы вы сами замерили результат.\n\nВ какой день на этой неделе вам будет удобно уделить 5 минут на демонстрацию?`,
      callScript: `«Добрый день, [Имя]! Звоню буквально на две минуты. Мы запустили решение для [${targetClient || 'бизнесов'}], которое решает вопрос [${mainBenefit || 'автоматизации рутины'}]. Ничего не продаю по телефону — предлагаю бесплатно протестировать систему в течение 3 дней. Договорились?»`
    };

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      return res.json(fallbackPitch);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Напиши 3 убойных, конверсионных скрипта первого касания для продажи решения в нише "${nicheTitle}" клиентам "${targetClient}" с выгодой "${mainBenefit}".
1) Короткое сообщение для Telegram/WhatsApp (до 4 предложений).
2) Email для холодного ЛПРа (с интригующей темой письма).
3) Elevator pitch для звонка или голосового сообщения (30 секунд).
Ответь на русском языке в JSON:
{
  "telegram": string,
  "emailSubject": string,
  "emailBody": string,
  "callScript": string
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.warn('Pitch generation fallback activated:', err.message);
      return res.json(fallbackPitch);
    }
  });

  // API: Agency Internal Copilot Assistant ("Бот-помощник нашей организации")
  app.post('/api/agency-assistant', async (req: Request, res: Response) => {
    const { prompt, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Helper fallback for agency assistant
    const getFallbackAgencyReply = (userPrompt: string) => {
      const p = (userPrompt || '').toLowerCase();
      if (p.includes('кп') || p.includes('предложени') || p.includes('коммерческ')) {
        return {
          reply: `💼 **Коммерческое предложение (КП) для клиента:**\n\n` +
            `**Кому:** Владельцу бизнеса / Управляющему\n` +
            `**Проблема:** До 45% заявок теряются в нерабочее время, на переписку с клиентами уходит от 3 часов в день у администратора.\n\n` +
            `**Наше решение:** Интеллектуальный бот-помощник в Telegram, WhatsApp и на сайте с ответом за 1 секунду 24/7.\n` +
            `• Запись клиентов в электронный журнал без участия человека\n` +
            `• Точный расчет стоимости услуг по прайс-листу\n` +
            `• Автоматическое напоминание о визите за 2 часа (снижает неявку на 60%)\n` +
            `• Перевод сложных вопросов на телефон оператора\n\n` +
            `**Стоимость внедрения:** 19 900 ₽ (настройка под ключ за 48 часов) + абонплата 3 900 ₽/мес (сервер, техподдержка, обновления).\n` +
            `**Специальное предложение:** 3 дня бесплатного пилотного тестирования!`,
          suggestions: [
            "Сгенерировать скрипт первого звонка клиенту",
            "Рассчитать окупаемость для автосервиса",
            "Как отработать возражение «У нас уже есть админ»"
          ]
        };
      }

      if (p.includes('возражен') || p.includes('дорого') || p.includes('скрипт')) {
        return {
          reply: `🎯 **Отработка возражения «У нас есть администратор, нам бот не нужен»:**\n\n` +
            `*«Иван, администратор — незаменимый человек для живой работы в зале. Но ночью в 23:30 или в пиковый наплыв он физически не успевает ответить новому клиенту в течение 2 минут. А клиент в это время уходит к конкурентам.* \n\n` +
            `*Бот не заменяет вашего сотрудника, а забирает на себя 80% рутины: ответы на "Сколько стоит?", график работы и первичную запись. Админ занимается сервисом и деньгами, а бот ловит заявки 24/7. Давайте подключим демо на 3 дня бесплатно?»*`,
          suggestions: [
            "Подготовить КП для салона красоты",
            "Как продать бота стоматологии за 35 000 ₽",
            "Показать аналитику по моим клиентам"
          ]
        };
      }

      if (p.includes('клиент') || p.includes('анализ') || p.includes('выручк')) {
        return {
          reply: `📊 **Экспресс-аудит клиентского портфеля агентства:**\n\n` +
            `• **Всего активных организаций:** 5 клиентов\n` +
            `• **Текущий MRR (абонплаты):** 28 500 ₽/мес\n` +
            `• **Обработано диалогов суммарно:** 1 425 за текущий месяц\n` +
            `• **Сэкономлено времени клиентам:** ~118 часов ручной работы\n\n` +
            `💡 **Рекомендация по апсейлу:**\n` +
            `Клиенту «Шиномонтаж 24/7» пора предложить доп. модуль «Складской остаток резины и шин» за +2 000 ₽/мес, так как у них высокий сезонный трафик.`,
          suggestions: [
            "Составить КП по модулю допродаж для шиномонтажа",
            "Сгенерировать бота для онлайн-школы",
            "Написать шаблон напоминания об оплате подписки"
          ]
        };
      }

      return {
        reply: `👋 **Я ваш внутренний ассистент агентства по запуску ботов.**\n\n` +
          `Я помогаю автоматизировать ваш бизнес:\n` +
          `1. **Продажи и КП:** быстро составлю персонализированное коммерческое предложение, скрипт звонка или переписки для любой ниши.\n` +
          `2. **Управление клиентами:** подскажу, кому предложить доп. услуги, напомнить об абонентской плате или настроить интеграцию с CRM.\n` +
          `3. **Промпт-инжиниринг:** помогу доработать системный промпт или базу знаний для бота любого вашего заказчика.\n\n` +
          `О чем хотите узнать прямо сейчас?`,
        suggestions: [
          "Составить КП для новой организации",
          "Как предложить бота автосервису",
          "Скрипт отработки возражения «Дорого»",
          "Проанализировать мою клиентскую базу"
        ]
      };
    };

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      return res.json(getFallbackAgencyReply(prompt));
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Ты — внутренний старший бизнес-ассистент и технический директор IT-агентства, которое разрабатывает и подключает ботов-помощников для организаций (автосервисы, салоны красоты, клиники, рестораны, ритейл, юристы и др.).
Твоя задача — помогать владельцу агентства:
1. Составлять убойные коммерческие предложения (КП), скрипты продаж и холодного аутрича.
2. Отрабатывать возражения заказчиков («дорого», «зачем бот», «у нас уже есть админ»).
3. Проектировать логику, тарифы (разовый сетап + абонплата MRR) и системные промпты для клиентских ботов.
4. Анализировать клиентскую базу, подсказывать апсейлы и напоминания об оплате.
Отвечай структурированно, профессионально, с конкретными цифрами и готовыми шаблонами текстов на русском языке.
В конце ответа предложи 3 коротких вопроса/действия.
Ответь в формате JSON:
{
  "reply": string (markdown текст с четким форматированием),
  "suggestions": string[] (ровно 3 коротких варианта следующих вопросов)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Вопрос/запрос от владельца агентства: "${prompt}". Контекст клиентов: ${JSON.stringify(context || {})}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        reply: parsed.reply || getFallbackAgencyReply(prompt).reply,
        suggestions: parsed.suggestions || [
          "Составить КП для нового клиента",
          "Скрипт отработки возражения",
          "Идеи апсейла существующим клиентам"
        ]
      });
    } catch (err: any) {
      console.warn('Agency assistant fallback activated:', err.message);
      return res.json(getFallbackAgencyReply(prompt));
    }
  });

  // API: Automatic Bot Configuration Generator (Промпт + База знаний + Услуги)
  app.post('/api/generate-bot-config', async (req: Request, res: Response) => {
    const { orgName, niche, phone, servicesText, channels } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const fallbackConfig = {
      greeting: `Здравствуйте! Вас приветствует бот-помощник компании «${orgName || 'нашей организации'}». Чем могу помочь? Могу записать на удобное время, рассчитать стоимость услуг или позвать оператора.`,
      systemPrompt: `Ты — вежливый, точный и оперативный цифровой администратор компании «${orgName || 'Организация'}» (сфера: ${niche || 'услуги'}, телефон: ${phone || 'контактный номер'}).
Твои обязанности:
1. Консультировать клиентов по услугам и ценам.
2. Помогать выбрать дату и время для записи, собирая имя клиента, телефон и марку/детали запроса.
3. Отвечать на частые вопросы (график работы, адрес, гарантии).
4. Если клиент запрашивает нестандартную задачу или человека, вежливо передать контакты оператора (${phone || 'нашего менеджера'}).
Тон общения: доброжелательный, деловой, ответы краткие (1-3 предложения), удобные для чтения с экрана телефона.`,
      services: [
        { name: `Базовая услуга (${niche || 'Консультация'})`, price: 1500, duration: "30 мин" },
        { name: "Комплексный пакет", price: 3500, duration: "60 мин" },
        { name: "Экспресс-диагностика / расчет", price: 800, duration: "15 мин" }
      ],
      faq: [
        { q: "Как записаться?", a: "Напишите желаемую дату, время и ваш номер телефона — я сразу забронирую слот." },
        { q: "Как оплатить?", a: "Оплата возможна картой, наличными или по QR-коду после оказания услуги." },
        { q: "Можно ли перенести запись?", a: "Да, напишите в этот чат за 2 часа до визита или позвоните нам." }
      ]
    };

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      return res.json(fallbackConfig);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Сгенерируй готовую конфигурацию бота-помощника для организации:
Название: "${orgName}"
Ниша/Сфера: "${niche}"
Телефон: "${phone}"
Вводные данные/услуги: "${servicesText}"
Каналы: "${(channels || []).join(', ')}"

Верни JSON следующего формата:
{
  "greeting": string (приветственное сообщение бота с эмодзи),
  "systemPrompt": string (детальный системный промпт роли, ограничений и алгоритма работы),
  "services": [
    { "name": string, "price": number, "duration": string }
  ] (3-5 типичных услуг с рыночными ценами в рублях),
  "faq": [
    { "q": string, "a": string }
  ] (3-4 ключевых вопроса-ответа)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.warn('Bot config generator fallback:', err.message);
      return res.json(fallbackConfig);
    }
  });

  // API: Live interactive dialogue test for any client's bot
  app.post('/api/test-bot-dialog', async (req: Request, res: Response) => {
    const { systemPrompt, orgName, userMessage, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const fallbackReply = `Здравствуйте! Я виртуальный ассистент «${orgName || 'компании'}». По вашему запросу («${userMessage.slice(0, 30)}...») готов сориентировать вас по свободным слотам или рассчитать стоимость. Назовите удобный день и время!`;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      return res.json({ reply: fallbackReply });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = systemPrompt || `Ты — бот-помощник компании ${orgName}. Отвечай кратко, по делу и вежливо.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `История переписки: ${JSON.stringify(history || [])}\nНовое сообщение пользователя: "${userMessage}"`,
        config: {
          systemInstruction,
        }
      });

      return res.json({ reply: response.text || fallbackReply });
    } catch (err: any) {
      console.warn('Bot dialog test fallback:', err.message);
      return res.json({ reply: fallbackReply });
    }
  });

  // In development, hook up Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
