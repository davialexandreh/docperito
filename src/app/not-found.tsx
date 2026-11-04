import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[640px] flex-col justify-center gap-6 px-5">
      <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">Erro 404</p>
      <h1 className="font-serif text-5xl leading-tight font-light">Página não encontrada</h1>
      <Link href="/" className="text-brand underline underline-offset-4">
        Voltar para o início
      </Link>
    </main>
  );
}
