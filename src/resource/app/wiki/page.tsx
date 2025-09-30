"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WikiSidebar } from "@/components/wiki-sidebar"
import { WikiContent } from "@/components/wiki-content"
import { WikiSearch } from "@/components/wiki-search"
import { Breadcrumb } from "@/components/breadcrumb"

const articleMetadata: Record<string, { title: string; category: string }> = {
  "server-commands": { title: "服务器玩家命令", category: "新手入门" },
  "create-claims": { title: "如何创建领地", category: "新手入门" },
  "server-rules": { title: "服务器规则", category: "规则制度" },
  "client-versions": { title: "服务器客户端版本说明", category: "技术指南" },
  "frp-guide": { title: "服务器FRP节点贡献指南", category: "技术指南" },
  "special-features": { title: "服务器特殊功能指南", category: "特色功能" },
  "connection-issues": { title: "服务器连接问题及解决方法", category: "故障排除" },
}

export default function WikiPage() {
  const [currentArticle, setCurrentArticle] = useState("server-commands")

  useEffect(() => {
    const handleArticleChange = (event: CustomEvent) => {
      setCurrentArticle(event.detail.articleId)
    }

    window.addEventListener("wiki-article-change", handleArticleChange as EventListener)

    return () => {
      window.removeEventListener("wiki-article-change", handleArticleChange as EventListener)
    }
  }, [])

  const getBreadcrumbItems = () => {
    const article = articleMetadata[currentArticle]
    if (!article) return [{ label: "Wiki" }]

    return [{ label: "Wiki", href: "/wiki" }, { label: article.category }, { label: article.title }]
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">EndlessPixel Wiki</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">游戏指南、服务器规则、新手教程和进阶攻略</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <WikiSearch />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <WikiSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Breadcrumb items={getBreadcrumbItems()} />
              <WikiContent currentArticle={currentArticle} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
