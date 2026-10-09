import React, { useState } from 'react';
import { BLUEPRINTS } from '../data/blueprintsData';
import { Blueprint } from '../types';
import {
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  PhoneCall,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface BlueprintsSectionProps {
  onSelectForPitch: (blueprint: Blueprint) => void;
}

export const BlueprintsSection: React.FC<BlueprintsSectionProps> = ({ onSelectForPitch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBlueprint, setActiveBlueprint] = useState<Blueprint | null>(BLUEPRINTS[0]);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Все идеи (6)' },
    { id: 'local-services', label: 'Локальные услуги & Мессенджеры' },
    { id: 'marketplace', label: 'E-commerce & Селлеры' },
    { id: 'fintech-ops', label: 'Учет & Бухгалтерия' },
    { id: 'lead-gen', label: 'Лидогенерация & Мониторинг' },
  ];

  const filteredBlueprints = selectedCategory === 'all'
    ? BLUEPRINTS
    : BLUEPRINTS.filter(b => b.category === selectedCategory);

  const handleCopyPitch = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              Проверенные модели
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Топ-6 готовых приложений для быстрого старта с окупаемостью до 7 дней
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Каждая идея рассчитана на запуск в одиночку с бюджетом до $30 (на кофе и хостинг) и закрытие первых платных заказчиков через прямое решение боли.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Blueprint Grid / Selector on Left, Deep Dive Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards List */}
          <div className="lg:col-span-5 space-y-3.5">
            {filteredBlueprints.map((item) => {
              const isSelected = activeBlueprint?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveBlueprint(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-sans">
                    <span className="text-emerald-400 font-medium">{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">До денег: {item.timeToFirstDollarDays} дн.</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">Бюджет: {item.budgetMin}-{item.budgetMax}$</span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono tabular-nums">
                      <span className="text-slate-400 font-sans text-[11px]">Потенциал:</span>
                      <span className="font-semibold text-emerald-400">{item.expectedMonthlyPotential}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-white text-xs">
                      <span>План запуска</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed View */}
          {activeBlueprint && (
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              {/* Header of selected */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">{activeBlueprint.categoryLabel}</span>
                    <span>·</span>
                    <span>Сложность: {activeBlueprint.difficulty}</span>
                  </div>
                  <button
                    onClick={() => onSelectForPitch(activeBlueprint)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Сгенерировать питч</span>
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeBlueprint.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {activeBlueprint.tagline}
                </p>
              </div>

              {/* Core Mechanics & Pain Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Реальная боль клиента (почему платят)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeBlueprint.corePain}
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Механика решения (как работает MVP)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeBlueprint.mechanism}
                  </p>
                </div>
              </div>

              {/* Economic Highlights */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950/50 border border-slate-800 rounded-xl p-3.5">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Стартовый чек</div>
                  <div className="text-sm font-bold text-white font-mono tabular-nums mt-0.5">
                    {activeBlueprint.upfrontSetupFee}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Абонплата (MRR)</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                    {activeBlueprint.monthlyRetainer}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Срок 1-й оплаты</div>
                  <div className="text-sm font-bold text-white font-mono tabular-nums mt-0.5">
                    {activeBlueprint.timeToFirstDollarDays} дня
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Минимальный стек разработки ($0 на старте):</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeBlueprint.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700/80 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Tiers */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Рекомендуемая тарифная сетка:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeBlueprint.pricingTiers.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-medium text-slate-300">{p.tier}</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                          {p.price}
                        </div>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day 7-Day Plan */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Пошаговый план запуска за 7 дней (от нуля до первых денег):</span>
                </div>
                <div className="space-y-2">
                  {activeBlueprint.dayByDayPlan.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg flex items-start gap-3 text-xs"
                    >
                      <span className="font-mono font-bold text-emerald-400 whitespace-nowrap shrink-0 mt-0.5">
                        {step.day}:
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-slate-200 font-medium">{step.task}</span>
                        <div className="text-slate-400 text-[11px] leading-tight">
                          Результат: {step.deliverable}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cold Sales Outreach Script */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Скрипт первого сообщения (Telegram / WhatsApp / Direct):</span>
                  </div>
                  <button
                    onClick={() => handleCopyPitch(activeBlueprint.salesPitch)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копировать</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/90 text-xs text-slate-300 italic leading-relaxed select-all">
                  {activeBlueprint.salesPitch}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
