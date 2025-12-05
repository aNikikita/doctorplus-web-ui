import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options?: Array<{ value: string; label: string }>
}

export function Select({
  label,
  error,
  helperText,
  options = [],
  className = '',
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          px-4 py-2.5 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent
          transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed
          bg-white cursor-pointer
          ${error ? 'border-error-500 focus:ring-error-500' : ''}
          ${className}
        `}
        {...props}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          children
        )}
      </select>
      {error && <p className="text-sm text-error-600">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  )
}
