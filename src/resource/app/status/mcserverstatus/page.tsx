"use client";

import React from "react";
import type { ReactNode, JSX } from "react";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ---------------- 类型 ---------------- */
interface Player { name: string; uuid: string }
interface ServerData {
  online: boolean;
  ip?: string;
  port?: number;
  version?: string;
  protocol?: { name?: string; version?: number };
  icon?: string;
  software?: string;
  motd?: { html?: string[] };
  players?: { online: number; max: number; list?: Player[] };
}

/* ---------------- 节点 ---------------- */
const NODES = [
  { name: "四川成都联通", ip: "cd2.epmc.top" },
  { name: "四川成都电信", ip: "cd1.epmc.top" },
  { name: "湖南娄底联通", ip: "ld.epmc.top" },
  { name: "湖北十堰电信", ip: "hbdx.epmc.top" },
  { name: "湖北十堰飞讯", ip: "hb.epmc.top" },
  { name: "中国北京阿里", ip: "bj.epmc.top" },
] as const;

/* ---------------- SVG 图标 ---------------- */
const Icons = {
  ip: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2v20" />
    </svg>
  ),
  port: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  ),
  version: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  software: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  motd: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

/* ---------------- 请求 ---------------- */
async function fetchNode(ip: string): Promise<ServerData | null> {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function InfoCard({ icon, label, value }: { icon: JSX.Element; label: string; value?: string | number }) {
  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl">
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
export default function McServerStatusPage() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetchNode(NODES[active].ip).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [active]);

  return (
    <>
      <Navigation />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Minecraft 服务器状态</h1>

        {/* 6 按钮 */ }
        <div className="flex flex-wrap gap-3 mb-6">
          {NODES.map((n, i) => (
            <button
              key={n.ip}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                i === active
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-cyan-400"
              }`}
            >
              {n.name}
            </button>
          ))}
        </div>

        {/* 单选项卡 */ }
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-24" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={Icons.ip} label="IP 地址" value={data?.ip} />
            <InfoCard icon={Icons.port} label="端口" value={data?.port ?? 25565} />
            <InfoCard icon={Icons.version} label="版本" value={data?.version} />
            <InfoCard icon={Icons.software} label="核心" value={data?.software} />
            <InfoCard
              icon={Icons.users}
              label="在线玩家"
              value={data?.players ? `${data.players.online} / ${data.players.max}` : undefined}
            />
            <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-cyan-600 dark:text-cyan-400">{Icons.motd}</div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">MOTD</div>
                    <div className="text-sm text-gray-800 dark:text-gray-100 mt-1">
                      {data?.motd?.html ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.motd.html.join("<br>").replace(/<[^>]+>/g, (t) => (t === "<br>" ? t : "")),
                          }}
                        />
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 服务器图标独立卡片 */ }
            {data?.icon && (
              <Card className="md:col-span-2 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-cyan-600 dark:text-cyan-400">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">服务器图标</div>
                    <img src={data.icon} alt="" className="w-16 h-16 mt-2 rounded-lg border border-gray-200 dark:border-gray-700" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
