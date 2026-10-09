import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  Users,
  Award
} from 'lucide-react';

export const CompetitorAnalysis: React.FC = () => {
  const [copiedObjectionScript, setCopiedObjectionScript] = useState(false);

  const existingServices = [
    {
      name: 'Revvy (Ревви)',
      niche: 'Сбор отзывов и перехват негатива (Вариант 3)',
      pricing: 'от 4 900 до 8 000 ₽ / мес за каждую точку',
      turnover: 'Выручка > 150 млн ₽ / год (доказывает огромный спрос!)',
      weakness: 'Продают только через долгий колл-центр, не адаптируют скрипты под малые автосервисы и одиночные заведения, высокий входной порог.'
    },
    {
      name: 'Salebot / BotHelp / ManyChat',
      niche: 'Конструкторы чат-ботов (Вариант 1)',
      pricing: '1 200 – 3 500 ₽ / мес за подписку',
      turnover: 'Сотни тысяч пользователей',
      weakness: 'Это пустые сложные «конструкторы». Владелец автосервиса или стоматологии открывает их, видит 100 кнопок и блок-схем, пугается и закрывает вкладку.'
    },
    {
      name: 'Marquiz / Envybox',
      niche: 'Квизы и всплывающие виджеты',
      pricing: 'от 1 000 ₽ / мес',
      turnover: 'Миллионы лидов',
      weakness: 'Статичные опросники без живого диалога. Нет AI-квалификации сложных запросов и нет живой интеграции в ночной WhatsApp.'
    }
  ];

  const handleCopyScript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedObjectionScript(true);
    setTimeout(() => setCopiedObjectionScript(false), 2000);
  };

  const objectionScript = `«Виктор Михайлович, вы абсолютно правы — на рынке есть конструкторы ботов за 1 500 рублей в месяц. 
Но представьте: вам нужно потратить 30 часов своего времени: зарегистрироваться, разобраться в блок-схемах, API, серверах, протестировать 50 сценариев ошибок и подключить эквайринг. 
Ваш час как руководителя стоит минимум 3 000 рублей. Потратив 30 часов, вы «сэкономите» 15 000 ₽, но потеряете 90 000 ₽ своего времени и еще пару клиентов на тестах. 
Мы берем 19 000 ₽ за то, чтобы сделать всё за вас за 24 часа под ключ с гарантией. Вы просто получаете готовые заявки в Telegram уже завтра. Разве ваше спокойствие этого не стоит?»`;

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>АНАЛИЗ РЫНКА И КОНКУРЕНЦИИ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          «А такие сервисы уже есть?» — Честный ответ экспертов
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          <strong>Да, аналоги существуют, и это ЛУЧШАЯ новость для вас!</strong> Это железное подтверждение того, что в нише есть огромный сформированный рынок, и бизнесы уже привыкли платить за это десятки миллионов рублей ежемесячно.
        </p>
      </div>

      {/* 3 Existing Titans as Proof of Market */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Существующие лидеры рынка (Доказательство платежеспособности клиентов):</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {existingServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">{service.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Работает годами
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{service.niche}</div>
                <div className="text-xs font-semibold text-emerald-400 font-mono mt-2">
                  Тарифы: {service.pricing}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs space-y-1.5">
                <div className="text-slate-300">
                  <strong className="text-slate-200">Масштаб:</strong> {service.turnover}
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  <strong className="text-rose-400">Слабое место:</strong> {service.weakness}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Clients Buy From You: The DIY Paradox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">
            Парадокс: почему бизнес НЕ покупает у конструкторов, а отдаст 19 000 ₽ вам
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Разница между продажей «кирпичей» и продажей «готового дома»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <XCircle className="w-4 h-4" />
              <span>Что продают сервисы-конструкторы (BotHelp, Salebot):</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 list-disc pl-4 leading-relaxed">
              <li>Они продают <strong>пустой софт</strong>. Владелец автосервиса или стоматологии должен сам сесть ночью и нарисовать 30 стрелочек в блок-схеме.</li>
              <li>Требуется интеграция с API, вебхуками, серверами и написание скриптов.</li>
              <li>90% предпринимателей не хотят и не умеют это делать — у них болит голова от текучки, поставщиков и налогов.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Что продаете ВЫ (Модель «Productized Service»):</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 list-disc pl-4 leading-relaxed">
              <li>Вы продаете <strong>готовый результат под ключ</strong>: «Через 24 часа у вас в Telegram будут падать готовые ночные клиенты».</li>
              <li>Вы лично адаптируете бота под специфику конкретного автосервиса или клиники.</li>
              <li>Вы берете разовые 19 000 ₽ за настройку + 3 900 ₽/мес за то, что директор вообще не думает о серверах и поддержке.</li>
            </ul>
          </div>
        </div>

        {/* Local Advantage */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Ваше супер-оружие: Личный локальный контакт</span>
          </h4>
          <p className="text-slate-300 leading-relaxed">
            Большие корпорации вроде Revvy или BotHelp никогда не придут пешком в автосервис на соседней улице. Они не сделают тайный аудит ночного сбоя именно этого директора. А вы можете прийти, показать на телефоне его собственный неотвеченный вчера ночной WhatsApp и закрыть сделку за 5 минут живого диалога.
          </p>
        </div>
      </div>

      {/* Script for handling objection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Как отвечать клиенту, если он скажет: «А я могу сам настроить бота за 500 рублей?»</span>
            </h3>
            <p className="text-xs text-slate-400">Готовый психологический скрипт для созвона или встречи</p>
          </div>

          <button
            onClick={() => handleCopyScript(objectionScript)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {copiedObjectionScript ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать ответ</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 text-xs text-slate-200 italic leading-relaxed whitespace-pre-line select-all">
          {objectionScript}
        </div>
      </div>
    </div>
  );
};
