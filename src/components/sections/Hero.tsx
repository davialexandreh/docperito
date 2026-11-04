import type { CSSProperties } from "react";
import { HERO, WHATSAPP_LINKS } from "@/content/site";
import { ArrowIcon } from "../ui";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 pt-14 pb-20 sm:px-8 lg:gap-10 lg:px-16 lg:pt-28 lg:pb-32"
    >
      <p className="hero-in flex items-center gap-3 text-xs font-medium tracking-[0.16em] text-brand uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        {HERO.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="hero-in max-w-[17ch] font-serif text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[1.02] font-light tracking-[-0.025em]"
      >
        {HERO.titleStart} <em className="text-brand italic">{HERO.titleEmphasis}</em>
      </h1>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-24 gap-y-14 lg:mt-6">
        <div className="hero-in flex max-w-[560px] min-w-0 flex-[1_1_420px] flex-col gap-8" style={delay(140)}>
          <p className="text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-relaxed text-muted">{HERO.subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={WHATSAPP_LINKS.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-brand px-7 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-brand-dark"
            >
              {HERO.cta}
              <ArrowIcon className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </a>
            <a
              href="#peritos"
              className="py-2 text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-brand"
            >
              {HERO.secondary}
            </a>
          </div>
        </div>

        <aside
          aria-label={HERO.credentialsTitle}
          className="hero-in w-full max-w-[420px] min-w-0 flex-[1_1_320px] border-t border-ink"
          style={delay(280)}
        >
          <p className="pt-4 pb-2 text-xs font-medium tracking-[0.16em] text-subtle uppercase">
            {HERO.credentialsTitle}
          </p>
          <ul className="font-serif text-lg leading-snug">
            {HERO.credentials.map((c) => (
              <li key={c.short} className="flex justify-between gap-4 border-b border-line py-3">
                <span>{c.name}</span>
                <span className="pt-1 font-sans text-[13px] text-subtle">{c.short}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
