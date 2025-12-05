'use client'

import { ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTabId?: string
  className?: string
}

export function Tabs({ tabs, defaultTabId, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)

  return (
    <div className={className}>
      <div className="flex gap-2 border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2.5 font-medium text-sm border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? 'border-medical-500 text-medical-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
