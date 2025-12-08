'use client'

import React from 'react'

export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[13px] text-neutral-500 shadow-sm">
        <span>Доктор+ печатает</span>
        <span className="flex gap-[2px]">
          <span className="h-[4px] w-[4px] animate-bounce rounded-full bg-neutral-400" />
          <span className="h-[4px] w-[4px] animate-bounce rounded-full bg-neutral-400 delay-75" />
          <span className="h-[4px] w-[4px] animate-bounce rounded-full bg-neutral-400 delay-150" />
        </span>
      </div>
    </div>
  )
}
