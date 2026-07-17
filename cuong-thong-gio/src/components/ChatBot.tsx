/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const API_URL = import.meta.env.VITE_NOTIONCHAT_URL || '/api/chat/v1';
const API_KEY = import.meta.env.VITE_NOTIONCHAT_API_KEY || 'sk-notionchat';
const MODEL = import.meta.env.VITE_NOTIONCHAT_MODEL || 'Gemini 3.5 Flash';
const STORAGE_KEY = 'ctg_chat_history';

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [
    {
      id: generateId(),
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI của Cường Thông Gió. Tôi có thể giúp bạn tư vấn về quạt công nghiệp, hệ thống thông gió, ống gió, lọc bụi nhà xưởng tại Đà Nẵng. Bạn cần hỗ trợ gì?',
      timestamp: Date.now(),
    },
  ];
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch { /* ignore */ }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = updated
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(`${API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          stream: false,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời lúc này.';

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };

      const finalMessages = [...updated, assistantMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối';
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Xin lỗi, có lỗi xảy ra: ${msg}. Vui lòng thử lại hoặc liên hệ hotline 0905 001 224.`,
        timestamp: Date.now(),
      };
      const finalMessages = [...updated, errorMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    const welcome: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI của Cường Thông Gió. Tôi có thể giúp bạn tư vấn về quạt công nghiệp, hệ thống thông gió, ống gió, lọc bụi nhà xưởng tại Đà Nẵng. Bạn cần hỗ trợ gì?',
      timestamp: Date.now(),
    };
    setMessages([welcome]);
    saveHistory([welcome]);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-[96px] right-6 z-[9991] w-14 h-14 rounded-full bg-industrial-black text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
        title={isOpen ? 'Đóng chat' : 'Chat với AI'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-[160px] right-6 z-[9992] w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[520px]">
          {/* Header */}
          <div className="bg-industrial-black text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  Trợ lý AI
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <div className="text-[11px] text-white/60 font-medium">Cường Thông Gió</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearHistory}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors text-[10px] font-medium"
                title="Xóa lịch sử"
              >
                Xóa
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-industrial-blue/10 text-industrial-blue'
                      : 'bg-gray-100 text-industrial-black'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed font-medium whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-industrial-black text-white'
                      : 'bg-gray-50 text-industrial-black'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-industrial-black" />
                </div>
                <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-industrial-black" />
                  <span className="text-[13px] text-gray-500 font-medium">Đang trả lời...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                className="flex-1 bg-gray-50 border-0 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-industrial-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-industrial-black/10"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-industrial-black text-white flex items-center justify-center shrink-0 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Gửi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
