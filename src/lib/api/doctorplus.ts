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

  // Log payload in development
  console.log('Doctor+ API Request Payload:', {
    mode: request.mode,
    text: request.text,
    image_b64: request.image_b64 ? '[BASE64_IMAGE_DATA]' : null
  })

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

    let data: any = null
    const ct = response.headers.get("content-type") || ""
    if (ct.includes("application/json")) {
      data = await response.json()
    } else {
      const t = await response.text()
      throw new ApiError(`Non-JSON response (${response.status}): ${t.slice(0, 300)}`)
    }

    if (!response.ok) {
      const msg = data?.error?.message || data?.detail || "API error"
      throw new ApiError(`API ${response.status}: ${msg}`)
    }

    const answer = data?.answer_md ?? data?.answer ?? data?.message ?? ""
    if (!answer) {
      console.warn("Empty answer, full response:", data)
      throw new ApiError("Пустой ответ от сервера (answer_md отсутствует)")
    }

    return { answer_md: answer, usage: data?.usage } as DoctorPlusResponse
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