'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownMessageProps {
  content: string
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none 
        prose-p:my-1 prose-p:leading-[1.5]
        prose-headings:my-2 prose-headings:font-semibold
        prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
        prose-ul:my-1 prose-ul:pl-4
        prose-ol:my-1 prose-ol:pl-4
        prose-li:my-0.5
        prose-strong:font-semibold
        prose-a:text-[#1A7F72] prose-a:underline
        text-neutral-900"
    >
      {content}
    </ReactMarkdown>
  )
}
