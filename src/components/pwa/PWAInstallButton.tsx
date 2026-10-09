import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle, Apple, Monitor, Info } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guidePlatform, setGuidePlatform] = useState<'ios' | 'android' | 'desktop'>('android');

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow when beforeinstallprompt fired
  if (isInstallable) {
    if (variant === 'compact') {
      return (
        <button
          onClick={install}
          title="Установить PWA на устройство"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition active:scale-95 cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Установить PWA</span>
        </button>
      );
    }

    return (
      <div className={`p-3 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="BotHub Pro" className="w-9 h-9 rounded-lg shadow-sm" />
          <div>
            <div className="text-xs font-bold text-white">Установите BotHub Pro как PWA</div>
            <div className="text-[11px] text-slate-300">Работает оффлайн, быстрый доступ с домашнего экрана</div>
          </div>
        </div>
        <button
          onClick={install}
          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold transition active:scale-95 whitespace-nowrap shadow-sm cursor-pointer"
        >
          Установить
        </button>
      </div>
    );
  }

  // Fallback for iOS or manual browsers: provide guided installation
  return (
    <>
      <button
        onClick={() => {
          setGuidePlatform(isIOS ? 'ios' : 'android');
          setShowGuideModal(true);
        }}
        title="Инструкция по установке PWA"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40 text-xs font-medium transition cursor-pointer ${className}`}
      >
        {isIOS ? (
          <>
            <Apple className="w-3.5 h-3.5 text-slate-300" />
            <span>Установить на iOS</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Установка PWA</span>
          </>
        )}
      </button>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <img src="/icon.svg" alt="BotHub Pro" className="w-7 h-7 rounded-lg" />
                <div>
                  <h3 className="text-sm font-bold text-white">Установка BotHub Pro (PWA)</h3>
                  <p className="text-[11px] text-slate-400">Без App Store / Google Play, моментальный запуск</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl my-3 border border-slate-800/80">
              <button
                onClick={() => setGuidePlatform('android')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  guidePlatform === 'android'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setGuidePlatform('ios')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  guidePlatform === 'ios'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iOS (Safari)</span>
              </button>
              <button
                onClick={() => setGuidePlatform('desktop')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  guidePlatform === 'desktop'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Windows / Mac</span>
              </button>
            </div>

            {/* Content for Android */}
            {guidePlatform === 'android' && (
              <div className="space-y-2.5 text-xs text-slate-300 my-3">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">1</span>
                  <span>Откройте сайт в браузере <strong>Google Chrome</strong> или <strong>Яндекс.Браузер</strong>.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">2</span>
                  <span>Нажмите на меню <strong>три точки (⋮)</strong> в верхнем правом углу браузера.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">3</span>
                  <span>Выберите пункт <strong>«Установить приложение»</strong> или <strong>«Добавить на главный экран»</strong>.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">4</span>
                  <span>Нажмите <strong>«Установить»</strong>. Приложение появится в списке ваших приложений как нативная программа.</span>
                </div>
              </div>
            )}

            {/* Content for iOS */}
            {guidePlatform === 'ios' && (
              <div className="space-y-2.5 text-xs text-slate-300 my-3">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">1</span>
                  <span>Откройте сайт обязательно в браузере <strong>Safari</strong> на iPhone или iPad.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">2</span>
                  <span>Нажмите на значок <strong>«Поделиться»</strong> (квадрат со стрелкой вверх [↑]) в нижней панели Safari.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">3</span>
                  <span>Прокрутите список действий вниз и нажмите <strong>«На экран "Домой"»</strong> (Add to Home Screen).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">4</span>
                  <span>Нажмите <strong>«Добавить»</strong> в правом верхнем углу. Иконка появится на рабочем столе!</span>
                </div>
              </div>
            )}

            {/* Content for Desktop */}
            {guidePlatform === 'desktop' && (
              <div className="space-y-2.5 text-xs text-slate-300 my-3">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">1</span>
                  <span>В браузере <strong>Chrome, Edge, Brave или Яндекс</strong> обратите внимание на адресную строку справа.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">2</span>
                  <span>Нажмите на иконку монитора со стрелочкой <strong>«Установить приложение»</strong>.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">3</span>
                  <span>Или через меню <strong>(⋮) → Сохранить и поделиться → Установить страницу как приложение</strong>.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0">4</span>
                  <span>Приложение откроется в отдельном окне без рамок браузера и закрепится в панели задач / Dock.</span>
                </div>
              </div>
            )}

            {/* Offline features notice */}
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-[11px] text-emerald-300">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>После установки приложение сохраняет оффлайн-доступ к клиентской базе и расчетам.</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              Закрыть инструкцию
            </button>
          </div>
        </div>
      )}
    </>
  );
};
