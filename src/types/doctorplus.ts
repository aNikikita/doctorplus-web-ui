export type DoctorPlusMode = 'analyses' | 'symptoms'

export interface DoctorPlusMeta {
  sex?: 'male' | 'female' | 'other'
  age?: number
  complaint?: string
  extra?: string
}

export interface DoctorPlusRequest {
  mode: DoctorPlusMode
  text: string
  image_b64?: string | null
  meta?: DoctorPlusMeta
  conversation_id?: string
  client?: 'web'
  request_id?: string
}

export interface DoctorPlusUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface DoctorPlusResponse {
  answer_md: string
  usage?: DoctorPlusUsage
}

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant' | 'error' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    mode?: DoctorPlusMode
    hasImage?: boolean
    requestId?: string
  }
}
