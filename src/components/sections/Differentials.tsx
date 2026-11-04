import { DIFFERENTIALS } from "@/content/site";
import { SectionLabel, SectionTitle, revealDelay } from "../ui";

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="on-dark bg-brand text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-5 py-20 sm:px-8 lg:gap-20 lg:px-16 lg:py-36">
        <div className="flex flex-col gap-6">
          <SectionLabel index="04" label="Diferenciais" tone="light" />
          <SectionTitle id="diferenciais-title">Nossos Diferenciais</SectionTitle>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIALS.map((item, i) => (
            <div key={item.title} className="relative flex flex-col gap-3.5 pt-7">
              <span
                data-reveal="line"
                style={revealDelay(i * 100)}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-white/30"
              />
              <h3 data-reveal="up" style={revealDelay(80 + i * 100)} className="font-serif text-[1.625rem] leading-[1.15]">
                {item.title}
              </h3>
              <p data-reveal="up" style={revealDelay(140 + i * 100)} className="text-[15px] leading-[1.65] text-white/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
