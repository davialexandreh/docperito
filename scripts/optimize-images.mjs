// Gera as imagens otimizadas em public/images a partir dos originais em assets/images.
// Rodar com `npm run images` sempre que um original mudar; a saída é versionada.
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/images");
const OUT = path.join(ROOT, "public/images");
const BRAND = { r: 13, g: 66, b: 92 }; // #0D425C

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// Fotos dos peritos: AVIF + WebP em 3 larguras, recortadas em 4:5 a partir do topo.
// As larguras precisam bater com PORTRAIT_WIDTHS em src/components/ui.tsx.
const PORTRAITS = ["marcelo", "alexandre"];
const WIDTHS = [480, 720, 960];

for (const name of PORTRAITS) {
  for (const w of WIDTHS) {
    const base = sharp(path.join(SRC, `${name}.png`)).resize({
      width: w,
      height: Math.round((w * 5) / 4),
      fit: "cover",
      position: "top",
    });
    await base.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

// Logo: o original é JPEG com fundo branco. Converte a luminância em transparência
// mantendo a cor original, para o logo assentar sobre qualquer fundo claro.
async function logoMask(size) {
  const { data, info } = await sharp(path.join(SRC, "logo_1_1_1_1.jpeg"))
    .resize({ width: size, height: size, fit: "contain", background: "#ffffff" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < alpha.length; i++) {
    // O traço do logo fica perto de L≈60; o fundo, perto de 255.
    const a = ((250 - data[i]) / (250 - 70)) * 255;
    alpha[i] = Math.max(0, Math.min(255, Math.round(a)));
  }
  return { alpha, width: info.width, height: info.height };
}

async function logo(size, color, file) {
  const { alpha, width, height } = await logoMask(size);
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < alpha.length; i++) {
    rgba[i * 4] = color.r;
    rgba[i * 4 + 1] = color.g;
    rgba[i * 4 + 2] = color.b;
    rgba[i * 4 + 3] = alpha[i];
  }
  const img = sharp(rgba, { raw: { width, height, channels: 4 } });
  await img.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${file}.png`));
  await img.clone().webp({ quality: 90 }).toFile(path.join(OUT, `${file}.webp`));
}

await logo(160, BRAND, "logo-mark");
await logo(400, BRAND, "logo-mark-lg");

// Favicons (fundo branco arredondado para funcionar em abas escuras).
async function icon(size, file) {
  const inner = Math.round(size * 0.8);
  const { alpha, width, height } = await logoMask(inner);
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < alpha.length; i++) {
    rgba[i * 4] = BRAND.r;
    rgba[i * 4 + 1] = BRAND.g;
    rgba[i * 4 + 2] = BRAND.b;
    rgba[i * 4 + 3] = alpha[i];
  }
  const mark = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const r = Math.round(size * 0.22);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" rx="${r}" fill="#ffffff"/></svg>`,
  );
  await sharp(bg)
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(file);
}

await icon(512, path.join(ROOT, "src/app/icon.png"));
await icon(180, path.join(ROOT, "src/app/apple-icon.png"));

// Imagem de compartilhamento (Open Graph) 1200×630.
{
  const W = 1200;
  const H = 630;
  const { alpha, width, height } = await logoMask(220);
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < alpha.length; i++) {
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = alpha[i];
  }
  const mark = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#0D425C"/>
  <rect x="80" y="470" width="1040" height="1" fill="#ffffff" fill-opacity="0.3"/>
  <text x="80" y="200" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#ffffff" fill-opacity="0.8">Doc Perito</text>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="#ffffff">Excelência Técnica em</text>
  <text x="80" y="380" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="#ffffff">Perícia Médica</text>
  <text x="80" y="530" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#ffffff" fill-opacity="0.8">Perícias médicas judiciais e extrajudiciais · São Paulo</text>
</svg>`;
  const og = await sharp(Buffer.from(svg))
    .composite([{ input: mark, left: W - 80 - width, top: 120 }])
    .png()
    .toBuffer();
  await writeFile(path.join(ROOT, "src/app/opengraph-image.png"), og);
}

console.log("Imagens geradas em public/images e src/app.");
