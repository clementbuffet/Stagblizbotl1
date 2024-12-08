import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}