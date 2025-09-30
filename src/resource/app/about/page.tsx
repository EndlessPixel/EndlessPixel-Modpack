import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { LicenseSection } from "@/components/license-section"
import { ContactSection } from "@/components/contact-section"
import { LuckTest } from "@/components/luck-test"
import { Card, CardContent } from "@/components/ui/card"
import { Server, Heart, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解EndlessPixel团队和我们的故事。EndlessPixel是一个由热爱游戏的玩家组成的Minecraft社区，致力于提供有趣、自由、开放的游戏世界。",
  keywords: ["EndlessPixel团队", "关于我们", "服务器历史", "联系方式", "Minecraft社区", "游戏团队"],
  openGraph: {
    title: "关于我们 | EndlessPixel",
    description: "了解EndlessPixel团队和我们的故事。我们是一个由热爱游戏的玩家组成的Minecraft社区。",
    url: "https://ep.endlesspixel.fun/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">关于我们</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              了解 EndlessPixel 团队和我们的故事，以及如何与我们取得联系
            </p>
          </div>

          {/* About Us Section */}
          <div className="mb-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">关于 EndlessPixel</h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>EndlessPixel是一个由一群热爱游戏的玩家组成的社区，我们致力于提供一个有趣、自由、开放的游戏世界。</p>
                <p>
                  我们的目标是为玩家提供一个友好的环境，让他们可以在这里结识新朋友，分享游戏经验，探索无尽的可能性。
                  我们相信每个像素都蕴含着无限的可能性，每个玩家都能在这里找到属于自己的乐趣和成就感。
                </p>
                <p>
                  我们欢迎所有人加入我们的社区，无论你是新手还是老玩家，我们都期待与你一起创造美好的回忆。
                  如果你对我们的服务器有任何建议或意见，请随时与我们联系！
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <TeamSection />
              <TechStackSection />
              <LicenseSection />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ContactSection />
              <LuckTest />
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">注册玩家</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Server className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">84.2%</div>
                <div className="text-sm text-muted-foreground">在线时间</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">10</div>
                <div className="text-sm text-muted-foreground">运营月数</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
