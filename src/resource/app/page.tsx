import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServerFeatures } from "@/components/server-features"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServerFeatures />
      </main>
      <Footer />
    </div>
  )
}
