import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Alert } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Доктор+',
  description: 'Политика конфиденциальности Доктор+. Узнайте, как мы обрабатываем ваши данные.',
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Введение</h2>
            <p className="text-gray-700 leading-relaxed">
              Доктор+ уважает ваши права на приватность. Эта политика конфиденциальности описывает,
              как мы собираем, используем, раскрываем и защищаем информацию, которую вы предоставляете
              при использовании нашего веб-сайта и сервиса.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Информация, которую мы собираем</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Мы собираем информацию, которую вы предоставляете при использовании нашего сервиса:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Содержимое ваших сообщений к Доктор+</li>
              <li>• Загружаемые фотографии анализов</li>
              <li>• Информацию о поле, возрасте и жалобах (опционально)</li>
              <li>• IP-адрес вашего устройства</li>
              <li>• Информацию о браузере и устройстве</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Как мы используем информацию</h2>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Для предоставления и улучшения нашего сервиса</li>
              <li>• Для анализа ошибок и отладки</li>
              <li>• Для соблюдения ограничений на скорость запросов</li>
              <li>• Для аналитики (только метаданные, без содержимого сообщений)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Аналитика</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Мы используем PostHog для отслеживания использования нашего сервиса. Однако:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>✓ Мы НЕ отправляем содержимое ваших сообщений</li>
              <li>✓ Мы НЕ отправляем персональные данные (ФИО, номера полисов и т.п.)</li>
              <li>✓ Мы отправляем только метаданные (тип запроса, успех/ошибка, время ответа)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Хранение данных</h2>
            <p className="text-gray-700 leading-relaxed">
              Содержимое ваших сообщений обрабатывается нашим бэкэнд-сервером (FastAPI) и не
              сохраняется в долгосрочном хранилище. Логи сервера могут содержать IP-адрес и
              метаданные запроса и хранятся в соответствии с политикой нашего сервера.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Безопасность</h2>
            <p className="text-gray-700 leading-relaxed">
              Мы используем HTTPS для шифрования данных при передаче между вашим браузером и нашими
              серверами. Однако нет 100% гарантии безопасности при передаче данных в интернете.
            </p>
          </section>

          <Alert variant="warning" className="mb-8">
            <strong>Важно:</strong> Не вводите в чат чувствительные персональные данные, включая:
            <ul className="mt-2 ml-4 space-y-1">
              <li>• ФИО</li>
              <li>• Номера полисов ОМС или других документов</li>
              <li>• Адреса проживания</li>
              <li>• Номера телефонов</li>
              <li>• Номера банковских счетов</li>
            </ul>
          </Alert>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Ваши права</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              У вас есть право:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Использовать сервис анонимно, без регистрации</li>
              <li>• Удалить историю своих сообщений локально (нажав кнопку "Новый диалог")</li>
              <li>• Связаться с нами по вопросам конфиденциальности</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Изменения политики</h2>
            <p className="text-gray-700 leading-relaxed">
              Мы можем обновлять эту политику конфиденциальности время от времени. Изменения будут
              опубликованы на этой странице.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Контакты</h2>
            <p className="text-gray-700 leading-relaxed">
              Если у вас есть вопросы о нашей политике конфиденциальности, пожалуйста, свяжитесь
              с нами через форму обратной связи на нашем сайте.
            </p>
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
