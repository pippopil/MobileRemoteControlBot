import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, ArrowRight, Copy, Check, Send, ShieldAlert, Calendar } from 'lucide-react';
import { ValidationResult } from '../types';

export const AiIdeaValidator: React.FC = () => {
  const [ideaText, setIdeaText] = useState<string>('');
  const [skills, setSkills] = useState<string>('Базовый уровень (могу разобраться с no-code или простым скриптом)');
  const [budget, setBudget] = useState<string>('0 – 2 000 ₽ ($0 - $25)');
  const [timeframe, setTimeframe] = useState<string>('7 дней');
  const [marketTarget, setMarketTarget] = useState<string>('Малый B2B бизнес (услуги, ремонт, салоны)');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Quick preset ideas
  const presets = [
    'Telegram-бот для автоматической записи и напоминаний в автосервисы и автомойки',
    'Парсер горячих заказов на ремонт и отделку квартир из открытых чатов с фильтром спама',
    'Микро-сервис для селлеров Ozon, который за 5 секунд переписывает отзывы и даёт SEO-ключи',
    'QR-страница для кафе: сбор закрытых жалоб директору вместо негативных отзывов на Яндекс.Картах'
  ];

  const handleValidate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ideaText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaText,
          skills,
          budget,
          timeframe,
          marketTarget
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.error || 'Не удалось получить ответ анализатора');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка связи с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Интерактивный AI-архитектор</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Проверьте свою идею на жизнеспособность и скорость окупаемости
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Опишите вашу идею или задумку — ИИ-аналитик смоделирует юнит-экономику, вырежет лишний функционал, определит целевую аудиторию и составит холодный скрипт продаж и пошаговый план на первые 7 дней.
          </p>
        </div>

        {/* Input Form & Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                Суть идеи или какую проблему решает приложение:
              </label>
              <textarea
                rows={4}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Например: Хочу сделать Telegram-бота для местных стоматологий, который принимает заявки с рекламы и напоминает клиентам о записи за 3 часа..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />

              {/* Presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 block">Быстрые примеры для проверки:</span>
                <div className="space-y-1">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIdeaText(preset)}
                      className="text-left w-full text-[11px] text-slate-400 hover:text-emerald-400 p-1.5 bg-slate-950/60 rounded border border-slate-800/80 hover:border-slate-700 transition-colors line-clamp-1 cursor-pointer"
                    >
                      💡 {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Parameter selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Бюджет на старт:
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="0 ₽ ($0) — строго без бюджета">0 ₽ ($0) — строго без бюджета</option>
                  <option value="0 – 2 000 ₽ ($0 - $25)">0 – 2 000 ₽ ($0 - $25)</option>
                  <option value="до 10 000 ₽ ($100)">до 10 000 ₽ ($100)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Срок до первого чека:
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="3-5 дней">3-5 дней (сверхбыстро)</option>
                  <option value="7 дней">7 дней (рекомендуется)</option>
                  <option value="14 дней">14 дней</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-300 block mb-1">
                Целевой сегмент рынка:
              </label>
              <select
                value={marketTarget}
                onChange={(e) => setMarketTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Малый B2B бизнес (услуги, ремонт, салоны)">Малый B2B бизнес (услуги, авто, салоны)</option>
                <option value="Селлеры маркетплейсов (Wildberries / Ozon)">Селлеры маркетплейсов (WB / Ozon)</option>
                <option value="Фрилансеры и агентства (B2B софт)">Фрилансеры и агентства (B2B)</option>
                <option value="Бухгалтерия и учет малого бизнеса">Бухгалтерия и учет малого бизнеса</option>
              </select>
            </div>

            <button
              onClick={() => handleValidate()}
              disabled={loading || !ideaText.trim()}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Анализирую нишу и строю план...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Сгенерировать бизнес-план и скрипт</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300">
                {error}
              </div>
            )}
          </div>

          {/* Right: Analysis Results Display */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                {/* Score & Verdict */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs text-slate-400">Индекс окупаемости ниши:</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                        {result.viabilityScore} / 100
                      </span>
                      <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {result.viabilityScore >= 75 ? 'Высокая готовность платить' : 'Требуется доработка'}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400">Первый чек:</div>
                    <div className="text-sm font-bold text-white font-mono tabular-nums">
                      через {result.timeToFirstDollarDays} дней
                    </div>
                  </div>
                </div>

                {/* Verdict text */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Экспертный вердикт:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.verdict}
                  </p>
                </div>

                {/* Target Audience Pains */}
                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-2">
                    Ключевые боли, за решение которых вам заплатят:
                  </span>
                  <div className="space-y-1.5">
                    {result.targetAudiencePains.map((pain, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg flex items-start gap-2"
                      >
                        <span className="text-emerald-400 font-mono font-bold">0{idx + 1}.</span>
                        <span>{pain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Blueprint */}
                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-2">
                    Рекомендуемая сетка тарифов:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.monetizationBlueprint.pricingTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1"
                      >
                        <div className="text-xs font-medium text-slate-300">{tier.name}</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                          {tier.price}
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1 leading-snug">
                          {tier.features}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cold Outreach Script with Copy button */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5" />
                      Скрипт первого сообщения клиентам (Telegram / WhatsApp):
                    </span>
                    <button
                      onClick={() => handleCopy(result.monetizationBlueprint.salesPitchColdScript)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedScript ? (
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
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 italic leading-relaxed select-all">
                    {result.monetizationBlueprint.salesPitchColdScript}
                  </div>
                </div>

                {/* 7-Day Plan */}
                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Пошаговый план запуска на 7 дней:
                  </span>
                  <div className="space-y-2">
                    {result.actionPlan7Days.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg flex items-start gap-2.5 text-xs"
                      >
                        <span className="font-mono font-bold text-emerald-400 whitespace-nowrap mt-0.5">
                          {step.day}:
                        </span>
                        <div>
                          <span className="font-semibold text-white block">{step.title}</span>
                          <span className="text-slate-400 text-[11px]">{step.actions}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-800 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Готовы протестировать нишу?
                </h3>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  Заполните форму слева или выберите один из готовых пресетов, чтобы получить полный пошаговый расчет за несколько секунд.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
