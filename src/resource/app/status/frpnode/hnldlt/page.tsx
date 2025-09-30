import { ServerStatusCard } from "@/components/server-status-card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function HnldltPage() {
  return (
    <>
      <Navigation />
      <main className="p-6">
        <ServerStatusCard node="湖南娄底联通" />
      </main>
      <Footer />
    </>
  );
}