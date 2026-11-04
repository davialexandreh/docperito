"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT, formWhatsappUrl } from "@/content/site";
import { ArrowIcon } from "./ui";

type FieldName = "nome" | "email" | "telefone" | "mensagem";
type Values = Record<FieldName, string>;

const EMPTY: Values = { nome: "", email: "", telefone: "", mensagem: "" };
const FIELDS: FieldName[] = ["nome", "email", "telefone", "mensagem"];
// TODO(confirmar com o cliente): mínimo de palavras e textos de erro do WeWeb original.
const MIN_WORDS = 3;

const words = (v: string) =>
  v
    .trim()
    .split(/\s+/)
    .filter((w) => w.length >= 2);

function validate(field: FieldName, value: string): string {
  switch (field) {
    case "nome":
      return words(value).length >= 2 ? "" : "Informe seu nome completo.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
        ? ""
        : "Informe um email válido.";
    case "telefone":
      // Com a máscara, (00) 0000-0000 tem 14 caracteres (mesma regra do WeWeb).
      return value.length >= 14 ? "" : "Informe um telefone válido.";
    case "mensagem":
      return words(value).length >= MIN_WORDS
        ? ""
        : "Descreva brevemente a sua necessidade.";
  }
}

/** Máscara (00) 00000-0000 / (00) 0000-0000. */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const inputClass =
  "w-full rounded border bg-white px-4 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-[#6b7a81] focus:border-brand focus:shadow-[0_0_0_3px_rgba(13,66,92,0.16)] focus:outline-none";

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const errors = Object.fromEntries(
    FIELDS.map((f) => [f, touched[f] ? validate(f, values[f]) : ""]),
  ) as Record<FieldName, string>;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    const value =
      field === "telefone" ? maskPhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    if (values[field]) setTouched((t) => ({ ...t, [field]: true }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nome: true, email: true, telefone: true, mensagem: true });

    const firstInvalid = FIELDS.find((f) => validate(f, values[f]));
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }

    // Síncrono dentro do submit: qualquer await antes faria o navegador bloquear o popup.
    const url = formWhatsappUrl({
      nome: values.nome.trim(),
      email: values.email.trim(),
      telefone: values.telefone,
      necessidade: values.mensagem.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setValues(EMPTY);
    setTouched({});
  };

  const field = (name: FieldName) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-erro` : undefined,
  });

  const borderFor = (name: FieldName) =>
    errors[name] ? "border-[#b42318]" : "border-line-strong";

  const error = (name: FieldName) =>
    errors[name] ? (
      <p id={`f-${name}-erro`} className="text-[13px] text-[#b42318]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="form-title"
      className="flex min-w-0 flex-[1_1_440px] flex-col gap-5.5 border border-line bg-paper p-7 sm:p-12"
    >
      <h3
        id="form-title"
        className="mb-1.5 font-serif text-[1.875rem] leading-[1.1]"
      >
        {CONTACT.formTitle}
      </h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-nome" className="text-sm font-medium">
          Nome completo
        </label>
        <input
          type="text"
          autoComplete="name"
          placeholder="Digite seu nome"
          className={`${inputClass} h-13 ${borderFor("nome")}`}
          {...field("nome")}
        />
        {error("nome")}
      </div>

      <div className="grid gap-x-4 gap-y-5.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="f-email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="email@email.com"
            className={`${inputClass} h-13 ${borderFor("email")}`}
            {...field("email")}
          />
          {error("email")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="f-telefone" className="text-sm font-medium">
            Telefone
          </label>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            className={`${inputClass} h-13 ${borderFor("telefone")}`}
            {...field("telefone")}
          />
          {error("telefone")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-mensagem" className="text-sm font-medium">
          Descreva brevemente a sua necessidade
        </label>
        <textarea
          rows={5}
          placeholder="Descrição"
          className={`${inputClass} resize-y py-3.5 leading-relaxed ${borderFor("mensagem")}`}
          {...field("mensagem")}
        />
        {error("mensagem")}
      </div>

      <button
        type="submit"
        className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-brand text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-brand-dark"
      >
        {CONTACT.submit}
        <ArrowIcon className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[13px] leading-normal text-subtle">
        {CONTACT.note}
      </p>
    </form>
  );
}
