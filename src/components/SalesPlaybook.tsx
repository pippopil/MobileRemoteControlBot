import React, { useState } from 'react';
import { Send, Mail, Phone, Copy, Check, Sparkles, Loader2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Blueprint } from '../types';

interface SalesPlaybookProps {
  initialBlueprint?: Blueprint | null;
}

export const SalesPlaybook: React.FC<SalesPlaybookProps> = ({ initialBlueprint }) => {
  const [activeChannel, setActiveChannel] = useState<'telegram' | 'email' | 'call'>('telegram');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Generator state
  const [nicheTitle, setNicheTitle] = useState<string>(
    initialBlueprint ? initialBlueprint.title : 'AI-бот квалификации и записи клиентов'
  );
  const [targetClient, setTargetClient] = useState<string>(
    initialBlueprint ? initialBlueprint.targetClients[0] : 'Частные автосервисы и клиники'
  );
  const [mainBenefit, setMainBenefit] = useState<string>(
    'Мгновенный ответ клиентам за 5 секунд и предотвращение потери до 60% заявок'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPitch, setGeneratedPitch] = useState<{
    telegram?: string;
    emailSubject?: string;
    emailBody?: string;
    callScript?: string;
  } | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGeneratePitch = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicheTitle, targetClient, mainBenefit })
      });
      const data = await res.json();
      setGeneratedPitch(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Standard proven templates
  const templates = {
    telegram: {
      title: 'Холодное сообщение в Telegram / WhatsApp ЛПРу (Владельцу бизнеса)',
      context: 'Конверсия в ответ: 18-24%. Главное правило: не продавать в первом сообщении, а продать интерес и бесплатный тест-драйв.',
      text: `«Здравствуйте, [Имя]! Нашёл вашу компанию на картах. Заметил, что ваши администраторы отвечают на сообщения в нерабочее время с задержкой в несколько часов — из-за этого часть горячих клиентов уходит к конкурентам.

Мы разработали готового ассистента в Telegram, который отвечает клиентам за 5 секунд, квалифицирует запрос и сразу записывает человека в график.

Готов подключить его вам бесплатно на 3 дня на пробу без каких-либо оплат, чтобы вы сами замерили количество спасённых заявок. Удобно будет взглянуть на 1-минутное видео, как это работает?»`
    },
    email: {
      title: 'Холодное письмо руководителю или директору по маркетингу',
      context: 'Тема письма решает 80% успеха. Никакого спама, только факты и замер потерь.',
      subject: `Вопрос по обработке входящих заявок в [Название компании]`,
      text: `«Здравствуйте, [Имя]!

Пишу кратко: вчера вечером оставил тестовую заявку через форму на вашем сайте, ответ пришёл только через 4 часа.

По отраслевой статистике, 65% клиентов за это время уже закрывают сделку с другой компанией. 

Мы внедрили микро-решение для компаний из сферы [Отрасль], которое:
1. Отвечает клиенту за 10 секунд прямо в мессенджере;
2. Собирает контакты и суть задачи;
3. Мгновенно передает уведомление вам в Telegram с готовой карточкой лида.

Результат наших клиентов: +15-25% к числу состоявшихся записей в первый же месяц.

Готов провести 5-минутную демонстрацию на вашем тестовом номере. В какой день на этой неделе вам было бы удобно?»`
    },
    call: {
      title: 'Скрипт 3-минутного телефонного звонка или Zoom-демо',
      context: 'Структура: Крючок -> Проблема -> Простое решение -> Закрытие на бесплатный 3-дневный тест.',
      text: `«Добрый день, [Имя]! Это [Ваше Имя]. Я буквально на две минуты. 

Скажите, у вас сейчас отдел продаж или администратор успевает отвечать на сообщения в WhatsApp в течение 2-3 минут?

(Клиент: Обычно да, но вечером или при загрузке бывают задержки)

Именно поэтому я и звоню. Мы запустили микро-бота, который полностью закрывает эту проблему: он перехватывает лида за 5 секунд, отвечает на типовые вопросы о ценах и услугах и сразу бронирует визит.

Я не предлагаю ничего покупать сейчас. Давайте я просто подключу тестовую версию на 48 часов на отдельный тестовый номер, вы посмотрите реакцию клиентов, и если вам понравится — обсудим внедрение за чисто символические 15 000 рублей. Договорились?»`
    }
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
            Практика продаж без бюджета
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Скрипты продаж для привлечения первых 5-10 клиентов
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Вам не нужен платный таргетинг или блогеры. Первые $500–$1,500 зарабатываются через прямой контакт с владельцами бизнесов, страдающих от конкретной рутины.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveChannel('telegram')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeChannel === 'telegram'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram / WhatsApp (Рекомендуется)</span>
          </button>
          <button
            onClick={() => setActiveChannel('email')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeChannel === 'email'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Холодный Email</span>
          </button>
          <button
            onClick={() => setActiveChannel('call')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeChannel === 'call'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Звонок / Демо (3 мин)</span>
          </button>
        </div>

        {/* Active Template Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">
                {templates[activeChannel].title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {templates[activeChannel].context}
              </p>
            </div>

            <button
              onClick={() => handleCopy(
                activeChannel === 'email'
                  ? `Тема: ${templates.email.subject}\n\n${templates.email.text}`
                  : templates[activeChannel].text,
                `tpl-${activeChannel}`
              )}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              {copiedId === `tpl-${activeChannel}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать шаблон</span>
                </>
              )}
            </button>
          </div>

          {activeChannel === 'email' && (
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block mb-1">ТЕМА ПИСЬМА:</span>
              <span className="text-emerald-400 font-semibold">{templates.email.subject}</span>
            </div>
          )}

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line select-all">
            {templates[activeChannel].text}
          </div>
        </div>

        {/* Dynamic AI Custom Script Generator */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Генератор персонального скрипта под вашу точную сферу
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Укажите нишу и выгоду — ИИ адаптирует продающие формулировки для максимальной конверсии:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Продукт / Решение:</label>
              <input
                type="text"
                value={nicheTitle}
                onChange={(e) => setNicheTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Кому продаем (ЦА):</label>
              <input
                type="text"
                value={targetClient}
                onChange={(e) => setTargetClient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Главная осязаемая выгода:</label>
              <input
                type="text"
                value={mainBenefit}
                onChange={(e) => setMainBenefit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={handleGeneratePitch}
              disabled={isGenerating}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:bg-slate-800 disabled:text-slate-500"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Генерирую скрипты...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Создать 3 адаптированных скрипта</span>
                </>
              )}
            </button>
          </div>

          {generatedPitch && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              {generatedPitch.telegram && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Telegram / WhatsApp скрипт:</span>
                    <button
                      onClick={() => handleCopy(generatedPitch.telegram || '', 'custom-tg')}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedId === 'custom-tg' ? 'Скопировано!' : 'Копировать'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 italic">{generatedPitch.telegram}</p>
                </div>
              )}
              {generatedPitch.emailBody && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Email скрипт (Тема: {generatedPitch.emailSubject}):</span>
                    <button
                      onClick={() => handleCopy(`${generatedPitch.emailSubject}\n\n${generatedPitch.emailBody}`, 'custom-em')}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedId === 'custom-em' ? 'Скопировано!' : 'Копировать'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 italic whitespace-pre-line">{generatedPitch.emailBody}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
