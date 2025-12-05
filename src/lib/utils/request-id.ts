export function generateRequestId(): string {
  if (typeof window !== 'undefined') {
    // Client-side: generate random ID
    return `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  return `web_${Date.now()}`
}

export function getOrCreateConversationId(): string {
  if (typeof window !== 'undefined') {
    const key = 'doctorplus_conversation_id'
    const stored = sessionStorage.getItem(key)
    if (stored) return stored
    
    const conversationId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    sessionStorage.setItem(key, conversationId)
    return conversationId
  }
  return 'unknown'
}

export function clearConversationId(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('doctorplus_conversation_id')
  }
}
