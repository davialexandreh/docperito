import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { About } from "@/components/sections/About";
import { Areas } from "@/components/sections/Areas";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Experts } from "@/components/sections/Experts";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="topo">
        <div id="conteudo" />
        <Hero />
        <About />
        <Experts />
        <Areas />
        <Differentials />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <ScrollReveal />
    </>
  );
}
