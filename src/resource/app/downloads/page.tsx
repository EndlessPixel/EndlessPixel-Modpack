import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DownloadSection } from "@/components/download-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "资源下载",
  description:
    "下载EndlessPixel Minecraft服务器最新客户端整合包。支持1.21.8最新版、1.21.4稳定版，包含Fabric模组包和优化配置。",
  keywords: ["Minecraft下载", "模组包下载", "Fabric", "客户端下载", "1.21.8", "EndlessPixel"],
  openGraph: {
    title: "资源下载 | EndlessPixel",
    description: "下载EndlessPixel Minecraft服务器最新客户端整合包。",
    url: "https://ep.endlesspixel.fun/downloads",
  },
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">资源下载</h1>
            <p className="text-lg text-muted-foreground">下载 EndlessPixel 客户端整合包，开始你的冒险之旅</p>
          </div>

          {/* Downloads Section */}
          <DownloadSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
