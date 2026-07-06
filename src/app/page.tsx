import { HeroOverlay } from "@/components/hero/HeroOverlay";
import { SceneClient } from "@/components/hero/SceneClient";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-[#040611]">
      <section className="relative h-screen w-full overflow-hidden">
        <SceneClient />
        <HeroOverlay />
      </section>
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
