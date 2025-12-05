'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-error-500 mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Что-то пошло не так</h1>
        <p className="text-gray-600 mb-8">
          Произошла неожиданная ошибка. Пожалуйста, попробуйте еще раз.
        </p>
        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={() => reset()}>
            Попробовать снова
          </Button>
          <Link href="/" className="block">
            <Button variant="secondary" fullWidth>
              На главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
