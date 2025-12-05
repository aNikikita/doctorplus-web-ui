import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  className?: string
}

export function Alert({ children, variant = 'info', title, className = '' }: AlertProps) {
  const variantClasses = {
    success: 'bg-accent-50 border-l-4 border-accent-500 text-accent-900',
    error: 'bg-error-50 border-l-4 border-error-500 text-error-900',
    warning: 'bg-warning-50 border-l-4 border-warning-500 text-warning-900',
    info: 'bg-medical-50 border-l-4 border-medical-500 text-medical-900',
  }

  return (
    <div className={`p-4 rounded-md ${variantClasses[variant]} ${className}`}>
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
