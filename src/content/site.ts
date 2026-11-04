// Conteúdo do site. Textos dos peritos e das seções validados pelos clientes: não alterar sem confirmação.

export const SITE_URL = "https://www.docperito.com.br";

/** Prefixa caminhos de `public/` com o basePath (o Next não faz isso em <img> e <source>). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const WHATSAPP_NUMBER = "5511978454054";
export const PHONE_DISPLAY = "(11) 97845-4054";

// Links dos CTAs validados (iguais ao site atual).
export const WHATSAPP_LINKS = {
  header:
    "https://api.whatsapp.com/send?phone=5511978454054&text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20a%20equipe%20da%20Doc%20Perito%20para%20obter%20mais%20informa%C3%A7%C3%B5es.",
  hero: "https://api.whatsapp.com/send?phone=5511978454054&text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20per%C3%ADcia%20m%C3%A9dica%20e%20entender%20como%20funciona%20o%20atendimento%20da%20Doc%20Perito.",
  phone:
    "https://api.whatsapp.com/send?phone=5511978454054&text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20a%20equipe%20da%20Doc%20Perito%20para%20obter%20mais%20informa%C3%A7%C3%B5es.",
  floating:
    "https://api.whatsapp.com/send?phone=5511978454054&text=Ol%C3%A1%21%20Estou%20no%20site%20da%20Doc%20Perito%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida",
};

/** Mensagem do formulário (template validado, extraído do WeWeb). */
export function formWhatsappUrl(fields: { nome: string; email: string; telefone: string; necessidade: string }) {
  const nome = fields.nome.charAt(0).toUpperCase() + fields.nome.slice(1);
  const email = fields.email.toLowerCase();
  const contato = fields.telefone ?? "";
  const necessidade = fields.necessidade ?? "";
  const message = [
    `Olá, me chamo ${nome}.`,
    "",
    "Gostaria de solicitar uma perícia para a seguinte necessidade:",
    necessidade,
    "",
    "Seguem meus dados para contato:",
    `Telefone: ${contato}`,
    `E-mail: ${email}`,
  ]
    .join("\n")
    .trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ADDRESS = {
  line: "Rua Alcides Ricardini Neves, 12 CJ 303 - Cidade Monções, São Paulo - SP, 04575-050",
  street: "Rua Alcides Ricardini Neves, 12, CJ 303",
  district: "Cidade Monções",
  city: "São Paulo",
  region: "SP",
  postalCode: "04575-050",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Rua Alcides Ricardini Neves, 12, São Paulo - SP, 04575-050"),
};

export const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#peritos", label: "Peritos" },
  { href: "#areas", label: "Áreas de atuação" },
  { href: "#contato", label: "Contato" },
];

export const HERO = {
  eyebrow: "Perícias médicas judiciais e extrajudiciais",
  titleStart: "Excelência Técnica em Perícia Médica para",
  titleEmphasis: "Decisões Seguras",
  subtitle:
    "Atuação especializada em perícias médicas, laudos técnicos e análises fundamentadas, com experiência acadêmica, clínica e institucional, apoiando decisões judiciais com precisão e responsabilidade.",
  cta: "Solicitar Perícia",
  secondary: "Conheça os peritos",
  credentialsTitle: "Formação e trajetória",
  credentials: [
    { name: "Faculdade de Medicina da USP", short: "FMUSP" },
    { name: "Hospital das Clínicas", short: "HC-FMUSP" },
    { name: "Faculdade de Medicina do ABC", short: "FMABC" },
    { name: "Humboldt Universität Berlin", short: "DE" },
    { name: "Fundação Getulio Vargas", short: "FGV" },
  ],
};

export const ABOUT = {
  title: "Sobre a Doc Perito",
  lead: "A Doc Perito é uma empresa especializada em perícias médicas e técnicas, com atuação em demandas judiciais e extrajudiciais. Formada por profissionais com sólida formação acadêmica e ampla experiência clínica, a Doc Perito atua com rigor científico, ética e imparcialidade na elaboração de laudos técnicos fundamentados.",
  body: "Nosso trabalho é pautado pela clareza técnica, responsabilidade profissional e compromisso com a verdade científica, oferecendo suporte qualificado para decisões judiciais seguras e bem fundamentadas.",
  bullets: [
    "Atuação em perícias médicas judiciais e extrajudiciais",
    "Laudos técnicos com rigor científico e fundamentação técnica",
    "Experiência acadêmica, clínica e institucional consolidada",
  ],
};

export type Expert = {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  photoAlt: string;
  // Cada item é um parágrafo; cada string interna é uma linha.
  bio: string[][];
  tags: string[];
};

export const EXPERTS: Expert[] = [
  {
    id: "marcelo",
    name: "Dr. Marcelo Schalch",
    specialty: "Especialista em Cirurgia de Cabeça e Pescoço",
    photo: "marcelo",
    photoAlt: "Retrato do Dr. Marcelo Schalch, de terno, com os braços cruzados",
    bio: [
      [
        "Médico formado pela Faculdade de Medicina do ABC (FMABC) e pela Humboldt Universität Berlin.",
        "Doutor em medicina pela Faculdade de medicina da USP.",
        "Possui residência médica em Cirurgia Geral e em Cirurgia de Cabeça e Pescoço, com sólida formação clínica e cirúrgica aplicada à análise técnico-pericial.",
      ],
      [
        "É pós-graduado em Medicina Legal e em Perícias Médicas, além de possuir pós-graduação em Gestão de Consultório Médico pela Fundação Getulio Vargas (FGV).",
      ],
      [
        "Atua como perito médico desde 2014, com mais de 2.000 perícias e assistências técnicas realizadas, abrangendo perícias judiciais e assistências técnicas nas áreas cível, trabalhista, previdenciária e criminal. Possui ampla experiência em elaboração de laudos periciais, pareceres técnicos e atuação em interface médico-legal.",
        "Tem vasto conhecimento em consultoria processual médica e da área da saúde.",
      ],
      [
        "Vice-Coordenador do CEP do Instituto de Câncer Dr. Arnaldo Vieira de Carvalho, com atuação voltada à ética médica, pesquisa clínica e avaliação técnica especializada.",
      ],
    ],
    tags: [
      "Médico Especialista em Cirurgia de Cabeça e Pescoço",
      "Atuação em Perícia Médica",
      "Experiência Nacional e Internacional",
    ],
  },
  {
    id: "alexandre",
    name: "Dr. Alexandre Bezerra",
    specialty: "Especialista em Cirurgia de Cabeça e Pescoço",
    photo: "alexandre",
    photoAlt: "Retrato do Dr. Alexandre Bezerra, de jaleco branco, com os braços cruzados",
    bio: [
      [
        "Médico formado pela FMUSP, Especialista em Cirurgia de Cabeça e Pescoço, com Mestrado e Doutorado pelo HC-FMUSP, MBA em Gestão de Saúde, com ampla experiência clínica, cirúrgica e acadêmica no tratamento de doenças benignas e malignas complexas.",
      ],
      [
        "Ex-revisor da revista da SBCCP (Sociedade Brasileira de Cirurgia de Cabeça e Pescoço), orientador em serviços de formação de residência médica há mais de 20 anos, mentor de alunos da faculdade de medicina, ex-integrante de comitê de ética e pesquisa médica do complexo HCFMUSP, com diversas participações em cursos e congressos nacionais e internacionais.",
      ],
      [
        "Chefe de serviço de Cabeça e Pescoço do Hospital Santa Paula.",
        "Possui diploma de medicina reconhecido na União Europeia.",
      ],
    ],
    tags: ["Especialista em Cirurgia de Cabeça e Pescoço", "Doutorado pelo HC-FMUSP", "Consultor Técnico"],
  },
];

export const AREAS = [
  {
    title: "Perícia Médica Judicial",
    text: "Atuação como perito médico em processos judiciais, com elaboração de laudos técnicos fundamentados, imparciais e alinhados às exigências do Judiciário.",
  },
  {
    title: "Assistência Técnica Médica",
    text: "Atuação como assistente técnico das partes, com análise crítica de laudos, emissão de pareceres técnicos, elaboração de quesitos e todo suporte especializado ao processo judicial.",
  },
  {
    title: "Consultoria processual",
    text: "Avaliação técnica de prontuários, exames, condutas médicas e nexo causal, para auxiliar na decisão de início da disputa judicial ou não.",
  },
  {
    title: "Laudos e Pareceres Médicos",
    text: "Elaboração de laudos, relatórios e pareceres médicos técnicos para demandas judiciais e extrajudiciais, com clareza, rigor científico e responsabilidade profissional.",
  },
];

export const DIFFERENTIALS = [
  {
    title: "Experiência Comprovada",
    text: "Atuação consolidada em perícias médicas judiciais e extrajudiciais, com laudos técnicos elaborados com rigor científico e reconhecimento institucional.",
  },
  {
    title: "Equipe Altamente Especializada",
    text: "Profissionais com sólida formação acadêmica, ampla experiência clínica e atuação especializada em perícia médica.",
  },
  {
    title: "Rigor Científico e Técnico",
    text: "Análises fundamentadas em evidências científicas, protocolos médicos reconhecidos e critérios técnicos claros, garantindo precisão e confiabilidade.",
  },
  {
    title: "Compromisso com Prazos e Qualidade",
    text: "Cumprimento rigoroso de prazos processuais, com responsabilidade técnica, clareza na comunicação e alto padrão profissional.",
  },
];

export const STEPS = [
  {
    title: "Contato Inicial",
    text: "Recebemos a solicitação por meio do formulário ou contato direto, compreendendo a demanda e o contexto do caso.",
  },
  {
    title: "Análise Técnica Preliminar",
    // Corrigido erro de português do original ("definição e do escopo").
    text: "Realizamos a análise inicial do caso, documentos e informações disponíveis para definição do escopo técnico.",
  },
  {
    title: "Proposta Técnica",
    text: "Apresentamos proposta técnica detalhada, com escopo definido, prazos determinados e condições de execução.",
  },
  {
    title: "Execução da Perícia",
    text: "Conduzimos a perícia médica com rigor científico, metodologia adequada e observância das normas técnicas e legais.",
  },
  {
    title: "Entrega do Laudo",
    text: "Entregamos o laudo técnico fundamentado, claro e objetivo, dentro do prazo acordado, pronto para utilização judicial ou extrajudicial.",
  },
];

export const CONTACT = {
  titleStart: "Entre em",
  titleEmphasis: "Contato",
  text: "Precisa de uma perícia técnica? Entre em contato conosco e receba uma proposta personalizada para seu caso. Nossa equipe está pronta para atendê-lo com a excelência que você merece.",
  formTitle: "Solicite sua Perícia",
  submit: "Enviar Solicitação",
  note: "Ao enviar, você continua a conversa pelo WhatsApp com a mensagem já preenchida.",
};

export const DEVELOPER = {
  name: "Davi Alexandre",
  url: "https://www.linkedin.com/in/davi-alexandre-silva/",
};
