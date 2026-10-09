# 📱 MobileRemoteControlBot — BotHub Pro

> **Единый мобильный пульт управления ботами-помощниками для организаций, клиентский биллинг и агентский ИИ-копайлот.**

[![Android Build & Release](https://github.com/pippopil/MobileRemoteControlBot/actions/workflows/build-android-release.yml/badge.svg)](https://github.com/pippopil/MobileRemoteControlBot/actions/workflows/build-android-release.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready%20%26%20Offline-success.svg)](https://github.com/pippopil/MobileRemoteControlBot)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-blue.svg)](https://github.com/pippopil/MobileRemoteControlBot)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🌟 О проекте

**BotHub Pro (MobileRemoteControlBot)** — это современное кроссплатформенное приложение, созданное для агентств и специалистов по автоматизации бизнеса. Оно объединяет:
1. **Управление всеми ботами клиентов в одном окне**: мониторинг диалогов, лидов, статусов работы и подписок.
2. **Готовые решения для реального сектора**: например, предустановленный боевой бот для автосервиса и шиномонтажа (*«Шиномонтаж 24/7»*, тел. `89437653289`), барбершопов, клиник и доставки.
3. **ИИ-ассистент агентства (Copilot)**: внутренний интеллектуальный помощник, который автоматически формирует индивидуальные коммерческие предложения (КП), скрипты продаж для холодных звонков, анализирует клиентскую базу и рассчитывает ROI окупаемости ботов.
4. **Поддержка каналов**:
   - **Telegram** (Bot API / Webhook)
   - **Мессенджер МАКС** (работает в РФ напрямую без необходимости VPN)
   - **WhatsApp Business API**
   - **ВКонтакте (VK Messenger)**
   - **Веб-виджет для сайтов**
5. **Финансовый модуль (MRR / Billing)**: трекинг ежемесячных подписок, контроль сроков продления, формирование счетов и экспорт отчетов.

---

## 🚀 Кроссплатформенность: PWA и Android

### 📲 1. Android приложение (APK)
В репозитории настроен автоматический CI/CD конвейер GitHub Actions (`.github/workflows/build-android-release.yml`).
- **Сборка на каждый push**: при каждом коммите в ветку `main` запускается сборка нативного Android APK.
- **Нумерация сборок**: релизы получают автоматический версионированный тег `v1.0.<build_number>`.
- **Автоматический релиз с описанием**: GitHub Action парсит текст коммита, формирует release notes и прикрепляет готовый APK-файл для скачивания и прямой установки на телефон.

### 🌐 2. PWA (Progressive Web App) для всех платформ
Приложение полностью соответствует стандартам PWA:
- Поддержка установки в один клик на **iOS (iPhone/iPad)**, **macOS**, **Windows** и **Linux**.
- Оффлайн-работа благодаря Service Worker (кэширование критических экранов и локальной базы).
- Встроенные компоненты `PWAInstallButton` и `OfflineIndicator` с понятными пошаговыми подсказками для пользователей.

---

## 🛠 Стек технологий

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion.
- **PWA Engine**: `vite-plugin-pwa`, Workbox, Web App Manifest.
- **Android**: Android SDK 34, Kotlin, AndroidX WebKit, WebViewAssetLoader (безопасное локальное исполнение).
- **Backend / AI Proxy**: Express.js, Node.js, `@google/genai` (Gemini 2.5 Flash / Flash Lite).
- **CI/CD**: GitHub Actions, Gradle 8.5, Automated Release Publisher.

---

## 📦 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/pippopil/MobileRemoteControlBot.git
cd MobileRemoteControlBot
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env` на основе `.env.example`:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Запуск в режиме разработки
```bash
npm run dev
```
Откройте браузер по адресу: `http://localhost:3000`.

### 5. Сборка продакшн веб-версии (PWA)
```bash
npm run build
```

---

## 🤖 Сборка Android приложения вручную

При необходимости собрать Android APK локально:
```bash
# 1. Собрать веб-бандл
npm run build

# 2. Скопировать веб-ресурсы в Android assets
mkdir -p android/app/src/main/assets/public
cp -r dist/* android/app/src/main/assets/public/

# 3. Собрать APK через Gradle
cd android
./gradlew assembleRelease
# или
gradle assembleRelease
```
Готовый файл APK будет находиться в `android/app/build/outputs/apk/release/`.

---

## 🔄 CI/CD & Релизы на GitHub

Каждый раз, когда вы делаете push в репозиторий:
1. Запускается GitHub Action **Android Build & Release**.
2. Проект компилируется с версией `v1.0.${{ github.run_number }}`.
3. В разделе [Releases](https://github.com/pippopil/MobileRemoteControlBot/releases) автоматически создается новый релиз с описанием ваших изменений и прикрепленным APK-файлом.

---

## 📄 Лицензия

MIT License © 2026 Nikolay Abadeev (pippopil)
