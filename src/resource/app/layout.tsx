import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { BackToTop } from "@/components/back-to-top"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "EndlessPixel - Minecraft Java 服务器官网",
    template: "%s | EndlessPixel",
  },
  description:
    "EndlessPixel是一个由热爱游戏的玩家组成的Minecraft社区，致力于提供有趣、自由、开放的游戏世界。支持1.8-1.21.6版本，提供资源下载、实时状态查询、完整Wiki指南等服务。",
  keywords: [
    "EndlessPixel",
    "无尽像素",
    "Minecraft",
    "我的世界",
    "Java版",
    "服务器",
    "多人游戏",
    "原版",
    "Leaf",
    "1.21.8",
    "免费服务器",
    "中文服务器",
    "游戏社区",
  ],
  authors: [{ name: "EndlessPixel Team" }],
  creator: "EndlessPixel Community",
  publisher: "EndlessPixel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://ep.endlesspixel.fun",
    siteName: "EndlessPixel",
    title: "EndlessPixel - Minecraft Java 服务器官网",
    description: "EndlessPixel是一个由热爱游戏的玩家组成的Minecraft社区，致力于提供有趣、自由、开放的游戏世界。",
    images: [
      {
        url: "https://s21.ax1x.com/2024/12/11/pAHvtKS.png",
        width: 1200,
        height: 630,
        alt: "EndlessPixel Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EndlessPixel - Minecraft Java 服务器官网",
    description: "EndlessPixel是一个由热爱游戏的玩家组成的Minecraft社区，致力于提供有趣、自由、开放的游戏世界。",
    images: ["https://s21.ax1x.com/2024/12/11/pAHvtKS.png"],
  },
  icons: {
    icon: "https://s21.ax1x.com/2024/12/11/pAHvtKS.png",
    shortcut: "https://s21.ax1x.com/2024/12/11/pAHvtKS.png",
    apple: "https://s21.ax1x.com/2024/12/11/pAHvtKS.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#1a1a1a",
    "color-scheme": "light dark",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          dangerouslySetInnerHTML={{__html:`
            // 检测Internet Explorer浏览器
            const isIE = /Trident|MSIE/.test(navigator.userAgent);
            if (isIE) {
              alert('您正在使用Internet Explorer浏览器，该浏览器可能无法正常显示本网站。建议使用Chrome、Firefox、Edge等现代浏览器访问。');
            }
          `}}></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EndlessPixel",
              description:
                "EndlessPixel是一个由热爱游戏的玩家组成的Minecraft社区，致力于提供有趣、自由、开放的游戏世界。",
              url: "https://ep.endlesspixel.fun",
              logo: "https://s21.ax1x.com/2024/12/11/pAHvtKS.png",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Chinese",
              },
              offers: {
                "@type": "Offer",
                description: "免费Minecraft Java版服务器",
                price: "0",
                priceCurrency: "CNY",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            {children}
            <BackToTop />
          </ErrorBoundary>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
