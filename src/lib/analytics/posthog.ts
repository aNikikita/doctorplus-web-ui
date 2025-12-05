import posthog from 'posthog-js'
import { ANALYTICS_CONFIG } from '@/lib/config'
import { DoctorPlusMode } from '@/types/doctorplus'

let initialized = false

export function initializeAnalytics(): void {
  if (initialized || typeof window === 'undefined') return
  if (!ANALYTICS_CONFIG.posthogKey) return

  posthog.init(ANALYTICS_CONFIG.posthogKey, {
    api_host: ANALYTICS_CONFIG.posthogHost,
    loaded: (_ph) => {
      // PostHog loaded
    },
  })

  initialized = true
}

export function trackWebDoctorPlusRequest(
  mode: DoctorPlusMode,
  hasText: boolean,
  hasImage: boolean,
  conversationId: string,
  requestId: string
): void {
  if (!initialized) return

  posthog.capture('web_doctorplus_request', {
    mode,
    hasText,
    hasImage,
    conversationId,
    requestId,
    timestamp: new Date().toISOString(),
  })
}

export function trackWebDoctorPlusResponse(
  mode: DoctorPlusMode,
  hasImage: boolean,
  success: boolean,
  durationMs: number,
  errorType?: string
): void {
  if (!initialized) return

  posthog.capture('web_doctorplus_response', {
    mode,
    hasImage,
    success,
    durationMs,
    errorType,
    timestamp: new Date().toISOString(),
  })
}

export function trackWebDoctorPlusLimitReached(source: 'local' | 'backend'): void {
  if (!initialized) return

  posthog.capture('web_doctorplus_limit_reached', {
    source,
    timestamp: new Date().toISOString(),
  })
}

export function trackPageView(path: string, title: string): void {
  if (!initialized) return

  posthog.capture('$pageview', {
    path,
    title,
  })
}
