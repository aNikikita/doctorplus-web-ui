'use client'

import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Alert } from '@/components/ui/alert'
import { askDoctorPlus, RateLimitError, ValidationError, ServerError } from '@/lib/api/doctorplus'
import { initializeAnalytics, trackWebDoctorPlusRequest, trackWebDoctorPlusResponse, trackWebDoctorPlusLimitReached } from '@/lib/analytics/posthog'
import { LIMITS, CHAT_CONFIG } from '@/lib/config'
import { getOrCreateConversationId, clearConversationId } from '@/lib/utils/request-id'
import { ChatMessage, DoctorPlusMode } from '@/types/doctorplus'

export function ChatSection() {
  const [mode, setMode] = useState<DoctorPlusMode>('symptoms')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [text, setText] = useState('')
  const [sex, setSex] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [complaint, setComplaint] = useState('')
  const [temperature, setTemperature] = useState('')
  const [pressure, setPressure] = useState('')
  const [symptomDuration, setSymptomDuration] = useState('')
  const [chronic, setChronic] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    if (file.size > LIMITS.maxImageSizeBytes) {
      setError(`Файл слишком большой. Максимум ${LIMITS.maxImageSizeBytes / 1024 / 1024}MB.`)
      return
    }

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async () => {
      if (limitReached) {
        const error = new Error('Лимит бесплатных запросов исчерпан. Попробуйте позже.')
        trackWebDoctorPlusLimitReached('local')
        throw error
      }

      if (!text.trim()) {
        throw new Error('Пожалуйста, введите текст перед отправкой.')
      }

      let imageBase64: string | null = null
      if (selectedFile && mode === 'analyses') {
        const reader = new FileReader()
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string
            const base64 = result.includes(',') ? result.split(',')[1] : result
            resolve(base64)
          }
          reader.onerror = reject
          reader.readAsDataURL(selectedFile)
        })
      }

      const startTime = Date.now()
      trackWebDoctorPlusRequest(mode, !!text, !!imageBase64, getOrCreateConversationId(), '')

      try {
        const response = await askDoctorPlus({
          mode,
          text,
          image_b64: imageBase64,
          meta: {
            sex: sex ? (sex as 'male' | 'female' | 'other') : undefined,
            age: age ? parseInt(age, 10) : undefined,
            complaint: complaint || undefined,
            extra:
              mode === 'symptoms'
                ? [temperature, pressure, symptomDuration, chronic].filter(Boolean).join('; ') || undefined
                : undefined,
          },
        })

        const duration = Date.now() - startTime
        trackWebDoctorPlusResponse(mode, !!imageBase64, true, duration)
        incrementRequestCount()

        return response.answer_md
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

        trackWebDoctorPlusResponse(mode, !!imageBase64, false, duration, errorType)
        throw new Error(errorMessage)
      }
    },
    onSuccess: (answer) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: new Date(),
        metadata: { mode, hasImage: !!selectedFile },
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setText('')
      setSelectedFile(null)
      setImagePreview(null)
      setError(null)
    },
    onError: (err) => {
      setError((err as Error).message)
    },
  })

  const handleClearChat = () => {
    setMessages([])
    clearConversationId()
    setError(null)
    setText('')
    setSelectedFile(null)
    setImagePreview(null)
  }

  const sexOptions = [
    { value: '', label: 'Не указано' },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'other', label: 'Другое' },
  ]

  const tabs = [
    {
      id: 'symptoms',
      label: 'Симптомы',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Пол" value={sex} onChange={(e) => setSex(e.target.value)} options={sexOptions} />
            <Input
              label="Возраст"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ваш возраст"
            />
          </div>

          <Textarea
            label="Что вас беспокоит?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Опишите ваши симптомы..."
            rows={4}
            disabled={isPending}
          />

          <details className="border border-gray-300 rounded-lg p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              Дополнительная информация (опционально)
            </summary>
            <div className="mt-4 space-y-3">
              <Input
                label="Температура (°C)"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="37.5"
                step="0.1"
              />
              <Input
                label="Давление (мм рт.ст.)"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                placeholder="120/80"
              />
              <Input
                label="Длительность (например, 3 дня)"
                value={symptomDuration}
                onChange={(e) => setSymptomDuration(e.target.value)}
                placeholder="3 дня"
              />
              <Textarea
                label="Хронические заболевания"
                value={chronic}
                onChange={(e) => setChronic(e.target.value)}
                placeholder="Диабет, гипертония и т.п."
                rows={2}
              />
            </div>
          </details>
        </div>
      ),
    },
    {
      id: 'analyses',
      label: 'Анализы',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Пол" value={sex} onChange={(e) => setSex(e.target.value)} options={sexOptions} />
            <Input
              label="Возраст"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ваш возраст"
            />
          </div>

          <Input
            label="Зачем сдавали анализ / жалоба"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Например: плохое самочувствие, контроль при диабете"
          />

          <Textarea
            label="Текст анализа"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Вставьте сюда текст из ваших анализов..."
            rows={5}
            disabled={isPending}
          />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label className="cursor-pointer">
              <div className="text-center">
                <div className="text-3xl mb-2">📷</div>
                <p className="font-medium text-gray-900">Прикрепить фото анализа</p>
                <p className="text-sm text-gray-500 mt-1">или перетащите файл сюда</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg mx-auto"
              />
              <button
                onClick={() => {
                  setSelectedFile(null)
                  setImagePreview(null)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <section id="chat" className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-medical-500 to-medical-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Чат Доктор+</h2>
            <p className="text-medical-100">Информационный помощник, не врач. Всегда консультируйтесь с врачом.</p>
          </div>

          {/* Messages */}
          <div className="p-6 bg-gray-50 min-h-96 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg mb-2">👋</p>
                <p>Здравствуйте! Как я могу вам помочь?</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-medical-500 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      {msg.type === 'assistant' ? (
                        <ReactMarkdown className="prose prose-sm max-w-none">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Mode Tabs and Form */}
          <div className="p-6 border-t border-gray-200">
            {error && (
              <Alert variant="error" className="mb-4">
                {error}
              </Alert>
            )}

            {limitReached && (
              <Alert variant="warning" className="mb-4">
                Лимит бесплатных запросов исчерпан. Попробуйте позже.
              </Alert>
            )}

            {requestsToday > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                Запросов сегодня: {requestsToday}/{LIMITS.maxRequestsPerDay}
              </p>
            )}

            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200 mb-4">
                <button
                  onClick={() => setMode('symptoms')}
                  className={`
                    px-4 py-2.5 font-medium text-sm border-b-2 transition-colors
                    ${
                      mode === 'symptoms'
                        ? 'border-medical-500 text-medical-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  Симптомы
                </button>
                <button
                  onClick={() => setMode('analyses')}
                  className={`
                    px-4 py-2.5 font-medium text-sm border-b-2 transition-colors
                    ${
                      mode === 'analyses'
                        ? 'border-medical-500 text-medical-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  Анализы
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {mode === 'symptoms'
                ? tabs[0].content
                : tabs[1].content}

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => sendMessage()}
                  disabled={isPending || limitReached || !text.trim()}
                  loading={isPending}
                >
                  {isPending ? 'Доктор+ думает...' : 'Спросить Доктор+'}
                </Button>
                {messages.length > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handleClearChat}
                    disabled={isPending}
                  >
                    Новый диалог
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
