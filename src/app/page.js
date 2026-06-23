import About from "@/components/sectios/About";
import Hero from "@/components/sectios/Hero";
import Skills from "@/components/sectios/Skills";

export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <About />
      <Skills />
      <section id="projects" className="scroll-mt-24 min-h-screen">
        Projects
      </section>
    </main>
  );
}
