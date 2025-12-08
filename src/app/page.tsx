import { ChatSection } from '@/components/chat/chat-section'

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  return <ChatSection />
}
