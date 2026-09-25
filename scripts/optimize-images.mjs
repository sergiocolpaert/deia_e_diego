// Converte as fotos de src/assets/images/originals em WebP (1600px e 800px).
// Requer `cwebp` (brew install webp). Uso: npm run images
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'src/assets/images/originals';
const OUT = 'src/assets/images';
const SIZES = [1600, 800];

mkdirSync(OUT, { recursive: true });

for (const file of readdirSync(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const { name } = parse(file);
  for (const width of SIZES) {
    const out = join(OUT, `${name}-${width}.webp`);
    execFileSync('cwebp', ['-quiet', '-q', '78', '-resize', String(width), '0', join(SRC, file), '-o', out]);
    console.log('✓', out);
  }
}
