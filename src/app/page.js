import About from "@/components/sectios/About";
import CTA from "@/components/sectios/CTA";
import Hero from "@/components/sectios/Hero";
import Projects from "@/components/sectios/Projects";
import Skills from "@/components/sectios/Skills";


export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CTA />
    </main>
  );
}
