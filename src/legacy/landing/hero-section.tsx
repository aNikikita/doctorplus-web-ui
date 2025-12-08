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
    <section className="section-padding px-4 sm:px-6 bg-gradient-to-b from-background to-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-sm font-medium">
            β-версия
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-textPrimary mb-6 leading-tight">
          Доктор+ — информационный помощник по здоровью
        </h1>

        <p className="text-xl text-textSecondary mb-6 max-w-2xl mx-auto">
          Помогает понять анализы и подготовиться к визиту к врачу. Не врач.
        </p>

        <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-textPrimary">
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

        <p className="text-sm text-textMuted">Абсолютно бесплатно, без регистрации</p>
      </div>
    </section>
  )
}
