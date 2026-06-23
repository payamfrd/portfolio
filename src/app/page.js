import About from "@/components/sectios/About";
import Hero from "@/components/sectios/Hero";

export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <About />
      <section id="skills" className="scroll-mt-24 min-h-screen">
        Skills
      </section>
      <section id="projects" className="scroll-mt-24 min-h-screen">
        Projects
      </section>
    </main>
  );
}
