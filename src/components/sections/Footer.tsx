import { DEVELOPER, NAV } from "@/content/site";

export function Footer() {
  // Export estático: o ano é fixado no build. Rebuild anual atualiza o copyright.
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-night text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-5 pt-16 pb-10 sm:px-8 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-3">
            <a
              href="#topo"
              className="font-serif text-[2.5rem] leading-none font-light tracking-[-0.02em] text-white no-underline"
            >
              Doc Perito
            </a>
            <span className="text-sm text-white/75">Perícias médicas judiciais e extrajudiciais · São Paulo</span>
          </div>
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-[13px] text-white/70">
          <span>© {year} Doc Perito. Todos os direitos reservados.</span>
          <span>
            Desenvolvido por{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 hover:underline"
            >
              {DEVELOPER.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
