import { Fragment } from "react";
import { EXPERTS } from "@/content/site";
import { Portrait, SectionLabel, SectionTitle, revealDelay } from "../ui";

export function Experts() {
  return (
    <section
      id="peritos"
      aria-labelledby="peritos-title"
      className="mx-auto flex max-w-[1240px] flex-col gap-14 px-5 py-20 sm:px-8 lg:gap-26 lg:px-16 lg:py-36"
    >
      <div className="flex flex-col gap-6">
        <SectionLabel index="02" label="Peritos" />
        <SectionTitle id="peritos-title">Nossos Peritos</SectionTitle>
      </div>

      {EXPERTS.map((expert, i) => (
        <Fragment key={expert.id}>
          {i > 0 && <div data-reveal="line" aria-hidden="true" className="h-px bg-line" />}
          <article aria-labelledby={`perito-${expert.id}`} className="flex flex-wrap items-start gap-8 lg:gap-20">
            <figure
              data-reveal="photo"
              className="aspect-4/5 w-full max-w-[460px] min-w-0 flex-[1_1_340px] overflow-hidden bg-tint"
            >
              <Portrait
                name={expert.photo}
                alt={expert.photoAlt}
                sizes="(min-width: 640px) 460px, calc(100vw - 40px)"
              />
            </figure>

            <div className="flex min-w-0 flex-[2_1_480px] flex-col gap-5">
              <p
                data-reveal="up"
                className="text-[13px] font-medium tracking-[0.08em] text-brand uppercase"
              >
                {expert.specialty}
              </p>
              <h3
                id={`perito-${expert.id}`}
                data-reveal="up"
                style={revealDelay(80)}
                className="mb-2 font-serif text-[clamp(2.125rem,3.4vw,3rem)] leading-[1.05] font-light tracking-[-0.02em]"
              >
                {expert.name}
              </h3>
              {/* Biografia aparece de uma vez: animar parágrafo a parágrafo cansa a leitura. */}
              <div
                data-reveal="up"
                style={revealDelay(160)}
                className="flex max-w-[66ch] flex-col gap-4 text-base leading-[1.7] text-body"
              >
                {expert.bio.map((lines, p) => (
                  <p key={p}>
                    {lines.map((line, l) => (
                      <Fragment key={l}>
                        {l > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </p>
                ))}
              </div>
              <ul data-reveal="up" style={revealDelay(220)} className="mt-3 flex flex-wrap gap-2">
                {expert.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line-strong px-3.5 py-2 text-[13px]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Fragment>
      ))}
    </section>
  );
}
