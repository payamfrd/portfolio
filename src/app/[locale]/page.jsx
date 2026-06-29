import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";

export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />

      <section id="about">
        <About locale={locale} />
      </section>

      <section id="skills">
        <Skills locale={locale} />
      </section>

      <section id="projects">
        <Projects locale={locale} />
      </section>

      <CTA locale={locale} />
    </main>
  );
}
