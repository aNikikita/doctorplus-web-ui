export type ChatSender = 'user' | 'doctor'

export interface ChatMessage {
  id: string
  sender: ChatSender
  content: string // markdown или plain text
  createdAt: string // ISO-строка
}
