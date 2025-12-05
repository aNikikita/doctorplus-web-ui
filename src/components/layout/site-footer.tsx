import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">О сервисе</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-medical-600 transition-colors">
                  О Доктор+
                </Link>
              </li>
              <li>
                <a
                  href="#chat"
                  className="text-gray-600 hover:text-medical-600 transition-colors"
                >
                  Попробовать чат
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Юридическое</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-gray-600 hover:text-medical-600 transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-gray-600 hover:text-medical-600 transition-colors"
                >
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Важно</h3>
            <p className="text-sm text-gray-600">
              При неотложных состояниях звоните в скорую помощь.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            Доктор+ не предназначен для экстренной помощи. При неотложных состояниях немедленно
            обратитесь за медицинской помощью.
          </p>
          <p className="text-xs text-gray-400 text-center mt-4">
            © {new Date().getFullYear()} Доктор+. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
