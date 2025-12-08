import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all shadow-soft hover:shadow-soft-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-brand-primary-dark focus:ring-primary disabled:bg-textMuted',
    secondary: 'bg-secondary text-textPrimary hover:bg-brand-secondary-dark focus:ring-secondary disabled:bg-textMuted/30',
    ghost: 'bg-transparent text-primary hover:bg-secondary border border-secondary focus:ring-primary',
    danger: 'bg-error text-white hover:bg-error/80 focus:ring-error disabled:bg-textMuted',
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled || loading ? 'opacity-60 cursor-not-allowed' : ''

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block animate-spin">⋯</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
