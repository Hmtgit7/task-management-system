// app/(marketing)/page.tsx
import { HeroSection } from "./_components/hero-section";
import { StatsBar } from "./_components/stats-bar";
import { FeaturesSection } from "./_components/features-section";
import { HowItWorks } from "./_components/how-it-works";
import { FaqSection } from "./_components/faq-section";
import { CtaSection } from "./_components/cta-section";
import { LandingNav } from "./_components/landing-nav";
import { LandingFooter } from "./_components/landing-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#080810] overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <FaqSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
