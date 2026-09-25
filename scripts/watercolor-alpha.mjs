// Remove o fundo branco/papel das aquarelas da marca e gera WebP com transparência.
// Uso: npm run brand-assets   (lê de ./assets, escreve em src/assets/brand)
// Imagens em ./assets/transparentes já vêm com alfa: só recorte, aparo e compressão.
//
// Técnica "cor para alfa" (como o Color to Alpha do GIMP): a aquarela é tinta
// translúcida sobre papel, então cada pixel vira (cor do pigmento, opacidade) tal
// que, composto sobre branco, reproduz o original. Isso preserva as veladuras e as
// bordas irregulares, que um recorte por limiar serrilharia.
//  1. ponto de branco = mediana da borda da imagem (o papel pode ser acinzentado)
//  2. alfa = maior distância ao branco entre os canais R, G, B
//  3. alfas muito baixos (textura do papel) são zerados com rampa suave [t0, t1]
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'assets';
const OUT = 'src/assets/brand';

// crop: [x, y, largura, altura] em px da imagem original (1200×896)
// t0/t1: rampa de corte da textura do papel (maior em papéis texturizados)
const ASSETS = [
  { src: 'magnific_abstract-watercolor-paint_9ZpJviCNYZ.png', out: 'mancha-terracota-oliva', width: 800, quality: 70 },
  // recorte exclui a borda do cartão de papel que aparece na foto original
  { src: 'magnific_abstract-watercolor-paint_Lw2kM9ZswO.png', out: 'mancha-terracota-rosa', width: 800, quality: 70, t0: 0.06, t1: 0.14, crop: [55, 185, 1110, 530] },
  { src: 'magnific_abstract-watercolor-paint_N2eOfnq6D9.png', out: 'mancha-terracota-verde', width: 800, quality: 70, t0: 0.08, t1: 0.18 },
  { src: 'magnific_abstract-watercolor-paint_UPYLdPdwny.png', out: 'faixa-terracota-oliva', width: 800, quality: 70 },
  { src: 'magnific_abstract-watercolor-paint_vQl8N1Oa47.png', out: 'faixa-pessego', width: 800, quality: 70 },
  { src: 'magnific_abstract-watercolor-paint_w4WsB6i7EI.png', out: 'faixa-verde', width: 800, quality: 70, t0: 0.07, t1: 0.16 },
  { src: 'magnific_abstract-watercolor-paint_yiVUmiBPW9.png', out: 'faixa-verde-terracota', width: 800, quality: 70 },
  { src: 'magnific_romantic-watercolor-lands_79clBToJAL.png', out: 'pao-de-acucar', width: 1100, quality: 78 },
  // Folha de elementos pequenos: recortada em peças
  { src: 'magnific_set-of-small-delicate-wat_s7A1M06l8e.png', out: 'passaros', crop: [140, 190, 520, 215] },
  { src: 'magnific_set-of-small-delicate-wat_s7A1M06l8e.png', out: 'coracao', crop: [830, 225, 150, 155] },
  { src: 'magnific_set-of-small-delicate-wat_s7A1M06l8e.png', out: 'raminho', crop: [560, 360, 175, 170] },
  { src: 'magnific_set-of-small-delicate-wat_s7A1M06l8e.png', out: 'traco-pontos', crop: [205, 565, 440, 115] },
  { src: 'magnific_set-of-small-delicate-wat_s7A1M06l8e.png', out: 'raminho-vertical', crop: [845, 515, 135, 190] },
  { src: 'magnific_simple-watercolor-olive-b_rg3bWDQxtc.png', out: 'ramo-oliveira', width: 900 },
  { src: 'magnific_small-delicate-watercolor_Ebwh6REuuO.png', out: 'raminho-flores' },
  { src: 'magnific_small-stylized-watercolor_6AdyaYliJO.png', out: 'cristo-redentor', width: 700 },
  { src: 'magnific_watercolor-illustration-o_jUZKTN3LD0.png', out: 'palmeiras-mancha', width: 700, t0: 0.06, t1: 0.14 },
  { src: 'magnific_watercolor-illustration-o_rg3bThoxtc.png', out: 'palmeiras-ilha', width: 700, t0: 0.06, t1: 0.14 },

  // Já transparentes (./assets/transparentes)
  { src: 'transparentes/magnific_loose-watercolor-floral-b_VXQY7JXMMU.png', out: 'buque-rosas', width: 800, quality: 80, transparent: true },
  // recorte exclui a assinatura do artista no canto inferior direito
  { src: 'transparentes/magnific_single-watercolor-flower-_BhkDZHPoQR.png', out: 'flor-peonia', width: 700, quality: 80, transparent: true, crop: [0, 0, 1200, 830] },
  { src: 'transparentes/magnific_delicate-watercolor-sprig_IfxdGnwtvE.png', out: 'raminho-botoes', width: 700, quality: 80, transparent: true },
  { src: 'transparentes/magnific_delicate-watercolor-sprig_rg3btVpxtc.png', out: 'raminho-flores-rosa', width: 700, quality: 80, transparent: true },
  { src: 'transparentes/magnific_soft-rounded-abstract-wat_Tdun4wHVNR.png', out: 'mancha-suave-terracota', width: 800, quality: 70, transparent: true },
  { src: 'transparentes/magnific_soft-rounded-abstract-wat_xSR5hQnjfW.png', out: 'mancha-suave-verde', width: 800, quality: 70, transparent: true },
  { src: 'transparentes/magnific_romantic-watercolor-illus_Lw2kmhoswO.png', out: 'casa-vista-rio', width: 1100, quality: 78, transparent: true },
  { src: 'transparentes/magnific_romantic-watercolor-lands_N2eOkOc6D9.png', out: 'pao-de-acucar-mar', width: 1100, quality: 78, transparent: true },
];

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

async function whitePoint(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const ch = [[], [], []];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < 12 || y < 12 || x >= w - 12 || y >= h - 12) {
        const k = (y * w + x) * 3;
        ch[0].push(data[k]);
        ch[1].push(data[k + 1]);
        ch[2].push(data[k + 2]);
      }
    }
  }
  return ch.map((v) => v.sort((a, b) => a - b)[v.length >> 1]);
}

async function passthrough({ src, out, crop, width, quality }) {
  let pipeline = sharp(`${SRC}/${src}`).ensureAlpha();
  if (crop) pipeline = pipeline.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  // extract/trim precisam de buffers intermediários para encadear
  pipeline = sharp(await pipeline.png().toBuffer()).trim({ threshold: 1 });
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  return pipeline.webp({ quality, alphaQuality: 85, effort: 6 });
}

async function process({ src, out, crop, width, t0 = 0.04, t1 = 0.12, quality = 82, transparent }) {
  if (transparent) {
    const result = await (await passthrough({ src, out, crop, width, quality })).toFile(`${OUT}/${out}.webp`);
    console.log(`✓ ${out}.webp  ${result.width}×${result.height}  ${(result.size / 1024).toFixed(0)} KB  (já transparente)`);
    return;
  }
  const file = `${SRC}/${src}`;
  const white = await whitePoint(file);

  let img = sharp(file).removeAlpha();
  if (crop) img = img.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const c = [0, 1, 2].map((n) => Math.min(1, data[i + n] / white[n]));
    const a = Math.max(1 - c[0], 1 - c[1], 1 - c[2]);
    if (a <= 0) continue; // papel puro → transparente
    for (let n = 0; n < 3; n++) rgba[j + n] = Math.round(((c[n] - (1 - a)) / a) * white[n]);
    rgba[j + 3] = Math.round(a * smoothstep(t0, t1, a) * 255);
  }

  let pipeline = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 });
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  const result = await pipeline
    .webp({ quality, alphaQuality: 85, effort: 6 })
    .toFile(`${OUT}/${out}.webp`);
  console.log(`✓ ${out}.webp  ${result.width}×${result.height}  ${(result.size / 1024).toFixed(0)} KB`);
}

mkdirSync(OUT, { recursive: true });
for (const asset of ASSETS) await process(asset);
