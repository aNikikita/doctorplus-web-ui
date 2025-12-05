import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-medical-500 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button variant="primary" fullWidth>
              На главную
            </Button>
          </Link>
          <Link href="/#chat" className="block">
            <Button variant="secondary" fullWidth>
              К чату
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
