import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/fa");
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
