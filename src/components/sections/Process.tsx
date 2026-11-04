import { STEPS } from "@/content/site";
import { SectionLabel, SectionTitle, revealDelay } from "../ui";

export function Process() {
  return (
    <section
      aria-labelledby="como-funciona-title"
      className="mx-auto flex max-w-[1240px] flex-col gap-12 px-5 py-20 sm:px-8 lg:gap-20 lg:px-16 lg:py-36"
    >
      <div className="flex flex-col gap-6">
        <SectionLabel index="05" label="Processo" />
        <SectionTitle id="como-funciona-title" className="max-w-[18ch]">
          Como Funciona Nosso Atendimento
        </SectionTitle>
      </div>

      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span data-reveal="up" style={revealDelay(i * 120)} className="size-2.5 rounded-full bg-brand" />
              <span data-reveal="line" style={revealDelay(60 + i * 120)} className="h-px flex-1 bg-line-strong" />
            </div>
            <div data-reveal="up" style={revealDelay(120 + i * 120)} className="flex flex-col gap-4">
              <span aria-hidden="true" className="font-serif text-[3.5rem] leading-none font-light text-brand">
                0{i + 1}
              </span>
              <h3 className="text-[17px] font-semibold">{step.title}</h3>
              <p className="text-[15px] leading-[1.65] text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
