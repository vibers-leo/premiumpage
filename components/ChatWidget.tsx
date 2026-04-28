'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_TOPICS = [
  '전자카탈로그란?',
  '제작 비용이 궁금해요',
  '제작 기간은?',
  '포트폴리오 보기',
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: Message = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '연결에 문제가 있어요. 잠시 후 다시 시도해주세요.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 챗 패널 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white border border-neutral-200 shadow-2xl flex flex-col"
            style={{ height: '520px' }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
              <div>
                <div className="text-sm font-extrabold">Premium Page AI</div>
                <div className="text-[11px] text-neutral-400">무엇이든 물어보세요</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <div className="bg-neutral-50 p-3 text-sm text-neutral-600 leading-relaxed">
                    안녕하세요! Premium Page AI 비서입니다. 전자카탈로그, 요금, 제작 과정 등 궁금한 점을 물어보세요.
                  </div>
                  <div className="space-y-1.5">
                    {QUICK_TOPICS.map(topic => (
                      <button
                        key={topic}
                        onClick={() => sendMessage(topic)}
                        className="w-full text-left px-3 py-2 text-xs font-medium border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-50 text-neutral-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-50 px-4 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                  </div>
                </div>
              )}
            </div>

            {/* 입력 */}
            <div className="border-t border-neutral-200 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 h-10 px-3 border border-neutral-200 text-sm focus:border-neutral-900 focus:outline-none transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="h-10 w-10 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
