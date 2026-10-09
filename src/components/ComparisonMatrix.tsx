import React from 'react';
import { Check, X, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const models = [
    {
      name: 'B2B Micro-SaaS & Telegram Бот',
      badge: 'Рекомендуемый выбор для быстрых денег',
      highlight: true,
      timeToMoney: '3 – 7 дней',
      budget: '0 – 2 500 ₽ ($0 - $25)',
      firstClientProb: '75 – 85% (прямой аутрич)',
      appStoreFees: '0% (напрямую через СБП / карту)',
      margin: '90 – 95%',
      friction: 'Минимальное: запуск по ссылке в мессенджере',
      verdict: 'Идеально для заработка в первые 1-2 недели без команды и бюджета.'
    },
    {
      name: 'E-commerce & Селлер расширение',
      badge: 'Большой органический спрос',
      highlight: false,
      timeToMoney: '5 – 10 дней',
      budget: '1 000 – 3 000 ₽',
      firstClientProb: '60 – 70% (через чаты селлеров)',
      appStoreFees: '0% (веб-оплата)',
      margin: '85 – 90%',
      friction: 'Низкое: регистрация через браузер',
      verdict: 'Отличный выбор, если интересна тема маркетплейсов (Wildberries / Ozon).'
    },
    {
      name: 'Мобильное приложение (iOS / Android)',
      badge: 'Ловушка для новичков',
      highlight: false,
      timeToMoney: '2 – 6 месяцев',
      budget: '50 000 – 300 000 ₽ + $99/год Apple',
      firstClientProb: '5 – 10% (огромная конкуренция)',
      appStoreFees: '15 – 30% комиссии Apple/Google',
      margin: '30 – 50% (после вычета рекламы)',
      friction: 'Очень высокое: скачивание из Store, онбординг',
      verdict: 'Не подходит для быстрого старта с $0: долго, дорого, высокий риск провала.'
    },
    {
      name: 'Информационный контентный сайт',
      badge: 'Медленная окупаемость',
      highlight: false,
      timeToMoney: '4 – 9 месяцев',
      budget: '5 000 – 20 000 ₽ (домены, тексты)',
      firstClientProb: '10 – 20% (зависимость от SEO)',
      appStoreFees: '0%',
      margin: '60 – 70%',
      friction: 'Среднее',
      verdict: 'Слишком долгий цикл индексации в поиске для быстрых денег.'
    }
  ];

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-800 pb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
            Экономика и риски
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Сравнение типов приложений: почему 90% новичков теряют месяцы
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Главная ошибка начинающих — разработка классического мобильного приложения для App Store. Сравните объективные экономические показатели до того, как писать первую строчку кода.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-sans">
                <th className="p-4 text-slate-300 font-semibold w-1/4">Модель приложения</th>
                <th className="p-4 text-slate-300 font-semibold">Срок до первой оплаты</th>
                <th className="p-4 text-slate-300 font-semibold">Стартовый бюджет</th>
                <th className="p-4 text-slate-300 font-semibold">Шанс заработать в 1-й мес</th>
                <th className="p-4 text-slate-300 font-semibold">Комиссия сторов</th>
                <th className="p-4 text-slate-300 font-semibold">Маржинальность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {models.map((m, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    m.highlight
                      ? 'bg-emerald-950/20 hover:bg-emerald-950/30 font-medium'
                      : 'hover:bg-slate-850/40'
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {m.highlight && <Zap className="w-4 h-4 text-emerald-400 shrink-0" />}
                      <span className={`text-sm font-bold ${m.highlight ? 'text-emerald-400' : 'text-white'}`}>
                        {m.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.badge}</div>
                  </td>
                  <td className="p-4 font-mono tabular-nums text-slate-200">
                    <span className={m.highlight ? 'text-emerald-400 font-bold' : ''}>
                      {m.timeToMoney}
                    </span>
                  </td>
                  <td className="p-4 font-mono tabular-nums text-slate-300">
                    {m.budget}
                  </td>
                  <td className="p-4 font-mono tabular-nums">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        m.highlight ? 'text-emerald-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {m.firstClientProb}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    {m.appStoreFees}
                  </td>
                  <td className="p-4 font-mono tabular-nums text-slate-300">
                    {m.margin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
              <X className="w-4 h-4" />
              <span>Почему мобильные B2C-приложения проваливаются у новичков:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Чтобы обычный человек скачал приложение и оформил подписку за 199 ₽, нужно потратить 300–700 ₽ на рекламу (CAC &gt; LTV). Без огромного бюджета на маркетинг мобильное приложение останется на дне App Store с 12 скачиваниями от друзей.
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Check className="w-4 h-4" />
              <span>Почему B2B Micro-SaaS и Telegram-боты дают деньги сразу:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Вы продаете прямое решение владельцу бизнеса. Ему не нужно скачивать приложение — он получает готового робота, который экономит 20 часов работы или приносит новые заказы. Он с легкостью отдает 15 000 – 30 000 ₽ с первой же демонстрации.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
