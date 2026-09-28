import HomeHero from "@/components/HomeHero";
import HomeManifesto from "@/components/HomeManifesto";
import HomeMoodboard from "@/components/HomeMoodboard";
import HomePair from "@/components/HomePair";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { loadHomeContent } from "@/lib/home-content";

export default async function HomePage() {
  const home = await loadHomeContent();

  return (
    <main>
      <SiteHeader />
      <HomeHero src={home.heroSrc || "/images/hero.jpg"} phrase={home.phrase} />
      <HomeManifesto />
      <HomeMoodboard />
      <HomePair />
      <SiteFooter />
    </main>
  );
}
