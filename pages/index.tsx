
import HeroSection from "@/components/shared/hero-section";
import PopularLessons from "@/components/shared/popular-lessons";
import StatsSection from "@/components/shared/stats-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PopularLessons />
    </main>
  );
}
