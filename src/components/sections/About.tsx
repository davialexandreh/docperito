import { ABOUT, asset } from "@/content/site";
import { SectionLabel, SectionTitle, revealDelay } from "../ui";

const NUMERALS = ["i.", "ii.", "iii."];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-10 px-5 py-20 sm:px-8 lg:gap-24 lg:px-16 lg:py-36">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-10">
          <SectionLabel index="01" label="Sobre" />
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
          <img
            data-reveal="up"
            style={revealDelay(160)}
            src={asset("/images/logo-mark-lg.webp")}
            alt="Símbolo da Doc Perito: balança da justiça com o bastão de Asclépio sobre um pergaminho"
            width={148}
            height={148}
            loading="lazy"
            className="hidden w-28 sm:block lg:w-37"
          />
        </div>

        <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-8">
          <SectionTitle id="sobre-title">{ABOUT.title}</SectionTitle>
          <p
            data-reveal="up"
            style={revealDelay(140)}
            className="font-serif text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.4]"
          >
            {ABOUT.lead}
          </p>
          <p data-reveal="up" style={revealDelay(200)} className="max-w-[64ch] text-[17px] leading-[1.7] text-muted">
            {ABOUT.body}
          </p>
          <ul className="mt-4 grid gap-8 sm:grid-cols-3">
            {ABOUT.bullets.map((item, i) => (
              <li key={item} className="relative flex flex-col gap-3 pt-5">
                <span
                  data-reveal="line"
                  style={revealDelay(i * 120)}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-ink"
                />
                <span
                  data-reveal="up"
                  style={revealDelay(120 + i * 120)}
                  className="font-serif text-lg text-brand italic"
                  aria-hidden="true"
                >
                  {NUMERALS[i]}
                </span>
                <span data-reveal="up" style={revealDelay(160 + i * 120)} className="text-base leading-normal">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
