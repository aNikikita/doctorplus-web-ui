import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Alert } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Пользовательское соглашение | Доктор+',
  description: 'Условия использования сервиса Доктор+. Прочитайте перед использованием.',
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Пользовательское соглашение</h1>

          <Alert variant="warning" className="mb-8">
            <strong>Дисклеймер:</strong> Доктор+ является ИНФОРМАЦИОННЫМ сервисом и НЕ является
            медицинским изделием. Используя Доктор+, вы соглашаетесь с условиями этого соглашения.
          </Alert>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Определения</h2>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>
                <strong>«Сервис»</strong> — веб-приложение Доктор+, предоставляющее информационную
                помощь по здоровью.
              </li>
              <li>
                <strong>«Пользователь»</strong> — любое лицо, использующее Сервис.
              </li>
              <li>
                <strong>«Контент»</strong> — информация, загруженная Пользователем в Сервис
                (текст, фотографии).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Назначение Сервиса</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Доктор+ предназначен исключительно для информационных целей и помощи в подготовке к
              консультации с врачом. Сервис:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>✗ НЕ ставит диагнозы</li>
              <li>✗ НЕ назначает лечение</li>
              <li>✗ НЕ заменяет профессиональную медицинскую консультацию</li>
              <li>✗ НЕ является медицинским изделием</li>
              <li>✗ НЕ предназначен для экстренной помощи</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Отсутствие медицинской ответственности</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ДОКТОР+ НЕ НЕСЕТ НИКАКОЙ МЕДИЦИНСКОЙ ОТВЕТСТВЕННОСТИ. Информация, предоставленная
              Сервисом:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>
                • Не должна использоваться как замена консультации с квалифицированным медицинским
                специалистом.
              </li>
              <li>
                • Может содержать неточности или быть неполной.
              </li>
              <li>
                • Предоставляется "как есть" без гарантий точности и полноты.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Обязанности Пользователя</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Пользователь обязуется:</p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>
                • Всегда консультироваться с квалифицированным врачом перед принятием медицинских
                решений.
              </li>
              <li>
                • НЕ использовать информацию из Сервиса для самодиагностики или самолечения.
              </li>
              <li>
                • При неотложных состояниях немедленно обратиться в скорую помощь, не ожидая
                ответа от Доктор+.
              </li>
              <li>
                • НЕ вводить персональные данные (ФИО, номера полисов, адреса) в Сервис.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Неотложные состояния</h2>
            <Alert variant="error" title="При следующих состояниях немедленно вызовите скорую помощь:">
              <ul className="space-y-2 ml-4">
                <li>• Острая боль в груди</li>
                <li>• Затруднённое дыхание или одышка</li>
                <li>• Потеря сознания</li>
                <li>• Неконтролируемое кровотечение</li>
                <li>• Признаки инсульта</li>
                <li>• Суицидальные мысли</li>
                <li>• Любые другие неотложные состояния</li>
              </ul>
            </Alert>
            <p className="text-gray-700 leading-relaxed mt-6">
              <strong>
                ДОКТОР+ НЕ ПРЕДНАЗНАЧЕН ДЛЯ ЭКСТРЕННОЙ ПОМОЩИ. ПРИ НЕОТЛОЖНЫХ СОСТОЯНИЯХ НЕМЕДЛЕННО
                ОБРАТИТЕСЬ В СКОРУЮ ПОМОЩЬ.
              </strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Ограничение ответственности</h2>
            <p className="text-gray-700 leading-relaxed">
              В максимальной степени, допускаемой законом, Доктор+ и его создатели НЕ НЕСУТ
              ОТВЕТСТВЕННОСТИ за:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4 mt-4">
              <li>• Любые убытки или ущерб, прямой или косвенный, вызванные использованием Сервиса</li>
              <li>• Неточности или ошибки в информации, предоставленной Сервисом</li>
              <li>• Потерю данных или перерывы в работе Сервиса</li>
              <li>• Решения или действия, принятые на основе информации из Доктор+</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Использование Контента</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Контент, загруженный в Сервис, обрабатывается для предоставления услуги. Мы:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• НЕ сохраняем ваши сообщения в долгосрочном хранилище</li>
              <li>• НЕ используем ваш контент для обучения моделей</li>
              <li>• НЕ продаем и НЕ передаем ваши данные третьим лицам</li>
              <li>• Можем использовать метаданные для улучшения сервиса</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Изменение Сервиса</h2>
            <p className="text-gray-700 leading-relaxed">
              Мы оставляем за собой право изменять, приостанавливать или прекращать Сервис в любое
              время без предварительного уведомления.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Обновления Соглашения</h2>
            <p className="text-gray-700 leading-relaxed">
              Мы можем обновлять это Соглашение в любое время. Продолжение использования Сервиса
              означает ваше согласие с обновленными условиями.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Согласие</h2>
            <Alert variant="info">
              <strong>Используя Доктор+, вы подтверждаете, что:</strong>
              <ul className="mt-3 ml-4 space-y-2">
                <li>• Прочитали это Соглашение</li>
                <li>• Понимаете и согласны со всеми его условиями</li>
                <li>• Согласны нести полную ответственность за использование Сервиса</li>
                <li>
                  • Согласны немедленно обратиться к врачу или в скорую при необходимости
                </li>
              </ul>
            </Alert>
          </section>

          <div className="text-sm text-gray-500 border-t border-gray-200 pt-8">
            <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
