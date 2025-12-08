'use client'

import React from 'react'
import type { ChatMessage } from '@/types/chat'
import { MarkdownMessage } from './MarkdownMessage'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[15px] leading-[1.4] ${
          isUser
            ? 'rounded-br-sm bg-[#1A7F72] text-white'
            : 'rounded-bl-sm bg-white text-neutral-900 shadow-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <MarkdownMessage content={message.content} />
        )}
      </div>
    </div>
  )
}
