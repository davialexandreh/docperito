import { AREAS } from "@/content/site";
import { SectionLabel, SectionTitle, revealDelay } from "../ui";

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-5 py-20 sm:px-8 lg:gap-20 lg:px-16 lg:py-36">
        <div className="flex flex-col gap-6">
          <SectionLabel index="03" label="Atuação" />
          <SectionTitle id="areas-title">Áreas de Atuação</SectionTitle>
        </div>

        <div className="grid gap-x-16 lg:grid-cols-2">
          {AREAS.map((area, i) => (
            <div key={area.title} className="relative flex gap-7 pt-9 pb-12">
              <span
                data-reveal="line"
                style={revealDelay((i % 2) * 120)}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-line"
              />
              <span
                data-reveal="up"
                style={revealDelay(80 + (i % 2) * 120)}
                aria-hidden="true"
                className="min-w-8 font-serif text-xl text-brand italic"
              >
                0{i + 1}
              </span>
              <div data-reveal="up" style={revealDelay(140 + (i % 2) * 120)} className="flex flex-col gap-3.5">
                <h3 className="font-serif text-[1.75rem] leading-[1.15]">{area.title}</h3>
                <p className="text-base leading-[1.65] text-muted">{area.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
