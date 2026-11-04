import { ADDRESS, CONTACT, PHONE_DISPLAY, WHATSAPP_LINKS } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { SectionLabel, revealDelay } from "../ui";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-5 py-20 sm:px-8 lg:gap-28 lg:px-16 lg:py-36">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-7">
          <SectionLabel index="06" label="Contato" />
          {/* Texto simples: o site atual não tem e-mail de contato. */}
          <h2
            id="contato-title"
            data-reveal="up"
            style={revealDelay(80)}
            className="font-serif text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.02] font-light tracking-[-0.025em]"
          >
            {CONTACT.titleStart} <em className="text-brand italic">{CONTACT.titleEmphasis}</em>
          </h2>
          <p data-reveal="up" style={revealDelay(140)} className="max-w-[46ch] text-[17px] leading-[1.7] text-muted">
            {CONTACT.text}
          </p>

          <dl data-reveal="up" style={revealDelay(200)} className="mt-4 flex flex-col border-y border-line">
            <div className="flex items-start gap-5 py-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand"
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
              <div className="flex flex-col gap-1">
                <dt className="text-xs font-medium tracking-[0.12em] text-subtle uppercase">Telefone / WhatsApp</dt>
                <dd className="font-serif text-2xl">
                  <a
                    href={WHATSAPP_LINKS.phone}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline-offset-4 hover:text-brand hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-5 border-t border-line py-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand"
              >
                <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div className="flex flex-col gap-1">
                <dt className="text-xs font-medium tracking-[0.12em] text-subtle uppercase">Endereço</dt>
                <dd className="text-base leading-relaxed">
                  <a
                    href={ADDRESS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline-offset-4 hover:text-brand hover:underline"
                  >
                    {ADDRESS.line}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
