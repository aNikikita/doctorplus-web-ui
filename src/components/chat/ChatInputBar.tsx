'use client'

import React from 'react'

interface ChatInputBarProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

export function ChatInputBar({ value, onChange, onSend, isLoading }: ChatInputBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 mt-2">
      <div className="flex items-end gap-2 rounded-2xl bg-white/90 px-3 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение…"
          disabled={isLoading}
          className="max-h-32 flex-1 resize-none border-none bg-transparent text-[15px] leading-[1.4] text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          className="mb-[2px] inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1A7F72] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="mt-1 text-center text-[11px] text-neutral-400">
        Доктор+ не заменяет врача. При серьёзных симптомах обращайтесь к врачу очно.
      </div>
    </div>
  )
}
