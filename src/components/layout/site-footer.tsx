import React from 'react'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-textPrimary mb-4">О сервисе</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-textSecondary hover:text-primary transition-colors">
                  О Доктор+
                </Link>
              </li>
              <li>
                <a
                  href="#chat"
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  Попробовать чат
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-textPrimary mb-4">Юридическое</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-textPrimary mb-4">Важно</h3>
            <p className="text-sm text-textSecondary">
              При неотложных состояниях звоните в скорую помощь.
            </p>
          </div>
        </div>

        <div className="border-t border-secondary pt-8">
          <p className="text-sm text-textMuted text-center">
            Доктор+ не предназначен для экстренной помощи. При неотложных состояниях немедленно
            обратитесь за медицинской помощью.
          </p>
          <p className="text-xs text-textMuted text-center mt-4">
            © {new Date().getFullYear()} Доктор+. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
