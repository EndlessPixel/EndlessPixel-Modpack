import { ServerStatusCard } from "@/components/server-status-card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function SccdltPage() {
  return (
    <>
      <Navigation />
      <main className="p-6">
        <ServerStatusCard node="四川成都联通" />
      </main>
      <Footer />
    </>
  );
}