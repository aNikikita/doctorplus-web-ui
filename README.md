# Doctor+ Web Frontend

A modern, type-safe web application for the Doctor+ medical information assistant, built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## Features

✅ **Web-based Chat Interface**
- Two modes: Lab Results Analysis & Symptom Checker
- Real-time responses with Markdown rendering
- Image upload for lab test photos (base64 encoding)
- Conversation management with unique IDs

✅ **Landing & Information Pages**
- Hero section with compelling pitch
- How it works (3-step guide)
- What Doctor+ is NOT (clear disclaimers)
- Trust & safety section
- About page with red flags for emergency
- Legal pages (Privacy, Terms)

✅ **Smart Rate Limiting**
- Client-side limit: 20 requests/day
- Backend limit: 10 requests/day (IP-based)
- User-friendly error messages

✅ **Analytics & Tracking**
- PostHog integration for events
- Request/response tracking
- No PII or message content sent (metadata only)
- Limit reached tracking

✅ **Error Handling**
- Graceful API error handling
- User-friendly error messages
- Network error resilience
- Status code handling (400, 429, 500+)

✅ **SEO Optimized**
- Structured metadata (Open Graph, Twitter)
- Heading hierarchy (h1-h3)
- Semantic HTML
- Sitemap and robots.txt ready

## Quick Start

### 1. Install
```bash
cd web_v2
npm install
```

### 2. Configure
```bash
# .env.local already has defaults
# Optionally update:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_POSTHOG_KEY=your_key
```

### 3. Run
```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (to implement)
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── legal/             # Privacy, Terms pages
│   └── [other pages]
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── landing/           # Hero, How-it-works, etc.
│   ├── chat/              # Chat components
│   └── ui/                # UI primitives
├── lib/
│   ├── api/               # API client
│   ├── analytics/         # PostHog integration
│   ├── utils/             # Utilities
│   └── config.ts          # Configuration
└── types/                 # TypeScript types
```

## Key Files Status

### ✅ Completed
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `tailwind.config.js` - Tailwind theme
- `next.config.js` - Next.js config
- `src/lib/config.ts` - Configuration
- `src/lib/api/doctorplus.ts` - API client
- `src/lib/analytics/posthog.ts` - Analytics
- `src/lib/utils/request-id.ts` - ID generation
- `src/types/doctorplus.ts` - Type definitions
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles
- `src/components/layout/site-header.tsx` - Header

### ⏳ To Implement (See COMPONENT_TEMPLATES.md)
- All page files (page.tsx, about, legal, etc.)
- All component files (chat, landing, UI)
- Error boundaries (not-found, error)
- SEO files (sitemap, robots)

## API Integration

### Backend Endpoint
```
POST /api/doctorplus
```

### Request
```typescript
{
  mode: 'analyses' | 'symptoms'
  text: string
  image_b64?: string
  meta?: {
    sex?: 'male' | 'female' | 'other'
    age?: number
    complaint?: string
    extra?: string
  }
  conversation_id?: string
  client?: 'web'
  request_id?: string
}
```

### Response
```typescript
{
  answer_md: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
```

## Chat Modes

### Analyses Mode
- Upload lab test results (photos or text)
- Fields: Sex, Age, Complaint, Text
- Image support (5MB max)

### Symptoms Mode
- Describe health concerns
- Fields: Sex, Age, Description
- Optional: Temperature, Pressure, Duration, Conditions

## Rate Limiting

**Local (Frontend)**
- 20 requests per day
- Stored in localStorage
- Resets daily

**Backend (API)**
- 10 requests per day per IP
- Returns 429 status
- Enforced by middleware

## Styling

### Tailwind Setup
- Medical color palette (blues, greens)
- Warning/error colors
- Responsive design (mobile-first)

### Component Classes
```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<div class="card">Card</div>
<input class="input-field" />
<div class="alert-error">Error</div>
```

## Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Analytics Events

Tracked via PostHog:
- `web_doctorplus_request` - Message sent
- `web_doctorplus_response` - Response received
- `web_doctorplus_limit_reached` - User hit limit

Only metadata sent (mode, hasImage, duration, success) — no PII or message content.

## Documentation

- **QUICKSTART.md** - Get started in 3 steps
- **IMPLEMENTATION_GUIDE.md** - Complete technical reference
- **COMPONENT_TEMPLATES.md** - Code examples for all components

## Environment Variables

| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Yes |
| `NEXT_PUBLIC_POSTHOG_KEY` | `phc_...` | No |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://app.posthog.com` | No |

## Dependencies

### Main
- `next` ^14.0.0 - React framework
- `react` ^18.2.0 - UI library
- `typescript` ^5.3.3 - Type safety
- `tailwindcss` ^3.4.1 - Styling
- `@tanstack/react-query` ^5.28.0 - API state
- `react-markdown` ^9.0.1 - Markdown rendering
- `posthog-js` ^1.146.0 - Analytics

### Dev
- Various type definitions (@types/*)
- ESLint, Autoprefixer, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security & Privacy

- ✅ HTTPS-ready
- ✅ No password storage
- ✅ No PII collection
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling (no stack traces to users)

## Performance

- Next.js App Router (SSR/SSG)
- Code splitting
- Image optimization ready
- Compression enabled
- Minimal bundle

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
npm run start
```

Deploy the `.next/` directory.

## Support

- Check QUICKSTART.md for common tasks
- See IMPLEMENTATION_GUIDE.md for detailed reference
- Review COMPONENT_TEMPLATES.md for code examples

## License

[Your License Here]

---

**Status**: Foundation Complete ✅

**Next**: Implement pages and components (see COMPONENT_TEMPLATES.md)

**Questions?** See IMPLEMENTATION_GUIDE.md for comprehensive reference.
# the-1
