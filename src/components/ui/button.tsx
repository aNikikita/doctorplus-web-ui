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
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-medical-500 text-white hover:bg-medical-600 focus:ring-medical-500 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-300',
    ghost: 'bg-transparent text-medical-600 hover:bg-medical-50 border border-medical-200 focus:ring-medical-400',
    danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 disabled:bg-gray-400',
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
