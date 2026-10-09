import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Smartphone } from 'lucide-react';
import { ClientBot } from '../../types';

interface ClientLiveTesterProps {
  client: ClientBot;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const ClientLiveTester: React.FC<ClientLiveTesterProps> = ({ client }) => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: client.greetingMessage,
      time: '09:41'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    client.services[0] ? `Сколько стоит ${client.services[0].name.toLowerCase()}?` : 'Сколько стоят ваши услуги?',
    'Можно ли записаться на завтра?',
    'Где вы находитесь и какой телефон?',
    'Есть ли свободное время сегодня вечером?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMsg = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/test-bot-dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: client.systemPrompt,
          orgName: client.orgName,
          userMessage: text,
          history: messages.slice(-4).map((m) => ({ role: m.sender, content: m.text }))
        })
      });

      const data = await res.json();
      const botReplyText = data.reply || `Спасибо за обращение в «${client.orgName}»! Мы работаем по номеру ${client.phone}.`;

      const botMsg: ChatMsg = {
        id: 'b-' + Date.now(),
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMsg = {
        id: 'b-' + Date.now(),
        sender: 'bot',
        text: `Здравствуйте! Заявка зафиксирована. Наш телефон для связи: ${client.phone}. Записать вас на ближайшее время?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'm1',
        sender: 'bot',
        text: client.greetingMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[520px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Bot Chat Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-xs text-white flex items-center gap-1.5">
              <span>{client.orgName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{client.botUsername || '@bot'}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Ответ &lt; 1 сек</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          title="Сбросить диалог"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/80">
        <div className="text-center my-1">
          <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
            Тестовая сессия помощника для клиента
          </span>
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 max-w-[85%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              <span
                className={`text-[9px] block text-right mt-1 ${
                  m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs mr-auto bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
            <Bot className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>Бот генерирует ответ клиенту...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSendMessage(q)}
            className="text-[10px] whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Напишите боту как клиент..."
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
