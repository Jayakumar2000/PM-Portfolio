import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { GTMFramework } from "../components/GTMFramework";
import { StoryAndSkills } from "../components/StoryAndSkills";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StoryAndSkills />
      <GTMFramework />
      <ProjectGrid />
      <CTA />
    </div>
  );
}
