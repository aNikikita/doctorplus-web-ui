# Doctor+ Web Frontend

**Next.js 14 + TypeScript + Tailwind CSS + Vercel**

ChatGPT-style medical information assistant web interface.

---

## 🏗️ Architecture

```
web_v2/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage with chat
│   │   ├── about/        # About page
│   │   └── legal/        # Legal pages
│   ├── components/       # React components
│   │   ├── chat/         # Chat UI components
│   │   ├── landing/      # Landing page sections
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and helpers
│   │   ├── api/          # API client
│   │   ├── analytics/    # PostHog analytics
│   │   └── config.ts     # Configuration
│   └── types/            # TypeScript types
├── public/               # Static assets
├── package.json          # Dependencies
├── .env.example          # Environment variables template
└── next.config.js        # Next.js configuration
```

---

## 🚀 Quick Start

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_BASE_URL

# 3. Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Run production build locally
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🌐 Deployment

### Vercel (Production)

**Prerequisites:**
- Vercel account
- GitHub repository connected

**Deploy:**

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Import Git repository
   - Select `web_v2` as root directory

2. **Environment Variables** (Vercel Dashboard → Settings → Environment Variables):
   ```
   NEXT_PUBLIC_API_BASE_URL=https://doctorplus-backend.vercel.app/api
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key (optional)
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com (optional)
   ```

3. **Deploy**
   - Push to `main` branch → Auto-deploy
   - Or: `npx vercel --prod`

**Live URL:** https://the-1.vercel.app

---

## 🎨 Features

### ChatGPT-Style Interface

- **Empty State:** "Чем вам помочь?" centered when no messages
- **User Messages:** Blue bubbles, right-aligned
- **Assistant Messages:** White bubbles, left-aligned, markdown formatted
- **Loading State:** "Доктор+ думает…"
- **Error Handling:** Red error banners with clear messages

### Chat Modes

- **Симптомы (Symptoms):** General symptom analysis
- **Анализы (Analyses):** Lab results interpretation (supports image upload)

### Rate Limiting

- Local storage: 20 requests/day
- Auto-reset at midnight
- Clear error messages when limit reached

### Analytics (Optional)

- PostHog integration
- Events: `web_doctorplus_request`, `web_doctorplus_response`, `web_doctorplus_limit_reached`
- Privacy-focused: No PII tracking

---

## 📡 API Integration

### Configuration

**File:** `src/lib/config.ts`

```typescript
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_BASE_URL || 
  'http://localhost:8000'

export const API_ENDPOINT = `${API_BASE_URL}/api/doctorplus`
```

### API Client

**File:** `src/lib/api/doctorplus.ts`

```typescript
export async function askDoctorPlus(
  payload: DoctorPlusRequest
): Promise<DoctorPlusResponse> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  
  if (!response.ok) {
    throw new ApiError(...)
  }
  
  return response.json()
}
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Empty state displays "Чем вам помочь?"
- [ ] Send message → user bubble appears
- [ ] Loading indicator shows
- [ ] Assistant response renders with markdown
- [ ] Error handling works (disconnect network)
- [ ] Rate limiting works (send 21 messages)
- [ ] Mode switching works (Симптомы ↔ Анализы)
- [ ] Auto-scroll to latest message
- [ ] Enter to send, Shift+Enter for newline

### Test URLs

- **Homepage:** https://the-1.vercel.app
- **Chat Section:** Scroll down or `/#chat`
- **About:** https://the-1.vercel.app/about
- **Legal Pages:** `/legal/privacy`, `/legal/terms`, `/legal/disclaimer`

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | `http://localhost:8000` | Backend API URL |
| `NEXT_PUBLIC_POSTHOG_KEY` | ❌ | - | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | ❌ | `https://app.posthog.com` | PostHog host |

---

## 🔧 Development

### Project Structure

- `src/app/` - Next.js pages (App Router)
- `src/components/chat/chat-section.tsx` - Main chat component
- `src/lib/api/doctorplus.ts` - API client with error handling
- `src/types/doctorplus.ts` - TypeScript type definitions

### Key Components

**ChatSection** (`src/components/chat/chat-section.tsx`):
- Main chat interface
- Handles user input, API calls, message display
- Implements ChatGPT-style empty state
- Local rate limiting

**Message Components:**
- User bubbles: Blue, right-aligned, plain text
- Assistant bubbles: White, left-aligned, markdown (`react-markdown`)
- Loading indicator: "Доктор+ думает…"

### Adding New Features

1. Create component in `src/components/`
2. Add types in `src/types/`
3. Update chat logic in `src/components/chat/chat-section.tsx`
4. Test locally with `npm run dev`

---

## 🎨 Design System

### Colors (Tailwind)

- **Primary:** `#1A7F72` (teal)
- **Secondary:** `#E0F2F1` (light teal)
- **Background:** `#EBF7F5`
- **Text:** `#1A1A1A` (primary), `#6B6B6B` (secondary)
- **Error:** `#D32F2F` (red)

### Typography

- **Headings:** Inter, font-bold
- **Body:** Inter, font-normal
- **Code:** Monospace

### Components

- **Buttons:** `rounded-full`, `px-4 py-2`
- **Bubbles:** `rounded-2xl`, `px-5 py-3`
- **Input:** `rounded-2xl`, `border border-secondary`

---

## 🐛 Troubleshooting

### "Failed to load API"
**Solution:** Check `NEXT_PUBLIC_API_BASE_URL` is set correctly in `.env.local` or Vercel.

### CORS errors
**Solution:** Verify backend `ALLOWED_ORIGINS` includes your frontend domain.

### Build fails
**Solution:**
```bash
npm run type-check  # Fix TypeScript errors
npm run build       # Rebuild
```

### Markdown not rendering
**Solution:** Check `react-markdown` is installed and imported correctly.

---

## 📚 Documentation

- [UI Description](./UI_DESCRIPTION.md)
- [Backend Integration](./BACKEND_INTEGRATION.md)
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md)
- [API Contract](../docs/api_contract.md)

---

## 🔗 Related

- **Backend**: [/backend/README_BACKEND.md](../backend/README_BACKEND.md)
- **Mobile**: [/mobile/README_MOBILE.md](../mobile/README_MOBILE.md)
- **Main README**: [/README.md](../README.md)

---

**Status:** ✅ Production Ready  
**Live URL:** https://the-1.vercel.app  
**Last Updated:** December 7, 2025
