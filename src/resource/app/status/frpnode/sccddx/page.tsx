import { ServerStatusCard } from "@/components/server-status-card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function SccddxPage() {
  return (
    <>
      <Navigation />
      <main className="p-6">
        <ServerStatusCard node="四川成都电信" />
      </main>
      <Footer />
    </>
  );
}