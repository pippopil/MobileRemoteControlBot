import React, { useState } from 'react';
import {
  Star,
  QrCode,
  ShieldAlert,
  ThumbsUp,
  Send,
  Building,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Copy,
  Check,
  TrendingUp,
  MapPin,
  MessageSquare
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  rating: number;
  customerName: string;
  phone: string;
  comment: string;
  status: 'intercepted' | 'resolved';
  time: string;
}

export const ReviewBoostStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'crm' | 'printQr'>('simulator');
  const [venueName, setVenueName] = useState('Ресторан «Буржуа»');
  const [venueCategory, setVenueCategory] = useState('Ресторан / Кофейня');
  const [yandexMapsUrl, setYandexMapsUrl] = useState('https://yandex.ru/maps/org/burzshua/123456');
  const [gisMapsUrl, setGisMapsUrl] = useState('https://2gis.ru/moscow/firm/7000000123');

  // Customer simulator rating state
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [customerComment, setCustomerComment] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Manager complaints database
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 'fb-1',
      rating: 2,
      customerName: 'Екатерина',
      phone: '+7 (915) 332-90-11',
      comment: 'Официант перепутал десерт и чек несли 20 минут. Но еда вкусная.',
      status: 'intercepted',
      time: 'Вчера, 19:40'
    },
    {
      id: 'fb-2',
      rating: 1,
      customerName: 'Артем',
      phone: '+7 (903) 881-22-33',
      comment: 'Суп принесли еле теплым, столик у сквозняка. Разочарован.',
      status: 'resolved',
      time: '2 дня назад'
    }
  ]);

  const handleStarClick = (star: number) => {
    setSelectedRating(star);
    setIsSubmitted(false);
    setCustomerComment('');
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerComment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      rating: selectedRating || 1,
      customerName: customerName.trim() || 'Гость',
      phone: customerPhone.trim() || '+7 (999) 000-00-00',
      comment: customerComment.trim(),
      status: 'intercepted',
      time: 'Только что'
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    setIsSubmitted(true);
  };

  const interceptedCount = feedbacks.length;
  const ratingAverage = 4.8; // Estimated after shielding

  return (
    <div className="space-y-6">
      {/* ReviewBoost Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>ГОТОВЫЙ ПРОДУКТ: ВАРИАНТ №3</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              ReviewBoost — QR-система фильтрации негатива и 5★ на Яндекс.Картах и 2ГИС
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Защищает рейтинг заведений: довольные гости (4–5★) переходят на Яндекс.Карты, а недовольные (1–3★) отправляют жалобу лично директору в Telegram, не роняя публичный рейтинг.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Перехвачено негатива</div>
              <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">
                {interceptedCount} жалоб спасено
              </div>
            </div>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveSubTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'simulator'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>1. Симулятор сканирования QR гостем</span>
          </button>

          <button
            onClick={() => setActiveSubTab('crm')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'crm'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>2. Панель директора ({feedbacks.length} перехваченных жалоб)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('printQr')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'printQr'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>3. Генератор тейбл-тента для столов</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CUSTOMER QR SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings Left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400" />
                <span>Настройки заведения для теста</span>
              </h3>

              <div>
                <label className="text-slate-400 block mb-1">Название заведения:</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Тип заведения:</label>
                <select
                  value={venueCategory}
                  onChange={(e) => setVenueCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Ресторан / Кофейня">Ресторан / Кофейня</option>
                  <option value="Стоматология / Медцентр">Стоматология / Медцентр</option>
                  <option value="Барбершоп / Салон красоты">Барбершоп / Салон красоты</option>
                  <option value="Автосервис / Автомойка">Автосервис / Автомойка</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Ссылка на Яндекс.Карты:</label>
                <input
                  type="text"
                  value={yandexMapsUrl}
                  onChange={(e) => setYandexMapsUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 space-y-1">
                <strong className="text-white block font-medium">Как тестировать:</strong>
                <p>1. Нажмите <strong>5 звезд</strong> на телефоне справа — система направит на Яндекс.Карты.</p>
                <p>2. Нажмите <strong>1–2 звезды</strong> — система мгновенно спрячет негатив и откроет тайную жалобу директору.</p>
              </div>
            </div>
          </div>

          {/* Right Mobile Phone View */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-sm bg-slate-900 border-2 border-slate-700 rounded-[32px] overflow-hidden shadow-2xl p-6 text-center space-y-5 flex flex-col justify-between min-h-[520px]">
              {/* Header */}
              <div className="space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mx-auto flex items-center justify-center font-bold">
                  ★
                </div>
                <h3 className="text-base font-bold text-white pt-2">{venueName}</h3>
                <p className="text-xs text-slate-400">Как вам обслуживание и впечатления сегодня?</p>
              </div>

              {/* Star Rating Selector */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="p-1.5 transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        selectedRating && selectedRating >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 hover:text-amber-400/50'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* DYNAMIC BRANCH: 4-5 Stars -> High Rating Path */}
              {selectedRating && selectedRating >= 4 && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-3 text-xs animate-fadeIn">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Спасибо огромное за высокую оценку!</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Пожалуйста, поделитесь вашим отзывом на Яндекс.Картах или 2ГИС. Для нашей команды это лучшая благодарность!
                  </p>

                  <a
                    href={yandexMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
                  >
                    <span>Оставить отзыв на Яндекс.Картах</span>
                  </a>
                </div>
              )}

              {/* DYNAMIC BRANCH: 1-3 Stars -> Intercept Negative Path */}
              {selectedRating && selectedRating <= 3 && !isSubmitted && (
                <form onSubmit={handleComplaintSubmit} className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl space-y-3 text-xs text-left animate-fadeIn">
                  <div className="text-rose-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Нам очень жаль, что возникло недопонимание!</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Напишите, что пошло не так. Это сообщение поступит <strong>лично директору в закрытый Telegram</strong>, мы немедленно исправим ошибку и свяжемся с вами.
                  </p>

                  <textarea
                    rows={2}
                    value={customerComment}
                    onChange={(e) => setCustomerComment(e.target.value)}
                    required
                    placeholder="Что именно вас расстроило?..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ваше имя"
                      className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                    />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+7 999 123-45-67"
                      className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Отправить лично директору
                  </button>
                </form>
              )}

              {isSubmitted && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white">Жалоба успешно передана руководству!</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Негатив перехвачен. Сообщение не попало на карты, а поступило в закрытый Telegram владельца. Администратор уже разбирается в ситуации.
                  </p>
                </div>
              )}

              <div className="text-[10px] text-slate-500 font-mono">
                Защита репутации powered by ReviewBoost
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MANAGER CRM OF COMPLAINTS */}
      {activeSubTab === 'crm' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Журнал перехваченных жалоб</h3>
              <p className="text-xs text-slate-400">Эти отзывы не попали на Яндекс.Карты, а были удержаны внутри</p>
            </div>
            <div className="text-xs text-emerald-400 font-mono font-bold">
              Рейтинг на картах сохранен: 4.9★
            </div>
          </div>

          <div className="p-4 space-y-3">
            {feedbacks.map(fb => (
              <div
                key={fb.id}
                className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex text-amber-400">
                      {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                    </span>
                    <span className="font-semibold text-white">{fb.customerName}</span>
                    <span className="font-mono text-emerald-400 text-[11px]">{fb.phone}</span>
                    <span className="text-slate-500 text-[10px]">· {fb.time}</span>
                  </div>
                  <p className="text-slate-300 italic">«{fb.comment}»</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    fb.status === 'resolved' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    {fb.status === 'resolved' ? 'Урегулировано' : 'Перехвачен негатив'}
                  </span>
                  <button
                    onClick={() => {
                      setFeedbacks(prev => prev.map(f => f.id === fb.id ? { ...f, status: 'resolved' } : f));
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] cursor-pointer"
                  >
                    Позвонить гостю
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PRINTABLE TABLE-TENT */}
      {activeSubTab === 'printQr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Макет тейбл-тента для столов</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Распечатайте этот макет на цветном принтере или в любой типографии (стоимость печати 10 штук — около 400 ₽). Поставьте на столики ресторана или стойку ресепшн.
            </p>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Печать готового тейбл-тента</span>
            </button>
          </div>

          {/* Printable Visual Preview */}
          <div className="bg-white text-slate-950 p-8 rounded-2xl shadow-2xl text-center space-y-4 max-w-sm mx-auto border-4 border-slate-900">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">
              {venueCategory}
            </div>
            <h2 className="text-2xl font-black tracking-tight">{venueName}</h2>
            <p className="text-xs text-slate-600">
              Поделитесь вашим впечатлением! Нам важно мнение каждого гостя.
            </p>

            {/* Simulated QR Code */}
            <div className="w-40 h-40 mx-auto bg-slate-100 border-2 border-slate-900 rounded-xl p-2 flex flex-col items-center justify-center">
              <QrCode className="w-28 h-28 text-slate-900" />
              <div className="text-[9px] font-mono font-bold text-slate-700">ОЦЕНИТЕ НАС ЗА 10 СЕК</div>
            </div>

            <div className="text-[11px] font-semibold text-slate-800">
              Наведите камеру смартфона на QR-код
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
