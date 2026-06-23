import Hero from "@/components/sectios/Hero";

export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <section id="about" className="scroll-mt-24 min-h-screen">
        About
      </section>
      <section id="skills" className="scroll-mt-24 min-h-screen">
        Skills
      </section>
      <section id="projects" className="scroll-mt-24 min-h-screen">
        Projects
      </section>
    </main>
  );
}
