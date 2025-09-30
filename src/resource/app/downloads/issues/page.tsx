"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ---------------- 类型 ---------------- */
interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  user: { login: string };
  created_at: string;
  comments: number;
  state: "open" | "closed";
  body?: string;
  labels: { name: string; color: string }[];
}

/* ---------------- SVG 图标 ---------------- */
const Icons = {
  issue: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  comment: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  label: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
};

/* ---------------- 独立卡片组件 ---------------- */
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

/* ---------------- 主页面 ---------------- */
export default function IssuesPage() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.github.com/repos/EndlessPixel/EndlessPixel-Modpack/issues?state=all", {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((res) => res.json())
      .then((data: GitHubIssue[]) => {
        if (Array.isArray(data)) setIssues(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRedirect = (url: string) => {
    const extractedId = url.split("/").pop();
    if (extractedId) {
      router.push(`./issues/${extractedId}`);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center py-12 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
          <span className="text-gray-600 dark:text-gray-300">正在加载 issues...</span>
        </div>
        <Footer />
      </>
    );
  }

  const openIssues = issues.filter((i) => i.state === "open");
  const closedIssues = issues.filter((i) => i.state === "closed");

  return (
    <>
      <Navigation />
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">Issues 列表</h1>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard icon={Icons.issue} label="开放问题" value={openIssues.length} />
          <InfoCard icon={Icons.issue} label="已关闭" value={closedIssues.length} />
          <InfoCard icon={Icons.comment} label="总评论" value={issues.reduce((a, i) => a + i.comments, 0)} />
        </div>

        {/* 开放问题 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">开放问题</h2>
          {openIssues.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">暂无开放问题</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-lg transition"
                  onClick={() => handleRedirect(issue.html_url)}
                >
                  <CardHeader>
                    <CardTitle className="text-base">
                      <span className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">
                        {issue.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      {Icons.user} <span>{issue.user.login}</span>
                      {Icons.calendar} <span>{new Date(issue.created_at).toLocaleDateString("zh-CN")}</span>
                      {Icons.comment} <span>{issue.comments}</span>
                    </div>
                    {issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {issue.labels.map((l) => (
                          <span
                            key={l.name}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: `#${l.color}`,
                              color: parseInt(l.color, 16) > 0xffffff / 2 ? "#000" : "#fff",
                            }}
                          >
                            {l.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* 已关闭问题 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">已关闭问题</h2>
          {closedIssues.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">暂无已关闭问题</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {closedIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-lg transition"
                  onClick={() => handleRedirect(issue.html_url)}
                >
                  <CardHeader>
                    <CardTitle className="text-base">
                      <span className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">
                        {issue.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      {Icons.user} <span>{issue.user.login}</span>
                      {Icons.calendar} <span>{new Date(issue.created_at).toLocaleDateString("zh-CN")}</span>
                      {Icons.comment} <span>{issue.comments}</span>
                    </div>
                    {issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {issue.labels.map((l) => (
                          <span
                            key={l.name}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: `#${l.color}`,
                              color: parseInt(l.color, 16) > 0xffffff / 2 ? "#000" : "#fff",
                            }}
                          >
                            {l.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
