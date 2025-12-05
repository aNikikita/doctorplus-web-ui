'use client'

import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-responsive py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-medical-600">
          Доктор+
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/#chat" className="text-sm font-medium hover:text-medical-600 transition">
            Чат
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-medical-600 transition">
            О сервисе
          </Link>
          <Link href="/legal/privacy" className="text-sm font-medium hover:text-medical-600 transition">
            Политика
          </Link>
        </nav>
      </div>
    </header>
  )
}
