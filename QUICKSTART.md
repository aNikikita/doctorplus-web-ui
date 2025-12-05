# 🚀 Doctor+ Web - Quick Start Guide

## What's Ready

✅ **Complete Foundation Created:**
- Next.js 14 project with TypeScript
- Tailwind CSS styling system
- All configuration files
- Type definitions
- API client with error handling
- PostHog analytics integration
- Request/conversation ID management
- Comprehensive documentation

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd /Users/user/Doctor+/web_v2
npm install
```

### 2. Start Development
```bash
npm run dev
```

Then open: **http://localhost:3000**

### 3. Configure Backend (if needed)
Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
```

## Project Structure

```
web_v2/
├── src/
│   ├── app/           ← Pages go here
│   ├── components/    ← React components
│   ├── lib/           ← Config, API, analytics
│   └── types/         ← TypeScript types
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Key Files Created

| File | Purpose |
|------|---------|
| `src/lib/api/doctorplus.ts` | API client with error handling |
| `src/lib/analytics/posthog.ts` | Analytics tracking |
| `src/lib/config.ts` | Configuration constants |
| `src/types/doctorplus.ts` | Type definitions |
| `src/app/layout.tsx` | Root layout with metadata |
| `src/app/globals.css` | Tailwind + custom styles |
| `src/components/layout/site-header.tsx` | Header component |

## What You Need to Implement

### Pages (in `src/app/`)
1. ✅ `layout.tsx` (done)
2. ✅ `globals.css` (done)
3. ⏳ `page.tsx` (homepage)
4. ⏳ `about/page.tsx`
5. ⏳ `legal/privacy/page.tsx`
6. ⏳ `legal/terms/page.tsx`
7. ⏳ `not-found.tsx`
8. ⏳ `error.tsx`
9. ⏳ `sitemap.ts`
10. ⏳ `robots.txt`

### Components (in `src/components/`)
- **Layout**: `site-header.tsx` ✅, `site-footer.tsx` ⏳
- **Landing**: `hero-section.tsx`, `how-it-works.tsx`, `not-doing.tsx`, `trust-section.tsx`, `for-whom.tsx`
- **Chat**: `chat-section.tsx`, `chat-messages.tsx`, `chat-input.tsx`, `mode-tabs.tsx`, `meta-form.tsx`, `error-banner.tsx`, `loading.tsx`
- **UI**: `button.tsx`, `input.tsx`, `tabs.tsx`, `alert.tsx`

## Component Templates

See `COMPONENT_TEMPLATES.md` for complete code examples of:
- ChatSection
- ChatInput
- Homepage structure
- About page
- Privacy policy

Copy and customize them!

## API Integration

### Backend Endpoint
```
POST http://localhost:8000/api/doctorplus
```

### Request Format
```json
{
  "mode": "analyses|symptoms",
  "text": "user input",
  "image_b64": "optional base64 image",
  "meta": {
    "sex": "male|female|other",
    "age": 28,
    "complaint": "optional",
    "extra": "optional"
  },
  "conversation_id": "web_...",
  "client": "web",
  "request_id": "web_..."
}
```

### Response Format
```json
{
  "answer_md": "# Title\n\nMarkdown content...",
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 200,
    "total_tokens": 300
  }
}
```

## Analytics Events

Your app will track:
- `web_doctorplus_request` - When user sends message
- `web_doctorplus_response` - When backend responds
- `web_doctorplus_limit_reached` - When user hits limit

(No PII or message content is sent—only metadata)

## Style System

### Button Classes
```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-ghost">Ghost</button>
```

### Card & Containers
```html
<div class="card">Card content</div>
<div class="container-responsive">Page content</div>
```

### Alerts
```html
<div class="alert-error">Error message</div>
<div class="alert-warning">Warning message</div>
<div class="alert-success">Success message</div>
```

### Form Elements
```html
<input class="input-field" />
<textarea class="input-field"></textarea>
```

## Rate Limiting

Your frontend implements two levels:

1. **Local Limit** (localStorage)
   - 20 requests per day
   - Tracked by date

2. **Backend Limit** (IP-based)
   - 10 requests per day
   - Returns 429 status
   - User sees: "Лимит запросов исчерпан. Попробуйте позже."

## Available Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## Environment Variables

| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Yes |
| `NEXT_PUBLIC_POSTHOG_KEY` | `your_key_here` | No |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://app.posthog.com` | No |

## Common Tasks

### Add a new page
1. Create `src/app/mypage/page.tsx`
2. Add layout and content
3. Update navigation links

### Add a new component
1. Create file in `src/components/`
2. Export function
3. Import in pages/components

### Style element
1. Use Tailwind classes directly
2. Or use custom `.btn-primary`, `.card`, etc.
3. Can add to `src/app/globals.css`

### Call the API
```typescript
import { askDoctorPlus } from '@/lib/api/doctorplus'

const response = await askDoctorPlus({
  mode: 'analyses',
  text: 'Мой анализ...',
  image_b64: 'base64_string',
  meta: { sex: 'male', age: 28 }
})

console.log(response.answer_md) // Markdown response
```

### Track analytics
```typescript
import {
  trackWebDoctorPlusRequest,
  trackWebDoctorPlusResponse,
  trackWebDoctorPlusLimitReached
} from '@/lib/analytics/posthog'

trackWebDoctorPlusRequest('analyses', true, false, 'conv_id', 'req_id')
trackWebDoctorPlusResponse('analyses', false, true, 1200)
trackWebDoctorPlusLimitReached('local')
```

## Troubleshooting

### "Cannot find module" errors
→ Run `npm install` first

### Port 3000 already in use
→ Run `npm run dev -- -p 3001`

### Tailwind not working
→ Make sure CSS imports are correct in layout.tsx

### API errors
→ Check that backend is running at the configured URL

### TypeScript errors after changes
→ Run `npm run type-check`

## Next Steps

1. **Implement pages**: Use templates from `COMPONENT_TEMPLATES.md`
2. **Test chat**: Send messages to backend API
3. **Add analytics**: Configure PostHog key
4. **Deploy**: Build and deploy to Vercel, Netlify, or your server

## Documentation

- `IMPLEMENTATION_GUIDE.md` - Full technical guide
- `COMPONENT_TEMPLATES.md` - Code examples for all components
- `README.md` - (create your own)

---

**Ready to start?**

```bash
cd web_v2 && npm install && npm run dev
```

Then open http://localhost:3000 🚀
