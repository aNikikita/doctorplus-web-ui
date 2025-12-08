'use client'

import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary bg-white/95 backdrop-blur shadow-soft">
      <div className="container-responsive py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          Доктор+
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/#chat" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
            Чат
          </Link>
          <Link href="/about" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
            О сервисе
          </Link>
          <Link href="/legal/privacy" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
            Политика
          </Link>
        </nav>
      </div>
    </header>
  )
}
