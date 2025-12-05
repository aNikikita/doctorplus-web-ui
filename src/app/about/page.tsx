import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'О Доктор+ | Информационный помощник по здоровью',
  description: 'Узнайте больше о Доктор+, как он работает и чего он не делает.',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">О сервисе Доктор+</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Кто такой Доктор+</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Доктор+ — это чат-ассистент по здоровью, созданный для того, чтобы помогать людям
              лучше понимать медицинскую информацию и подготавливаться к визитам к врачу.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Его цель — объяснять медицинскую информацию простым языком и помогать пациентам
              структурировать свои вопросы для врача. Это не замена медицинской консультации, а
              информационный помощник.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Как он работает</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Использует языковую модель Groq + Llama 3.1 для анализа текста</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Может анализировать фотографии анализов и результатов тестов</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Возвращает структурированные ответы в формате markdown</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Помнит контекст разговора в рамках одной сессии</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Чего он НЕ делает</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-error-500">✗</span>
                <span>
                  <strong>Не ставит диагнозы</strong> — не может определить болезнь на основе
                  симптомов
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-error-500">✗</span>
                <span>
                  <strong>Не заменяет врача</strong> — является дополнением, а не альтернативой
                  медицинской консультации
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-error-500">✗</span>
                <span>
                  <strong>Не назначает лечение</strong> — не может рекомендовать лекарства или
                  процедуры
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-error-500">✗</span>
                <span>
                  <strong>Не знает вашу историю болезни</strong> — каждый разговор начинается с
                  нуля
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Когда нужно срочно к врачу</h2>
            <Alert variant="error" title="Незамедлительно обратитесь за медицинской помощью, если:">
              <ul className="space-y-2">
                <li>• Острая боль в груди или давление в груди</li>
                <li>• Затруднённое дыхание или одышка в покое</li>
                <li>• Потеря сознания или обмороки</li>
                <li>• Неконтролируемое кровотечение</li>
                <li>• Признаки инсульта (онемение, слабость в одной половине тела)</li>
                <li>• Сильная головная боль, не проходящая медикаментами</li>
                <li>• Судороги</li>
                <li>• Суицидальные мысли или попытки самоповреждения</li>
                <li>• Любые другие состояния, требующие неотложной помощи</li>
              </ul>
            </Alert>
            <p className="text-gray-700 mt-6">
              <strong>При наличии таких симптомов не используйте Доктор+ вместо скорой помощи. Немедленно
              звоните в скорую помощь (103, 112 в России).</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Конфиденциальность</h2>
            <p className="text-gray-700 mb-4">
              Мы серьёзно относимся к приватности. Вот что вы должны знать:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Не сохраняем содержание ваших сообщений</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Не требуем регистрацию и личные данные</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Не отслеживаем идентичные вас по IP</span>
              </li>
              <li className="flex gap-3">
                <span className="text-medical-500">✓</span>
                <span>Не вводите ФИО, номера полисов, адреса и другие личные данные</span>
              </li>
            </ul>
          </section>

          <section className="bg-medical-50 border border-medical-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Готовы попробовать?</h2>
            <p className="text-gray-700 mb-6">
              Начните использовать Доктор+ для анализа результатов и подготовки к визиту к врачу.
            </p>
            <Link href="/#chat">
              <Button variant="primary" size="lg">
                Начать чат
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
