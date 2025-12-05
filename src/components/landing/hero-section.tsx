'use client'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  const handleStartChat = () => {
    const chatElement = document.getElementById('chat')
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' })
      // Focus the first input in the chat section
      setTimeout(() => {
        const input = chatElement.querySelector('textarea, input')
        if (input) (input as HTMLInputElement).focus()
      }, 500)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-medical-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
            β-версия
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Доктор+ — информационный помощник по здоровью
        </h1>

        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Помогает понять анализы и подготовиться к визиту к врачу. Не врач.
        </p>

        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-warning-800">
            ⚠️ Доктор+ не ставит диагнозы и не назначает лечение. Не используйте ответы для
            самодиагностики.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleStartChat}
          className="mb-4"
        >
          Начать чат
        </Button>

        <p className="text-sm text-gray-500">Абсолютно бесплатно, без регистрации</p>
      </div>
    </section>
  )
}
