import { Hero } from '../components/Hero';
import { HomeStory } from '../components/HomeStory';
import { HomePhilosophy } from '../components/HomePhilosophy';
import { HomeSourcing } from '../components/HomeSourcing';

export function Home() {
  return (
    <div className="w-full bg-[#020202]">
      <Hero />
      <HomeStory />
      <HomePhilosophy />
      <HomeSourcing />
    </div>
  );
}
