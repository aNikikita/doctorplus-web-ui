import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { NotDoingSection } from '@/components/landing/not-doing'
import { TrustSection } from '@/components/landing/trust-section'
import { ForWhomSection } from '@/components/landing/for-whom'
import { ChatSection } from '@/components/chat/chat-section'

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <NotDoingSection />
        <ForWhomSection />
        <TrustSection />
        <ChatSection />
      </main>
      <SiteFooter />
    </>
  )
}
