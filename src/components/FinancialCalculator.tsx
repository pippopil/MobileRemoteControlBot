import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Wallet, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

export const FinancialCalculator: React.FC = () => {
  const [currency, setCurrency] = useState<'RUB' | 'USD'>('RUB');
  const [clientsCount, setClientsCount] = useState<number>(8);
  const [setupFee, setSetupFee] = useState<number>(18000); // 18k RUB or ~$200
  const [monthlyRetainer, setMonthlyRetainer] = useState<number>(4500); // 4.5k RUB or ~$50
  const [monthlyCosts, setMonthlyCosts] = useState<number>(1500); // API & host

  const sym = currency === 'RUB' ? '₽' : '$';

  // Format number
  const fmt = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  // Calculations
  const upfrontRevenue = clientsCount * setupFee;
  const grossMRR = clientsCount * monthlyRetainer;
  const netMRR = Math.max(0, grossMRR - monthlyCosts);
  const firstMonthTotal = upfrontRevenue + netMRR;
  const annualTotal = upfrontRevenue + (netMRR * 12);

  // Switch currencies helper
  const handleCurrencyToggle = (newCurr: 'RUB' | 'USD') => {
    if (newCurr === currency) return;
    setCurrency(newCurr);
    if (newCurr === 'USD') {
      setSetupFee(Math.round(setupFee / 90));
      setMonthlyRetainer(Math.round(monthlyRetainer / 90));
      setMonthlyCosts(Math.round(monthlyCosts / 90));
    } else {
      setSetupFee(Math.round(setupFee * 90));
      setMonthlyRetainer(Math.round(monthlyRetainer * 90));
      setMonthlyCosts(Math.round(monthlyCosts * 90));
    }
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              Юнит-экономика и прогноз
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Интерактивный калькулятор окупаемости Micro-SaaS
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Посчитайте, сколько денег принесёт микро-сервис при гибридной модели «Плата за внедрение + ежемесячная абонплата».
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => handleCurrencyToggle('RUB')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                currency === 'RUB'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Рубли (₽)
            </button>
            <button
              onClick={() => handleCurrencyToggle('USD')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 2-Column: Sliders on left, Live Output cards on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Sliders */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-semibold text-white">Параметры запуска</span>
              <span className="text-xs text-slate-400">Настройте под свою нишу</span>
            </div>

            {/* Slider 1: Clients */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Количество активных клиентов (бизнесов):
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm tabular-nums">
                  {clientsCount} клиентов
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={clientsCount}
                onChange={(e) => setClientsCount(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 клиент</span>
                <span>25 клиентов</span>
                <span>50 клиентов</span>
              </div>
            </div>

            {/* Slider 2: Upfront Setup Fee */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-blue-400" />
                  Разовый чек за внедрение / настройку (Setup Fee):
                </span>
                <span className="font-mono text-blue-400 font-bold text-sm tabular-nums">
                  {fmt(setupFee)} {sym}
                </span>
              </div>
              <input
                type="range"
                min={currency === 'RUB' ? 0 : 0}
                max={currency === 'RUB' ? 60000 : 700}
                step={currency === 'RUB' ? 1000 : 25}
                value={setupFee}
                onChange={(e) => setSetupFee(Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0 {sym}</span>
                <span>{currency === 'RUB' ? '30 000 ₽' : '$350'}</span>
                <span>{currency === 'RUB' ? '60 000 ₽' : '$700'}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 Платёж за первый день запуска: покрывает ваше время и даёт моментальный кэш.
              </p>
            </div>

            {/* Slider 3: Monthly Retainer */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  Ежемесячная абонплата за обслуживание (MRR):
                </span>
                <span className="font-mono text-amber-400 font-bold text-sm tabular-nums">
                  {fmt(monthlyRetainer)} {sym} / мес
                </span>
              </div>
              <input
                type="range"
                min={currency === 'RUB' ? 500 : 10}
                max={currency === 'RUB' ? 25000 : 300}
                step={currency === 'RUB' ? 500 : 5}
                value={monthlyRetainer}
                onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{currency === 'RUB' ? '500 ₽' : '$10'}</span>
                <span>{currency === 'RUB' ? '12 000 ₽' : '$150'}</span>
                <span>{currency === 'RUB' ? '25 000 ₽' : '$300'}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 Предсказуемый пассивный доход каждый месяц за работу сервера и поддержку.
              </p>
            </div>

            {/* Slider 4: Monthly Costs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                  Затраты на хостинг и Gemini/OpenAI API:
                </span>
                <span className="font-mono text-rose-400 font-bold text-sm tabular-nums">
                  {fmt(monthlyCosts)} {sym} / мес
                </span>
              </div>
              <input
                type="range"
                min={currency === 'RUB' ? 0 : 0}
                max={currency === 'RUB' ? 10000 : 120}
                step={currency === 'RUB' ? 200 : 5}
                value={monthlyCosts}
                onChange={(e) => setMonthlyCosts(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Right: Projected Real Returns */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Net 1st Month */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                Итого в первый месяц
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {fmt(firstMonthTotal)} {sym}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Чистая прибыль с учетом разовых оплат за внедрение и первого месяца подписки.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Разовый кэш (Setup)</div>
                  <div className="text-lg font-bold text-blue-400 font-mono tabular-nums mt-0.5">
                    {fmt(upfrontRevenue)} {sym}
                  </div>
                  <div className="text-[11px] text-slate-500">сразу на старте</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Чистый MRR в месяц</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                    {fmt(netMRR)} {sym}
                  </div>
                  <div className="text-[11px] text-slate-500">пассивный доход</div>
                </div>
              </div>
            </div>

            {/* Annual Run-Rate Projection */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Годовая чистая выручка (ARR)
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  12 месяцев
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {fmt(annualTotal)} {sym}
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Срок окупаемости вложений:</span>
                  <span className="font-mono text-emerald-400 font-semibold">1-3 дня (с первой продажи)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Время на поддержку в неделю:</span>
                  <span className="font-mono text-slate-200">2-4 часа (роботы работают сами)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Маржинальность бизнеса:</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {Math.round((netMRR / (grossMRR || 1)) * 100)}% (нет склада и физических товаров)
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Insight */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Почему эта математика работает мгновенно:</strong>
                Вам не нужно искать 10 000 скачиваний по 99 ₽. Вам достаточно найти всего{' '}
                <span className="text-emerald-400 font-semibold font-mono">{clientsCount} бизнесов</span>{' '}
                в своем городе или в профильных Telegram-чатах, чтобы выйти на ежемесячный доход{' '}
                <span className="text-emerald-400 font-semibold font-mono">{fmt(netMRR)} {sym}</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
