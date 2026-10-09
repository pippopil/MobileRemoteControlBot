import React, { useState } from 'react';
import {
  Github,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Award,
  Code,
  Briefcase,
  Terminal,
  Send,
  Eye,
  FileText,
  Star,
  CheckCircle2,
  Bug,
  BrainCircuit,
  Zap,
  Smartphone,
  Server,
  Layers,
  Globe
} from 'lucide-react';

export const GithubProfileStudio: React.FC = () => {
  const username = 'pippopil';
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'guide'>('preview');

  // Dynamic customization state
  const roleTitle = 'QA Automation Engineer · Prompt Engineer · Vibe Coding Developer';
  const location = 'Удаленно (Remote) / Готов к релокации';
  const contactEmail = 'wotwg239@gmail.com';
  const contactTelegram = '@pippopil';

  // Grounded in real GitHub repos of pippopil:
  // 1. DiplomQANetology (Kotlin/Java, Android, Espresso, Allure)
  // 2. ajs-Cypress2api & ajs-Puppeteer2 (JavaScript, Cypress, Puppeteer, REST API)
  // 3. aqa2.1.1selenide, aqa2.3Patterns, Aqa2.4Bdd, aqa3.1Docker (Java, Selenide, BDD Cucumber, Page Object, Docker)
  // 4. Modern AI Full-Stack & Vibe Coding (TypeScript, React 19, Gemini AI, Telegram/MAX Bot API)
  const russianReadmeMarkdown = `# Привет, я pippopil 👋
### 🧪 ${roleTitle}
#### Автоматизация тестирования (Mobile & Web & API) · Промпт-инжиниринг · Вайб-кодинг

<p align="left">
  <a href="https://t.me/${contactTelegram.replace('@', '')}">
    <img src="https://img.shields.io/badge/Telegram-Написать_мне-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" />
  </a>
  <a href="mailto:${contactEmail}">
    <img src="https://img.shields.io/badge/Email-Связаться-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <img src="https://img.shields.io/badge/Статус-Открыт_к_офферам-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Обучение-Нетология_QA-blueviolet?style=for-the-badge" alt="Netology QA" />
</p>

---

### 🚀 Профессиональный профиль

Инженер по тестированию ПО (QA) и разработчик с практическим опытом **автоматизации тестирования Mobile, Web и REST API**, а также применения **Prompt Engineering и Вайб-кодинга** для молниеносной сборки качественных сервисов.

Выпускник курса **«Тестировщик ПО / Автоматизация тестирования» (Нетология)**. Умею не просто находить дефекты, а проектировать надежные тест-фреймворки, сокращающие время регресса в 2 раза, и внедрять ИИ-решения с нулевым риском галлюцинаций.

- 📱 **Mobile AQA (Android):** Автоматизация на Kotlin/Java с использованием Android Studio, Espresso, Gradle и Allure Reports.
- 🌐 **Web & API AQA:** Автоматизация сквозных сценариев (E2E) и REST API на JavaScript (Cypress, Puppeteer) и Java (Selenide, JUnit, Cucumber BDD, Page Object Model).
- 🧠 **Prompt Engineering & Vibe Coding:** Проектирование сложных системных промптов под Google Gemini, GPT и Claude. Быстрое создание production-ready веб-приложений и ботов за 24–48 часов без багов.
- 📍 **Локация:** ${location}

---

### 🛠️ Технологический стек & Инструменты

<p align="left">
  <!-- QA & Automation -->
  <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white" />
  <img src="https://img.shields.io/badge/Java_11-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Selenide-2C3E50?style=for-the-badge&logo=selenium&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white" />
  <img src="https://img.shields.io/badge/Allure_Report-FF6F00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cucumber_BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />

  <!-- Modern Web & AI -->
  <img src="https://img.shields.io/badge/Prompt_Engineering-FF6F00?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Telegram_Bot_API-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" />
  <img src="https://img.shields.io/badge/MAX_Bot_API_(max.ru)-0052CC?style=for-the-badge" />
</p>

---

### 📂 Анализ ключевых проектов (GitHub Portfolio)

На основе репозиториев профиля [@pippopil](https://github.com/pippopil):

#### 1. 📱 [DiplomQANetology](https://github.com/pippopil/DiplomQANetology) — Дипломный проект по автоматизации Mobile QA
* **Суть проекта:** Разработка сквозного автоматизированного тестирования для мобильного Android-приложения \`fmh-android\` (хоспис-платформа).
* **Стек:** Kotlin, Java (OpenJDK 11), Android Studio Dolphin, Gradle, Allure Report (v2.20.1).
* **Ключевой результат:** Время прогона ручного регресса составляло **87 минут**. Разработанный набор автотестов сократил время регрессионного прогона до **50 минут** (ускорение релиза почти в 2 раза!).
* **Отчетность:** Генерация отчетов \`allure serve\` с логами, скриншотами и шагами прогона.

#### 2. ⚡ [ajs-Cypress2api](https://github.com/pippopil/ajs-Cypress2api) & [ajs-Puppeteer2](https://github.com/pippopil/ajs-Puppeteer2) — E2E и REST API автоматизация
* **Суть проекта:** Написание тестов для проверки контрактов REST API и сквозных пользовательских сценариев.
* **Стек:** JavaScript, Cypress, Puppeteer, Node.js, Postman.
* **Что сделано:** Валидация ответов сервера, статус-кодов (200/400/500), JSON Schema, перехват сетевых запросов и сквозное UI-тестирование в headless-браузерах.

#### 3. ☕ [aqa2.1.1selenide](https://github.com/pippopil/aqa2.1.1selenide) & [aqa2.3Patterns](https://github.com/pippopil/aqa2.3Patterns) & [Aqa2.4Bdd](https://github.com/pippopil/Aqa2.4Bdd) & [aqa3.1Docker](https://github.com/pippopil/aqa3.1Docker) — Java AQA Framework
* **Суть проекта:** Построение архитектуры автотестов по паттернам проектирования **Page Object Model (POM)**.
* **Стек:** Java 11, Selenide, JUnit, Cucumber (BDD сценарии на языке Gherkin), Docker контейнеризация.
* **Что сделано:** Изоляция локаторов, переиспользуемые компоненты страниц, BDD сценарии для бизнес-логики, запуск в изолированных Docker-контейнерах с интеграцией в CI/CD.

#### 4. 🧠 [FastSaaS Launchpad & LeadFlow AI](https://github.com/pippopil) — Вайб-кодинг & Prompt Engineering (2026)
* **Суть проекта:** Скоростная разработка B2B AI-платформы квалификации лидов и ботов записи под ключ (Telegram + отечественный мессенджер МАКС max.ru без VPN).
* **Стек:** TypeScript, React 19, Vite, Express, Google Gemini AI API, MAX Bot API, Tailwind CSS.
* **Что сделано:** Разработка системных промптов с защитой от галлюцинаций, строгий JSON-вывод под CRM, тестирование 50+ пограничных сценариев пользовательского ввода.

---

### 🧪 Практические навыки тестирования
- **Тест-дизайн:** Эквивалентное разбиение, анализ граничных значений, составление матриц покрытия и таблиц решений.
- **Документация:** Разработка подробных чек-листов, тест-кейсов (Test Cases) и понятных баг-репортов с шагами, логами и приоритетами (Severity/Priority).
- **Виды тестирования:** Функциональное, регрессионное, смоук (Smoke), кроссбраузерное, мобильное тестирование (эмуляторы Android Studio), UI/UX.
- **Инструменты:** Postman, Swagger, Allure, DevTools, Git, Docker, Android Debug Bridge (ADB).

---

### 📊 Статистика активности GitHub

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=pippopil&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117" alt="pippopil stats" height="155" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=pippopil&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117" alt="Top Languages" height="155" />
</p>

---

### 🤝 Готов к сотрудничеству и офферам

Открыт к предложениям:
- **QA Automation Engineer / Инженер по автотестированию** (Kotlin, Java, Cypress, JavaScript, Android, Web, API)
- **QA Engineer (Manual + API)** (функциональное, регресс, Postman, составление тестовой документации)
- **Prompt Engineer / AI-разработчик** (проектирование системных промптов, интеграция LLM, вайб-кодинг)

📫 **Контакты:**
- **Telegram:** [${contactTelegram}](https://t.me/${contactTelegram.replace('@', '')})
- **Email:** [${contactEmail}](mailto:${contactEmail})
- **GitHub:** [@${username}](https://github.com/${username})
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(russianReadmeMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>АНАЛИЗ РЕАЛЬНЫХ РЕПОЗИТОРИЕВ GITHUB @pippopil</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>Резюме для</span>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>github.com/{username}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Резюме составлено на основе ваших <strong>реальных проектов на GitHub</strong>: дипломного Android AQA проекта в Нетологии (<code>DiplomQANetology</code>), Cypress/Puppeteer репозиториев, фреймворков Selenide/BDD на Java и современных разработок на Prompt Engineering и Вайб-кодинге.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Скопировано в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать README.md</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>1. Живой предпросмотр резюме (Как на GitHub)</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'markdown'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>2. Исходный код README.md (Готов к вставке)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white bg-slate-950/70'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3. Инструкция по установке за 60 секунд</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: LIVE GITHUB VISUAL PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* GitHub Canvas Container */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 md:p-8 space-y-6 text-[#c9d1d9] font-sans shadow-2xl">
            {/* Top Greeting */}
            <div className="border-b border-[#21262d] pb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Привет, я pippopil <span className="inline-block animate-wave">👋</span>
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-mono font-semibold">
                    Открыт к офферам
                  </span>
                  <span className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-500/40 rounded-full text-xs font-mono font-semibold">
                    Нетология QA Graduate
                  </span>
                </div>
              </div>

              <div className="text-base text-slate-200 font-medium">
                {roleTitle}
              </div>

              {/* Action Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://t.me/${contactTelegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-[#2CA5E0] text-white rounded text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="px-3 py-1 bg-[#D14836] text-white rounded text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
                >
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-3 text-xs sm:text-sm">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🚀 Профессиональный профиль</span>
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-4xl">
                Инженер по тестированию ПО (QA) и разработчик с практическим опытом <strong>автоматизации тестирования Mobile, Web и REST API</strong>, а также применения <strong>Prompt Engineering и Вайб-кодинга</strong> для молниеносной сборки качественных сервисов.
              </p>
              <p className="text-slate-300 leading-relaxed max-w-4xl">
                Выпускник курса <strong>«Тестировщик ПО / Автоматизация тестирования» (Нетология)</strong>. Умею не просто находить дефекты, а проектировать надежные тест-фреймворки, сокращающие время регресса в 2 раза, и внедрять ИИ-решения с нулевым риском галлюцинаций.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-xl space-y-1">
                <div className="font-bold text-purple-400 flex items-center gap-1.5 text-xs">
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile QA (Android)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Kotlin, Java 11, Android Studio, Espresso, Gradle, Allure. Сокращение регресса с 87 до 50 мин.
                </p>
              </div>

              <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-xl space-y-1">
                <div className="font-bold text-blue-400 flex items-center gap-1.5 text-xs">
                  <Globe className="w-4 h-4" />
                  <span>Web & API QA</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Cypress, Puppeteer, Selenide, JUnit, Postman, Cucumber BDD, Docker, Page Object.
                </p>
              </div>

              <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-xl space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Prompt Engineering</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Системные промпты (Gemini, Claude, GPT), Few-shot, CoT, защита от инъекций, JSON-схемы.
                </p>
              </div>

              <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-xl space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <Zap className="w-4 h-4" />
                  <span>Вайб-кодинг</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Сверхбыстрая сборка production-ready сервисов и ботов (МАКС, Telegram, Web) за 24–48 часов.
                </p>
              </div>
            </div>

            {/* REAL 4 PROJECTS BREAKDOWN */}
            <div className="space-y-4 pt-4 border-t border-[#21262d]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <span>Анализ ваших 4 ключевых проектов (GitHub Portfolio):</span>
              </h3>

              <div className="space-y-3">
                {/* Project 1 */}
                <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <a
                      href="https://github.com/pippopil/DiplomQANetology"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-400 text-sm hover:underline flex items-center gap-1.5"
                    >
                      <span>1. DiplomQANetology (Дипломный проект по автоматизации Mobile QA)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-purple-300 font-mono bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                      Kotlin · Java 11 · Espresso · Allure
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Суть и задача:</strong> Комплексная автоматизация тестирования мобильного Android-приложения <code>fmh-android</code> (хоспис-платформа).
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Главный осязаемый результат:</strong> Время ручного регрессионного прогона составляло <strong>87 минут</strong>. Написанный набор тестов сократил время прогона до <strong>50 минут</strong> (ускорение релиза почти в 2 раза!). Подключены Allure-отчеты с подробной визуализацией прогона.
                  </p>
                </div>

                {/* Project 2 */}
                <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <a
                      href="https://github.com/pippopil/ajs-Cypress2api"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-400 text-sm hover:underline flex items-center gap-1.5"
                    >
                      <span>2. ajs-Cypress2api & ajs-Puppeteer2 (E2E и REST API автоматизация на JS)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-blue-300 font-mono bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                      JavaScript · Cypress · Puppeteer · REST API
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Суть и задача:</strong> Автоматизация проверки клиент-серверного взаимодействия и пользовательских интерфейсов.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Что сделано:</strong> Сквозные E2E сценарии в браузере, валидация статус-кодов, JSON Schema, заголовков и перехват сетевых запросов без задержек.
                  </p>
                </div>

                {/* Project 3 */}
                <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <a
                      href="https://github.com/pippopil/aqa2.1.1selenide"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-400 text-sm hover:underline flex items-center gap-1.5"
                    >
                      <span>3. aqaSelenide, aqaPatterns, AqaBdd & aqaDocker (Java AQA Framework)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-amber-300 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                      Java · Selenide · Page Object · BDD Cucumber · Docker
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Суть и задача:</strong> Проектирование поддерживаемой архитектуры автотестов по паттернам <strong>Page Object Model (POM)</strong>.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Что сделано:</strong> Изоляция элементов интерфейса, BDD-сценарии на языке Gherkin для прозрачности перед бизнесом, контейнеризация запусков в Docker для CI/CD пайплайнов.
                  </p>
                </div>

                {/* Project 4 */}
                <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-emerald-400 text-sm">
                      4. FastSaaS Launchpad & Боты МАКС (Prompt Engineering & Вайб-кодинг 2026)
                    </span>
                    <span className="text-[11px] text-emerald-300 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      TypeScript · React 19 · Gemini LLM · MAX Bot API
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Суть и задача:</strong> Быстрое создание отказоустойчивых веб-приложений и ботов (МАКС max.ru без VPN и Telegram) с AI-квалификацией.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Что сделано:</strong> Проектирование системных промптов без галлюцинаций, строгий JSON API, тестирование 50+ пограничных сценариев пользовательского ввода.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-400">
                Связаться для оффера или проекта: Telegram <strong className="text-emerald-400">{contactTelegram}</strong>
              </div>
              <button
                onClick={handleCopyMarkdown}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer transition-colors"
              >
                Скопировать этот README (на русском)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: RAW MARKDOWN */}
      {activeTab === 'markdown' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Исходный текст README.md на русском (на основе ваших 4 проектов)
              </h3>
              <p className="text-slate-400">Скопируйте и вставьте в репозиторий <code>pippopil/pippopil</code></p>
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMarkdown ? 'Скопировано!' : 'Копировать всё'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed max-h-[460px]">
              {russianReadmeMarkdown}
            </pre>
          </div>
        </div>
      )}

      {/* SUBTAB 3: INSTRUCTIONS */}
      {activeTab === 'guide' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Пошаговая инструкция по активации профиля на GitHub за 60 секунд:</span>
            </h3>
            <p className="text-slate-400 mt-1">
              У GitHub есть функция: если создать репозиторий с точно таким же именем, как ваш логин (<code>pippopil</code>), его README отображается на главной странице вашего профиля!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-sm">Шаг 1: Создание репозитория</span>
              <p className="text-slate-300 leading-relaxed">
                1. Перейдите по ссылке: <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-mono">github.com/new</a>.<br />
                2. В поле <strong>Repository name</strong> введите точь-в-точь: <code>pippopil</code>.<br />
                3. GitHub покажет зеленый баннер: <em>«✨ You found a secret! pippopil/pippopil is a special repository...»</em>.<br />
                4. Обязательно оставьте репозиторий <strong>Public</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-sm">Шаг 2: Добавление README</span>
              <p className="text-slate-300 leading-relaxed">
                1. Поставьте галочку <strong>«Add a README file»</strong>.<br />
                2. Нажмите зеленую кнопку <strong>«Create repository»</strong>.<br />
                3. Откройте созданный файл <code>README.md</code> и нажмите иконку карандаша <strong>Edit</strong>.<br />
                4. Вставьте скопированный русский текст из вкладки <strong>«2. Исходный код README.md»</strong>.<br />
                5. Нажмите зеленую кнопку <strong>«Commit changes»</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
