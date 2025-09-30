"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Calendar, User, MessageSquare, ExternalLink, Tag } from "lucide-react";

/* ---------------- 类型 ---------------- */
interface GitHubIssueDetail {
  id: number;
  title: string;
  body: string | null;
  html_url: string;
  user: { login: string; avatar_url: string };
  created_at: string;
  comments: number;
  labels: { name: string; color: string }[];
  state: "open" | "closed";
}

interface GitHubComment {
  id: number;
  user: { login: string; avatar_url: string };
  created_at: string;
  body: string;
}

/* ---------------- SVG 图标 ---------------- */
const Icons = {
  user: <User className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  comment: <MessageSquare className="w-5 h-5" />,
  link: <ExternalLink className="w-4 h-4" />,
  tag: <Tag className="w-4 h-4" />,
};

/* ---------------- 独立信息卡片 ---------------- */
function InfoCard({ icon, label, value }: { icon: JSX.Element; label: string; value?: React.ReactNode }) {
  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-xl">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="text-cyan-600 dark:text-cyan-400">{icon}</div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{value ?? "—"}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- 骨架屏 ---------------- */
function SkeletonCard() {
  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-xl">
      <CardContent className="space-y-4 p-6">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

/* ---------------- 主页面 ---------------- */
export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id; // Avoid using `use` for now
  const [issue, setIssue] = useState<GitHubIssueDetail | null>(null);
  const [comments, setComments] = useState<GitHubComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIssueDetail();
  }, [id]);

  const fetchIssueDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      // 1. 基础详情
      const issueRes = await fetch(`https://api.github.com/repos/EndlessPixel/EndlessPixel-Modpack/issues/${id}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (!issueRes.ok) throw new Error(`GitHub API error: ${issueRes.status}`);
      const issueData: GitHubIssueDetail = await issueRes.json();
      setIssue(issueData);

      // 2. 评论列表
      const commentsRes = await fetch(
        `https://api.github.com/repos/EndlessPixel/EndlessPixel-Modpack/issues/${id}/comments`,
        { headers: { Accept: "application/vnd.github.v3+json" } }
      );
      if (commentsRes.ok) {
        const commentsData: GitHubComment[] = await commentsRes.json();
        setComments(commentsData);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (url: string) => {
    const extractedId = url.split("/").pop();
    if (extractedId) {
      router.push(`./${extractedId}`);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="p-6 space-y-6">
          <SkeletonCard />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !issue) {
    return (
      <>
        <Navigation />
        <main className="p-6 space-y-6">
          <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <CardContent className="p-6">
              <p className="text-red-700 dark:text-red-400">加载失败：{error ?? "未找到问题详情"}</p>
              <Button variant="outline" className="mt-4" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />返回
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="p-6 space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">问题详情</h1>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />返回
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InfoCard icon={Icons.user} label="创建者" value={issue.user.login} />
          <InfoCard icon={Icons.calendar} label="创建时间" value={new Date(issue.created_at).toLocaleDateString("zh-CN")} />
          <InfoCard icon={Icons.comment} label="评论数" value={issue.comments} />
          <InfoCard icon={Icons.tag} label="状态" value={issue.state === "open" ? "开放" : "已关闭"} />
        </div>

        {/* 标签 */}
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {issue.labels.map((l) => (
              <span
                key={l.name}
                className="px-3 py-1 text-xs rounded-full"
                style={{ backgroundColor: `#${l.color}`, color: parseInt(l.color, 16) > 0xffffff / 2 ? "#000" : "#fff" }}
              >
                {l.name}
              </span>
            ))}
          </div>
        )}

        {/* 主卡片 */}
        <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                {issue.title}
              </a>
              {Icons.link}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {issue.body ? (
              <div className="prose prose-sm max-w-none dark:prose-invert text-gray-800 dark:text-gray-100
                              bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700
                              whitespace-pre-wrap break-words">
                {issue.body}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">暂无描述</p>
            )}
          </CardContent>
        </Card>

        {/* 评论列表 */}
        {comments.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">评论</h2>
            <div className="space-y-4">
              {comments.map((c) => (
                <Card key={c.id} className="bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <img src={c.user.avatar_url} alt="" className="w-6 h-6 rounded-full" />
                      <span>{c.user.login}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(c.created_at).toLocaleDateString("zh-CN")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                      {c.body}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
