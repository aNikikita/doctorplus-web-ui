// ============================================================================
// COMPONENT TEMPLATES - Copy and customize as needed
// ============================================================================

// ============================================================================
// src/components/chat/chat-section.tsx
// ============================================================================
/*
'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { askDoctorPlus, convertFileToBase64, validateImageSize } from '@/lib/api/doctorplus'
import { ChatHeader } from './chat-header'
import { ModeTabs } from './mode-tabs'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { LoadingIndicator } from './loading'
import { ErrorBanner } from './error-banner'
import { ChatMessage, DoctorPlusMode, DoctorPlusRequest } from '@/types/doctorplus'
import { trackWebDoctorPlusRequest, trackWebDoctorPlusResponse } from '@/lib/analytics/posthog'
import { LIMITS } from '@/lib/config'

export function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [mode, setMode] = useState<DoctorPlusMode>('analyses')
  const [error, setError] = useState<string | null>(null)

  const { mutate: send, isPending } = useMutation({
    mutationFn: (payload: Omit<DoctorPlusRequest, 'request_id' | 'conversation_id' | 'client'>) =>
      askDoctorPlus(payload),
    onSuccess: (response) => {
      const msg: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.answer_md,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, msg])
      setError(null)
      trackWebDoctorPlusResponse(mode, false, true, 0)
    },
    onError: (error: Error) => {
      setError(error.message)
      trackWebDoctorPlusResponse(mode, false, false, 0, error.name)
    },
  })

  const handleSubmit = async (payload: any) => {
    // Validate local rate limit
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('doctorplus_request_date')
    let count = parseInt(localStorage.getItem('doctorplus_request_count') || '0')

    if (storedDate !== today) {
      localStorage.setItem('doctorplus_request_date', today)
      localStorage.setItem('doctorplus_request_count', '1')
    } else if (count >= LIMITS.maxRequestsPerDay) {
      setError('Лимит бесплатных запросов исчерпан. Попробуйте позже.')
      return
    } else {
      localStorage.setItem('doctorplus_request_count', String(count + 1))
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: payload.text,
      timestamp: new Date(),
      metadata: { mode, hasImage: !!payload.image_b64 },
    }
    setMessages(prev => [...prev, userMsg])

    trackWebDoctorPlusRequest(mode, true, !!payload.image_b64, '', '')
    send(payload)
  }

  return (
    <section id="chat" className="py-16 bg-gray-50">
      <div className="container-responsive max-w-2xl">
        <div className="card">
          <ChatHeader />
          <ModeTabs mode={mode} onModeChange={setMode} />
          <ChatMessages messages={messages} />
          {isPending && <LoadingIndicator />}
          {error && <ErrorBanner error={error} onClose={() => setError(null)} />}
          <ChatInput
            mode={mode}
            isLoading={isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  )
}
*/

// ============================================================================
// src/components/chat/chat-input.tsx
// ============================================================================
/*
'use client'

import { useState } from 'react'
import { DoctorPlusMode } from '@/types/doctorplus'
import { convertFileToBase64, validateImageSize } from '@/lib/api/doctorplus'
import { LIMITS } from '@/lib/config'

interface ChatInputProps {
  mode: DoctorPlusMode
  isLoading: boolean
  onSubmit: (payload: any) => void
}

export function ChatInput({ mode, isLoading, onSubmit }: ChatInputProps) {
  const [text, setText] = useState('')
  const [sex, setSex] = useState<'male' | 'female' | 'other' | ''>('')
  const [age, setAge] = useState('')
  const [complaint, setComplaint] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imageName, setImageName] = useState('')

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!validateImageSize(file, LIMITS.maxImageSizeBytes)) {
      alert('Файл слишком большой. Максимум 5MB.')
      return
    }

    setImage(file)
    setImageName(file.name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    let image_b64: string | undefined
    if (image) {
      try {
        image_b64 = await convertFileToBase64(image)
      } catch {
        alert('Ошибка при обработке файла')
        return
      }
    }

    const meta = {
      sex: sex || undefined,
      age: age ? parseInt(age) : undefined,
      complaint: complaint || undefined,
    }

    onSubmit({
      mode,
      text,
      image_b64,
      meta,
    })

    setText('')
    setSex('')
    setAge('')
    setComplaint('')
    setImage(null)
    setImageName('')
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4 space-y-4">
      {/* Meta fields */}
      <div className="grid grid-cols-3 gap-3">
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as any)}
          className="input-field"
        >
          <option value="">Пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>

        <input
          type="number"
          min="0"
          max="150"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Возраст"
          className="input-field"
        />

        {mode === 'analyses' && (
          <input
            type="text"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Жалоба"
            className="input-field"
          />
        )}
      </div>

      {/* Main text input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          mode === 'analyses'
            ? 'Вставьте сюда текст из ваших анализов...'
            : 'Опишите, что вас беспокоит...'
        }
        className="input-field h-24"
        disabled={isLoading}
      />

      {/* Image preview */}
      {imageName && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
          <span className="text-sm text-gray-700">{imageName}</span>
          <button
            type="button"
            onClick={() => {
              setImage(null)
              setImageName('')
            }}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Удалить
          </button>
        </div>
      )}

      {/* Image upload (only for analyses mode) */}
      {mode === 'analyses' && (
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={isLoading}
          />
          <span className="block px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded text-center text-sm font-medium cursor-pointer transition disabled:opacity-50">
            📎 Прикрепить фото анализа
          </span>
        </label>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="btn-primary w-full"
      >
        {isLoading ? 'Отправка...' : 'Спросить Доктор+'}
      </button>
    </form>
  )
}
*/

// ============================================================================
// src/app/page.tsx - Homepage structure
// ============================================================================
/*
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorksSection } from '@/components/landing/how-it-works'
import { NotDoingSection } from '@/components/landing/not-doing'
import { TrustSection } from '@/components/landing/trust-section'
import { ForWhomSection } from '@/components/landing/for-whom'
import { ChatSection } from '@/components/chat/chat-section'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorksSection />
        <NotDoingSection />
        <TrustSection />
        <ForWhomSection />
        <ChatSection />
      </main>
      <SiteFooter />
    </>
  )
}
*/

// ============================================================================
// src/app/about/page.tsx - About page
// ============================================================================
/*
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export const metadata = {
  title: 'О Доктор+ — Информационный помощник по здоровью',
  description: 'Узнайте как работает Доктор+, его возможности и ограничения',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-16">
        <div className="container-responsive max-w-3xl">
          <h1>О сервисе Доктор+</h1>
          
          <section className="mt-12">
            <h2>Кто такой Доктор+?</h2>
            <p className="text-lg text-gray-600 mt-4">
              Доктор+ — это чат-ассистент по здоровью. Его цель — объяснять
              медицинскую информацию простым языком и помогать подготовиться к визиту к врачу.
            </p>
          </section>

          <section className="mt-12">
            <h2>Как он работает</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li>Использует LLM (Groq + Llama 3.1)</li>
              <li>Анализирует текст и фото анализов</li>
              <li>Возвращает структурированный ответ в Markdown</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2>Чего он НЕ делает</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li>Не ставит диагнозы</li>
              <li>Не заменяет врача</li>
              <li>Не назначает лекарства</li>
              <li>Не несёт медицинскую ответственность</li>
            </ul>
          </section>

          <section className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-900">🚨 Когда нужна срочная помощь?</h2>
            <p className="text-red-800 mt-4">
              При следующих симптомах немедленно обратитесь в скорую помощь (112 или 03):
            </p>
            <ul className="list-disc list-inside space-y-2 text-red-800 mt-4">
              <li>Боль в груди или затруднение дыхания</li>
              <li>Потеря сознания или обмороки</li>
              <li>Суицидальные мысли или мысли о причинении вреда</li>
              <li>Тяжелые травмы или обильное кровотечение</li>
              <li>Любые другие опасные для жизни симптомы</li>
            </ul>
          </section>

          <section className="mt-12 text-center">
            <a href="/#chat" className="btn-primary">
              Попробовать чат
            </a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
*/

// ============================================================================
// src/app/legal/privacy/page.tsx - Privacy policy
// ============================================================================
/*
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export const metadata = {
  title: 'Политика конфиденциальности Доктор+',
  description: 'Как Доктор+ собирает и использует ваши данные',
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-16">
        <div className="container-responsive max-w-3xl">
          <h1>Политика конфиденциальности Доктор+</h1>

          <section className="mt-12">
            <h2>Какие данные мы собираем</h2>
            <h3 className="mt-6">Предоставляемые вами</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>Содержание ваших чатов (текст, анализы)</li>
              <li>Загруженные фото анализов</li>
              <li>Данные о поле, возрасте, жалобах</li>
            </ul>

            <h3 className="mt-6">Автоматически собираемые</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>IP-адрес и браузер</li>
              <li>Метрики использования (время, статусы)</li>
              <li>Cookies для аналитики</li>
            </ul>
          </section>

          <section className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2>⚠️ ВАЖНО</h2>
            <p className="text-yellow-800 mt-4 font-semibold">
              Не вводите в чат:
            </p>
            <ul className="list-disc list-inside space-y-2 text-yellow-800 mt-3">
              <li>Полные имена, фамилии</li>
              <li>Номера телефонов</li>
              <li>Адреса проживания</li>
              <li>Номера полисов ОМС/ДМС</li>
              <li>Номера паспортов/ID</li>
              <li>Финансовую информацию</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2>Как мы используем данные</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li><strong>Обработка запросов:</strong> Генерация ответов через AI</li>
              <li><strong>Улучшение сервиса:</strong> Анализ ошибок и надежности</li>
              <li><strong>Аналитика:</strong> PostHog (только метаданные, НЕ текст чатов)</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2>Контакты</h2>
            <p className="text-gray-600 mt-4">
              Вопросы о приватности: privacy@doctorplus.example.com
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
*/

export function notImplementedYet() {
  console.log('See templates in this file for remaining components')
}
