import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  className?: string
}

export function Alert({ children, variant = 'info', title, className = '' }: AlertProps) {
  const variantClasses = {
    success: 'bg-accent/10 border-l-4 border-accent text-textPrimary',
    error: 'bg-error/10 border-l-4 border-error text-textPrimary',
    warning: 'bg-warning/10 border-l-4 border-warning text-textPrimary',
    info: 'bg-primary/10 border-l-4 border-primary text-textPrimary',
  }

  return (
    <div className={`p-4 rounded-md ${variantClasses[variant]} ${className}`}>
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
