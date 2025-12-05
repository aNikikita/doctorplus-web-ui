export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
export const API_ENDPOINT = `${API_BASE_URL}/api/doctorplus`

export const SITE_CONFIG = {
  name: 'Доктор+',
  title: 'Доктор+ — информационный помощник по здоровью',
  description: 'Доктор+ помогает понять результаты анализов и структурировать симптомы перед визитом к врачу. Не ставит диагнозы, не назначает лечение. Информационный помощник по здоровью.',
  url: 'https://doctorplus.example.com',
  ogImage: 'https://doctorplus.example.com/og-image.png',
  author: 'Doctor+ Team',
}

export const ANALYTICS_CONFIG = {
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
}

export const LIMITS = {
  maxRequestsPerDay: 20,
  maxImageSizeBytes: 5 * 1024 * 1024, // 5MB
}

export const CHAT_CONFIG = {
  modes: ['analyses', 'symptoms'] as const,
  loadingDuration: 30000, // 30 seconds
  conversationIdKey: 'doctorplus_conversation_id',
  requestDateKey: 'doctorplus_request_date',
  requestCountKey: 'doctorplus_request_count',
}
