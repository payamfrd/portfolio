import Hero from "@/components/sectios/Hero";

export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <section id="about" className="h-screen">
        About
      </section>
      <section id="skills" className="h-screen">
        Skills
      </section>
      <section id="projects" className="h-screen">
        Projects
      </section>
    </main>
  );
}
