import type { CSSProperties } from "react";
import { WHATSAPP_LINKS } from "@/content/site";
import { WhatsAppIcon } from "./ui";

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_LINKS.floating}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      style={{ "--delay": "700ms" } as CSSProperties}
      className="hero-in fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(10,34,48,0.24)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-dark sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
