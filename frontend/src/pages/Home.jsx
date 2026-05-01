import AuthenticSection from "../components/home/AuthenticSection";
import BestSellers from "../components/home/BestSellers";
import BrandTicker from "../components/home/BrandTicker";
import CategorySection from "../components/home/CategorySection";
import GoalsSection from "../components/home/GoalsSection";
import GymTeaser from "../components/home/GymTeaser";
import HeroBanner from "../components/home/HeroBanner";
import Reviews from "../components/home/Reviews";
import TrustBadges from "../components/home/TrustBadges";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategorySection />
      <BestSellers />
      <GoalsSection />
      <BrandTicker />
      <AuthenticSection />
      <GymTeaser />
      <Reviews />
    </>
  );
}
