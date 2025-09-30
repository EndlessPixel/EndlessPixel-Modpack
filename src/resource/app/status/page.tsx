import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const NODES = [
  { name: "湖北十堰-2", path: "/status/frpnode/hbsy-2" },
  { name: "湖南娄底联通", path: "/status/frpnode/hnldlt" },
  { name: "四川成都电信", path: "/status/frpnode/sccddx" },
  { name: "四川成都联通", path: "/status/frpnode/sccdlt" },
];

export default function StatusIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">节点状态导航</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              实时查看 EndlessPixel 服务器的运行状态、在线玩家和性能指标
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {NODES.map((node) => (
              <Card key={node.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {node.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    查看 {node.name} 的详细状态。
                  </p>
                  <Link href={node.path} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600">
                    查看详情
                  </Link>
                </CardContent>
              </Card>
            ))}
            <Card key={"Minecraft 服务器"} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {"Minecraft 服务器"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    查看 {"Minecraft 服务器"} 的详细状态。
                  </p>
                  <Link href={"/status/mcserverstatus"} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600">
                    查看详情
                  </Link>
                </CardContent>
              </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}