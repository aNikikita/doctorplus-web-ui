import { API_ENDPOINT } from '@/lib/config'
import { DoctorPlusRequest, DoctorPlusResponse } from '@/types/doctorplus'
import { generateRequestId, getOrCreateConversationId } from '@/lib/utils/request-id'

export interface AskDoctorPlusOptions {
  onProgress?: (progress: string) => void
}

export async function askDoctorPlus(
  payload: Omit<DoctorPlusRequest, 'request_id' | 'conversation_id' | 'client'>,
  _options?: AskDoctorPlusOptions
): Promise<DoctorPlusResponse> {
  const requestId = generateRequestId()
  const conversationId = getOrCreateConversationId()

  const request: DoctorPlusRequest = {
    ...payload,
    request_id: requestId,
    conversation_id: conversationId,
    client: 'web',
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
        'X-Conversation-ID': conversationId,
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      // Log full error for debugging
      console.error('Doctor+ API Error:', {
        status: response.status,
        statusText: response.statusText,
        detail: errorData.detail,
        errorData,
      })
      
      if (response.status === 429) {
        throw new RateLimitError('Лимит запросов исчерпан. Попробуйте позже.')
      }
      
      if (response.status === 400) {
        const detail = errorData.detail || 'Некорректные данные. Проверьте ввод.'
        throw new ValidationError(
          typeof detail === 'string' ? detail : JSON.stringify(detail)
        )
      }
      
      if (response.status >= 500) {
        throw new ServerError('Сервис временно недоступен. Попробуйте позже.')
      }

      throw new ApiError(
        errorData.detail || `HTTP ${response.status}`,
        response.status
      )
    }

    const data: DoctorPlusResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof RateLimitError || error instanceof ValidationError || error instanceof ServerError) {
      throw error
    }

    if (error instanceof TypeError) {
      throw new ApiError('Ошибка сети. Проверьте подключение.')
    }

    throw error
  }
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string) {
    super(message, 429)
    this.name = 'RateLimitError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class ServerError extends ApiError {
  constructor(message: string) {
    super(message, 500)
    this.name = 'ServerError'
  }
}

export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Remove data URI prefix if present
      const base64 = result.includes(',') ? result.split(',')[1] : result
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function validateImageSize(file: File, maxBytes: number): boolean {
  return file.size <= maxBytes
}
