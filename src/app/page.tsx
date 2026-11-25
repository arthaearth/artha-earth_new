import { Hero } from "@/components/layout/Hero";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
