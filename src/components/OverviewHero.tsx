import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react';
import { CORE_RULES } from '../data/blueprintsData';

interface OverviewHeroProps {
  onSelectBlueprintTab: () => void;
  onOpenAiValidator: () => void;
  onOpenCalculator: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  onSelectBlueprintTab,
  onOpenAiValidator,
  onOpenCalculator
}) => {
  return (
    <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            <span>Стратегический разбор и готовые решения 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Какое приложение создать, чтобы заработать <span className="text-emerald-400">в кратчайшие сроки</span> с минимальными вложениями?
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Реалистичный ответ опытных фаундеров: не тратьте 6 месяцев на разработку сложного мобильного приложения под App Store. Самый быстрый путь к деньгам — это <strong className="text-white">B2B Micro-SaaS или Telegram-бот</strong>, решающий острую рутину бизнеса, с оплатой за внедрение уже на 3-7 день.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onSelectBlueprintTab}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Смотреть 6 готовых ниш с планом</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCalculator}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-lg border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Посчитать окупаемость</span>
            </button>
          </div>
        </div>

        {/* 3 Metric anchors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Срок до первых денег</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums">3 – 7 дней</div>
              <div className="text-xs text-slate-400">Без долгой модерации Apple и Google</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Стартовые вложения</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums">0 – 2 500 ₽ ($0 - $25)</div>
              <div className="text-xs text-slate-400">Серверы и API бесплатны на старте</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Потенциал за 1 месяц</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums">60 000 – 180 000 ₽</div>
              <div className="text-xs text-slate-400">С 3–5 подключенных B2B-клиентов</div>
            </div>
          </div>
        </div>

        {/* 4 Golden Rules */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-white">
              4 фундаментальных правила запуска без бюджета
            </h2>
            <p className="text-xs text-slate-400">
              Почему одни тратят год впустую, а другие получают первую прибыль через неделю
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h3 className="font-semibold text-sm text-white line-clamp-1">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {rule.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="text-slate-400 font-sans text-[11px]">Эффект:</span>
                  <span>{rule.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
