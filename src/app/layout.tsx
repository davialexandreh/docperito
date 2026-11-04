import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ADDRESS, EXPERTS, HERO, PHONE_DISPLAY, SITE_URL, WHATSAPP_NUMBER } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const TITLE = "Doc Perito | Perícia Médica Judicial e Extrajudicial em São Paulo";
const DESCRIPTION =
  "Perícias médicas, assistência técnica, consultoria processual e laudos com rigor científico. Peritos especialistas com formação pela FMUSP, HC-FMUSP e FMABC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Doc Perito",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f7",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Doc Perito",
  description: HERO.subtitle,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-mark-lg.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: `+${WHATSAPP_NUMBER}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: "BR",
  },
  member: EXPERTS.map((e) => ({ "@type": "Person", name: e.name, jobTitle: e.specialty })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${WHATSAPP_NUMBER}`,
    contactType: "customer service",
    availableLanguage: "Portuguese",
    name: PHONE_DISPLAY,
  },
};

const HEAD_SCRIPT = `(function(){var h=document.head,n=h.firstChild;while(n){var x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!n.textContent.trim()))h.removeChild(n);n=x}document.documentElement.classList.add('js')})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo adiciona a classe `js` antes da hidratação.
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Roda antes da hidratação:
            1. Remove comentários e espaços soltos que a Netlify injeta no <head> em produção
               ("This site is hosted on Netlify"); sem isso o React falha a hidratação (erro #418),
               re-renderiza a página no cliente e apaga a classe `js`.
            2. Habilita as animações de revelação só quando há JS (sem JS, tudo fica visível). */}
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
