import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Textarea({ label, error, helperText, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          px-4 py-2.5 border border-gray-300 rounded-lg resize-none
          focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent
          transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed
          placeholder:text-gray-400
          ${error ? 'border-error-500 focus:ring-error-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-error-600">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  )
}
