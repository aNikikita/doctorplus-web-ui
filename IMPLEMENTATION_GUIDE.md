# Doctor+ Web Frontend - Complete Implementation Guide

## Project Structure Created

```
web_v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Homepage (hero + landing + chat)
│   │   ├── globals.css             # Tailwind + custom styles
│   │   ├── about/
│   │   │   └── page.tsx            # About page
│   │   ├── legal/
│   │   │   ├── privacy/page.tsx   # Privacy policy
│   │   │   └── terms/page.tsx     # Terms of use
│   │   ├── not-found.tsx          # 404 page
│   │   ├── error.tsx              # Error boundary
│   │   ├── sitemap.ts             # SEO sitemap
│   │   └── robots.txt             # SEO robots
│   ├── components/
│   │   ├── layout/
│   │   │   ├── site-header.tsx    # Header navigation
│   │   │   └── site-footer.tsx    # Footer
│   │   ├── landing/
│   │   │   ├── hero-section.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── not-doing.tsx
│   │   │   ├── trust-section.tsx
│   │   │   └── for-whom.tsx
│   │   ├── chat/
│   │   │   ├── chat-section.tsx
│   │   │   ├── chat-messages.tsx
│   │   │   ├── chat-input.tsx
│   │   │   ├── mode-tabs.tsx
│   │   │   ├── meta-form.tsx
│   │   │   ├── error-banner.tsx
│   │   │   └── loading.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── tabs.tsx
│   │       └── alert.tsx
│   ├── lib/
│   │   ├── config.ts              # Configuration
│   │   ├── api/
│   │   │   └── doctorplus.ts     # API client
│   │   ├── analytics/
│   │   │   └── posthog.ts        # Analytics
│   │   └── utils/
│   │       └── request-id.ts     # ID generation
│   └── types/
│       └── doctorplus.ts         # API types
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── .env.example
├── .env.local
└── .gitignore
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd web_v2
npm install
# or
pnpm install
```

### 2. Configure Environment
```bash
# .env.local already created with defaults
# Update if needed:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_POSTHOG_KEY=your_key
```

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

## Page Implementation Details

### Page: / (Homepage)

**Structure:**
1. **Hero Section**
   - Logo + Title "Доктор+"
   - H1: "Доктор+ — информационный помощник по здоровью"
   - Subtitle + mini disclaimer
   - CTA button → scroll to #chat

2. **How It Works (3 steps)**
   - Card 1: "Опишите симптомы или введите анализы"
   - Card 2: "Доктор+ объяснит простым языком"
   - Card 3: "Идите к врачу подготовленным"

3. **What Doctor+ is NOT**
   - ❌ Не ставит диагнозы
   - ❌ Не заменяет врача
   - ❌ Не назначает лекарства
   - Explanation text

4. **Trust Section**
   - Safety messages
   - "Модель обучена на общих медицинских данных"
   - "Всегда консультируйтесь с врачом"

5. **For Whom Section** (3 cards)
   - "Получили анализы и не понимаете"
   - "Готовитесь к визиту"
   - "Хотите лучше сформулировать вопросы"

6. **Chat Section** (id="chat")
   - Full ChatSection component
   - Integrates with /api/doctorplus

7. **Footer**
   - Links to /about, /legal/privacy, /legal/terms
   - Emergency disclaimer

### Page: /about

- h1: "О сервисе Доктор+"
- "Кто такой Доктор+" section
- "Как он работает" section (LLM, Groq, Llama 3.1)
- "Чего он НЕ делает" section
- "Когда нужно срочно к врачу" - red flags:
  - Боль в груди
  - Потеря сознания
  - Тяжёлая одышка
  - Суицидальные мысли
  - etc.
- CTA: "Попробовать чат" → /#chat

### Page: /legal/privacy

- h1: "Политика конфиденциальности Доктор+"
- h2: "Какие данные собираются"
  - Содержание чатов
  - Загруженные файлы
  - Данные о подключении
- h2: "Как используются"
  - Обработка запросов
  - Улучшение сервиса
  - Аналитика (PostHog, без текста)
- h2: "ВАЖНО: Не вводите ФИО, телефон, адрес, номера полисов"
- h2: "Контакты"

### Page: /legal/terms

- h1: "Пользовательское соглашение Доктор+"
- h2: "Информационный сервис, не мед.устройство"
- h2: "Не ставит диагнозы"
- h2: "Не назначает лечение"
- h2: "Не предназначен для экстренной помощи"
- h2: "Дисклеймер и ограничение ответственности"

## Chat Component Implementation

### ChatSection Component Structure

```tsx
<ChatSection>
  ├── ChatHeader
  │   └── "Чат Доктор+ — информационный помощник, не врач"
  ├── ModeTabs
  │   ├── Tab: "Анализы"
  │   └── Tab: "Симптомы"
  ├── ChatMessages
  │   ├── Map user messages → right bubble
  │   └── Map assistant messages → left bubble (Markdown)
  ├── ChatInput
  │   ├── Meta fields (sex, age, complaint/extra)
  │   ├── Textarea (text input)
  │   ├── [Analyses only] File upload + preview
  │   ├── [Analyses only] Complaint field
  │   ├── [Symptoms only] Collapsible extra fields
  │   └── Submit button
  ├── LoadingIndicator (while fetching)
  └── ErrorBanner (on error)
```

### Modes Logic

**Mode: "Analyses"**
- Fields: sex, age, complaint, text
- Image upload enabled
- Complaint field shown
- Extra: optional

**Mode: "Symptoms"**
- Fields: sex, age, description
- Image upload disabled
- Collapsible extra: temperature, pressure, duration, conditions
- Extra: built from collapsed fields

### Form Submission Flow

1. User fills form (text, meta, image)
2. Validate:
   - Text not empty
   - Image size <= 5MB (if provided)
   - Check local rate limit (20/day)
3. Convert image to base64 if present
4. Call `askDoctorPlus(payload)`
5. Show loading state
6. Track event: `trackWebDoctorPlusRequest(...)`
7. On success:
   - Add response to chat (Markdown rendered)
   - Track: `trackWebDoctorPlusResponse(..., success: true)`
   - Clear input
8. On error:
   - Show error banner
   - If 429: track `trackWebDoctorPlusLimitReached('backend')`
   - Handle validation/server errors

### Local Rate Limiting

```typescript
function checkLocalRateLimit(): boolean {
  const today = new Date().toDateString()
  const storedDate = localStorage.getItem('doctorplus_request_date')
  const count = parseInt(localStorage.getItem('doctorplus_request_count') || '0')

  if (storedDate !== today) {
    localStorage.setItem('doctorplus_request_date', today)
    localStorage.setItem('doctorplus_request_count', '1')
    return true // allowed
  }

  if (count >= LIMITS.maxRequestsPerDay) {
    trackWebDoctorPlusLimitReached('local')
    return false // exceeded
  }

  localStorage.setItem('doctorplus_request_count', String(count + 1))
  return true // allowed
}
```

## Key Features Implementation

### 1. SEO Metadata
- ✅ title, description in layout.tsx
- ✅ Open Graph tags
- ✅ Twitter card
- ✅ Heading hierarchy (h1 > h2 > h3)
- ✅ sitemap.ts, robots.txt

### 2. Analytics
- ✅ PostHog integration
- ✅ Events: web_doctorplus_request, response, limit_reached
- ✅ No PII/text content sent
- ✅ Metadata only: mode, hasImage, duration, success

### 3. Error Handling
- ✅ 400: Validation error
- ✅ 429: Rate limit
- ✅ 500+: Server error
- ✅ Network error: "Ошибка сети"
- ✅ Show user-friendly messages

### 4. Rate Limiting
- ✅ Local limit: 20/day (localStorage)
- ✅ Backend limit: 10/day/IP (429)
- ✅ Track both in analytics

### 5. Image Handling
- ✅ File → base64 conversion
- ✅ Size validation (5MB)
- ✅ Preview before submit
- ✅ Only in "Analyses" mode

### 6. Conversation Management
- ✅ conversation_id: sessionStorage (per session)
- ✅ request_id: unique per request
- ✅ Clear conversation: new session button

## API Integration

### Request Format
```typescript
POST /api/doctorplus
Content-Type: application/json
X-Request-ID: web_1701945600000_abc123def
X-Conversation-ID: web_1701945600000_xyz789

{
  "mode": "analyses|symptoms",
  "text": "Мой анализ показал...",
  "image_b64": "iVBORw0KGgoAAAANS...",
  "meta": {
    "sex": "male|female|other",
    "age": 28,
    "complaint": "Высокий холестерин",
    "extra": "Дополнительный контекст"
  },
  "conversation_id": "web_...",
  "client": "web",
  "request_id": "web_..."
}
```

### Response Format
```typescript
{
  "answer_md": "# Результат анализа\n\nВаше состояние...",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 300,
    "total_tokens": 450
  }
}
```

## Styling System

### Tailwind Colors
- **medical**: Blue shades (primary)
- **accent**: Green shades (CTA)
- **warning**: Orange shades
- **error**: Red shades

### Component Classes
- `.btn-primary`: Main buttons
- `.btn-secondary`: Secondary buttons
- `.card`: Content cards
- `.input-field`: Input/textarea
- `.alert-error/warning/success`: Alerts
- `.container-responsive`: Max-width container

## Component Examples

### HeroSection
```tsx
export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-responsive text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Доктор+ — информационный помощник по здоровью
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Помогает понять анализы и подготовиться к визиту к врачу. Не врач.
        </p>
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-warning-800 text-sm font-medium">
            ⚠️ Доктор+ не ставит диагнозы и не назначает лечение.
          </p>
        </div>
        <a href="#chat" className="btn-primary inline-block">
          Начать чат
        </a>
      </div>
    </section>
  )
}
```

### ChatSection (Simplified)
```tsx
export function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [mode, setMode] = useState<DoctorPlusMode>('analyses')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { mutate: send } = useMutation({
    mutationFn: askDoctorPlus,
    onSuccess: (response) => {
      const msg: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.answer_md,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, msg])
      trackWebDoctorPlusResponse(mode, false, true, 0)
    },
    onError: (error: Error) => {
      setError(error.message)
      trackWebDoctorPlusResponse(mode, false, false, 0, error.name)
    },
  })

  return (
    <section id="chat" className="py-16">
      <div className="container-responsive max-w-2xl">
        <div className="card">
          <ChatHeader />
          <ModeTabs mode={mode} onModeChange={setMode} />
          <ChatMessages messages={messages} />
          {isLoading && <LoadingIndicator />}
          {error && <ErrorBanner error={error} />}
          <ChatInput
            mode={mode}
            isLoading={isLoading}
            onSubmit={(payload) => {
              send(payload)
              trackWebDoctorPlusRequest(mode, true, !!payload.image_b64, '', '')
            }}
          />
        </div>
      </div>
    </section>
  )
}
```

## Next Steps After Setup

1. **Install dependencies**: `npm install`
2. **Run dev server**: `npm run dev`
3. **Check errors**: Most TypeScript errors will resolve after npm install
4. **Implement remaining components**:
   - Landing section components (hero, how-it-works, etc.)
   - Chat components (messages, input, tabs)
   - Page components (about, legal)
   - UI components (buttons, inputs, alerts)
5. **Configure backend URL**: Update .env.local
6. **Test integration**: Send test messages to /api/doctorplus
7. **Add PostHog key**: Update .env.local for analytics
8. **Build & deploy**: `npm run build && npm start`

## Files Status

✅ Created:
- Configuration files (tsconfig.json, tailwind.config.js, next.config.js, etc.)
- Type definitions (src/types/doctorplus.ts)
- Configuration (src/lib/config.ts)
- Utilities (request-id.ts)
- API client (src/lib/api/doctorplus.ts)
- Analytics (src/lib/analytics/posthog.ts)
- Root layout (src/app/layout.tsx)
- Global styles (src/app/globals.css)
- Site header component (src/components/layout/site-header.tsx)

⏳ To be completed after `npm install`:
- All page files (page.tsx for /, /about, /legal/*, etc.)
- All component files (landing sections, chat components, UI components)
- Error handling pages (not-found.tsx, error.tsx)
- SEO files (sitemap.ts, robots.txt)

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

---

**Status**: Foundation Complete ✅  
**Next**: Install dependencies and implement remaining components
