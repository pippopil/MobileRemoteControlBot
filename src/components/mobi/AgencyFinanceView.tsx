import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Users,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { ClientBot } from '../../types';

interface AgencyFinanceViewProps {
  clients: ClientBot[];
}

export const AgencyFinanceView: React.FC<AgencyFinanceViewProps> = ({ clients }) => {
  const [copiedInvoiceId, setCopiedInvoiceId] = useState<string | null>(null);

  // Financial calculations
  const activeClients = clients.filter((c) => c.status === 'active');
  const totalMRR = activeClients.reduce((acc, c) => acc + c.monthlyFee, 0);
  const totalSetupFees = clients.reduce((acc, c) => acc + c.setupFeePaid, 0);
  const totalYearlyPotential = totalMRR * 12 + totalSetupFees;
  const avgMonthlyFee = activeClients.length > 0 ? Math.round(totalMRR / activeClients.length) : 0;

  const handleCopyInvoice = (clientId: string, clientName: string, amount: number) => {
    const text = `Счет на оплату обслуживания бота (${clientName}): ${amount.toLocaleString('ru-RU')} ₽ за месяц. Оплата по ссылке: https://pay.bothub.pro/invoice/${clientId}`;
    navigator.clipboard.writeText(text);
    setCopiedInvoiceId(clientId);
    setTimeout(() => setCopiedInvoiceId(null), 2000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-2xl mx-auto">
      {/* Financial Hero Banner */}
      <div className="p-5 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl shadow-xl">
        <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Wallet className="w-4 h-4" />
          <span>Финансовый пульт агентства</span>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {totalMRR.toLocaleString('ru-RU')} ₽
              <span className="text-xs font-normal text-slate-400 ml-1.5">/ месяц (MRR)</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <span>Чистая регулярная абонплата от {activeClients.length} активных организаций</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono">
              +100% Маржа
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Разовый доход:</span>
            <span className="font-bold text-white text-sm">+{totalSetupFees.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Средний чек:</span>
            <span className="font-bold text-emerald-400 text-sm">{avgMonthlyFee.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Годовой прогноз:</span>
            <span className="font-bold text-blue-400 text-sm">~{totalYearlyPotential.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>

      {/* Subscription Billing Schedule */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>График списания абонентских плат (Billing)</span>
          </h3>
          <span className="text-[11px] text-slate-400">{clients.length} договоров</span>
        </div>

        <div className="space-y-2">
          {clients.map((c) => {
            const isExpiringSoon = c.status === 'warning';
            return (
              <div
                key={c.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="font-semibold text-white flex items-center gap-1.5 truncate">
                    <span>{c.orgName}</span>
                    {isExpiringSoon && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                        Оплата завтра
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    След. платеж: <span className="font-mono text-slate-300">{c.nextBillingDate}</span> • Тариф {c.plan}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="font-mono text-right">
                    <span className="font-bold text-emerald-400 block">{c.monthlyFee.toLocaleString('ru-RU')} ₽</span>
                    <span className="text-[9px] text-slate-500">в месяц</span>
                  </div>

                  <button
                    onClick={() => handleCopyInvoice(c.id, c.orgName, c.monthlyFee)}
                    title="Скопировать счет для клиента"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedInvoiceId === c.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scaling Economics Tips */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-2.5 text-xs">
        <h4 className="font-bold text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Стратегия масштабирования агентства</span>
        </h4>
        <div className="space-y-1.5 text-slate-300 leading-relaxed">
          <p>
            • <strong>10 клиентов</strong> на тарифе Про (4 900 ₽) = <strong>49 000 ₽/мес</strong> чистого пассивного дохода на абонплатах + <strong>199 000 ₽</strong> разово за запуск.
          </p>
          <p>
            • <strong>25 клиентов</strong> (город/район) = <strong>122 500 ₽/мес</strong> постоянной выручки при расходах на сервера &lt; 5 000 ₽/мес.
          </p>
          <p>
            • <strong>Доп. модуль «Склад / Интеграция с CRM»</strong> приносит еще +1 500 – 2 500 ₽/мес с каждого клиента.
          </p>
        </div>
      </div>
    </div>
  );
};
