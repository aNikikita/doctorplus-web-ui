'use client'

import React, { useState, useEffect, useRef } from 'react'
import { askDoctorPlus, RateLimitError, ValidationError, ServerError } from '@/lib/api/doctorplus'
import { initializeAnalytics, trackWebDoctorPlusRequest, trackWebDoctorPlusResponse, trackWebDoctorPlusLimitReached } from '@/lib/analytics/posthog'
import { LIMITS, CHAT_CONFIG } from '@/lib/config'
import { getOrCreateConversationId } from '@/lib/utils/request-id'
import { DoctorPlusMode } from '@/types/doctorplus'
import type { ChatMessage } from '@/types/chat'
import { ChatMessageBubble } from './ChatMessageBubble'
import { ChatInputBar } from './ChatInputBar'
import { TypingBubble } from './TypingBubble'

export function ChatSection() {
  const [mode] = useState<DoctorPlusMode>('symptoms') // Скрыто от пользователя, можно расширить
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [requestsToday, setRequestsToday] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize analytics and check rate limit on mount
  useEffect(() => {
    initializeAnalytics()
    checkRateLimit()
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const checkRateLimit = () => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem(CHAT_CONFIG.requestDateKey)
    const storedCount = localStorage.getItem(CHAT_CONFIG.requestCountKey)

    if (storedDate !== today) {
      localStorage.setItem(CHAT_CONFIG.requestDateKey, today)
      localStorage.setItem(CHAT_CONFIG.requestCountKey, '0')
      setRequestsToday(0)
      setLimitReached(false)
    } else {
      const count = parseInt(storedCount || '0', 10)
      setRequestsToday(count)
      setLimitReached(count >= LIMITS.maxRequestsPerDay)
    }
  }

  const incrementRequestCount = () => {
    const count = requestsToday + 1
    localStorage.setItem(CHAT_CONFIG.requestCountKey, count.toString())
    setRequestsToday(count)
    if (count >= LIMITS.maxRequestsPerDay) {
      setLimitReached(true)
    }
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    if (limitReached) {
      setErrorText('Лимит бесплатных запросов исчерпан. Попробуйте позже.')
      trackWebDoctorPlusLimitReached('local')
      return
    }

    setErrorText(null)

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const startTime = Date.now()
    trackWebDoctorPlusRequest(mode, !!trimmed, false, getOrCreateConversationId(), '')

    try {
      const response = await askDoctorPlus({
        mode,
        text: trimmed,
        image_b64: null,
        meta: undefined,
      })

      const duration = Date.now() - startTime
      trackWebDoctorPlusResponse(mode, false, true, duration)
      incrementRequestCount()

      const doctorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'doctor',
        content: response.answer_md,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, doctorMessage])
    } catch (err) {
      const duration = Date.now() - startTime
      let errorType = 'unknown'
      let errorMessage = 'Не удалось получить ответ. Попробуйте ещё раз.'

      if (err instanceof RateLimitError) {
        errorType = 'rate_limit'
        errorMessage = 'Лимит запросов на сервере исчерпан. Попробуйте позже.'
        trackWebDoctorPlusLimitReached('backend')
      } else if (err instanceof ValidationError) {
        errorType = 'validation'
        errorMessage = err.message || 'Некорректные данные. Проверьте ввод.'
      } else if (err instanceof ServerError) {
        errorType = 'server'
        errorMessage = 'Сервис временно недоступен. Попробуйте позже.'
      }

      trackWebDoctorPlusResponse(mode, false, false, duration, errorType)
      setErrorText(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="flex h-full min-h-[100dvh] w-full justify-center bg-[#f5f5f7]">
      <div className="flex h-full w-full max-w-xl flex-col px-3 pb-3 pt-2">
        <div className="flex-1 overflow-y-auto pb-4">
          {messages.length === 0 ? (
            <div className="mt-24 flex flex-col items-center justify-center text-center">
              <h1 className="text-xl font-semibold text-neutral-800">
                Чем вам помочь?
              </h1>
              <p className="mt-2 max-w-xs text-sm text-neutral-500">
                Опишите симптомы или прикрепите фото анализов — Доктор+ объяснит простыми словами.
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-wide text-emerald-600">
                DEBUG: Doctor+ iOS chat v1
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pb-4">
              {messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <TypingBubble />}
              {errorText && (
                <div className="mt-2 self-center rounded-full bg-red-50 px-4 py-1 text-xs text-red-600">
                  {errorText}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
