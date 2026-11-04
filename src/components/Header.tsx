"use client";

import { useEffect, useState } from "react";
import { NAV, WHATSAPP_LINKS, asset } from "@/content/site";
import { WhatsAppIcon } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-line bg-paper/90 shadow-[0_1px_24px_rgba(15,36,48,0.06)] backdrop-blur-md"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-16">
        <a
          href="#topo"
          onClick={close}
          aria-label="Doc Perito — voltar ao topo"
          className="flex items-center gap-3 text-ink no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
          <img src={asset("/images/logo-mark.webp")} alt="" width={40} height={40} className="size-10" />
          <span className="font-serif text-2xl tracking-[-0.01em]">Doc Perito</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 text-[15px] lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_LINKS.header}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-11 items-center gap-2.5 rounded-full bg-brand px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-brand-dark lg:inline-flex"
        >
          <WhatsAppIcon />
          Fale conosco
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
            open ? "border-ink bg-ink text-white" : "border-line-strong text-ink"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu"
          className="menu-in flex flex-col border-t border-line bg-paper px-5 pt-2 pb-6 sm:px-8 lg:hidden"
        >
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-baseline gap-4 border-b border-line py-4 text-ink no-underline"
            >
              <span aria-hidden="true" className="min-w-6 font-serif text-sm text-brand italic">
                0{i + 1}
              </span>
              <span className="font-serif text-[1.75rem] font-light tracking-[-0.01em]">{item.label}</span>
            </a>
          ))}
          <a
            href={WHATSAPP_LINKS.header}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand text-[15px] font-medium text-white"
          >
            <WhatsAppIcon width={18} height={18} />
            Fale conosco
          </a>
        </nav>
      )}
    </header>
  );
}
