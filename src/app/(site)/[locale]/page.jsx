import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";

export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />

      <About locale={locale} />

      <Experience locale={locale} />

      <Skills locale={locale} />

      <Projects locale={locale} />

      <Certificates locale={locale} />

      <CTA locale={locale} />
    </main>
  );
}
