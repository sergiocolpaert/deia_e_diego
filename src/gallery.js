// Fotos da galeria (3–6). Para trocar: coloque o original em images/originals,
// rode `npm run images` e atualize os imports abaixo. O alt vem de content/*.js.
import c1 from './assets/images/placeholder-couple1-1600.webp';
import c1s from './assets/images/placeholder-couple1-800.webp';
import c2 from './assets/images/placeholder-couple2-1600.webp';
import c2s from './assets/images/placeholder-couple2-800.webp';
import c3 from './assets/images/placeholder-couple3-1600.webp';
import c3s from './assets/images/placeholder-couple3-800.webp';

export const gallery = [
  { src: c1, srcSmall: c1s },
  { src: c2, srcSmall: c2s },
  { src: c3, srcSmall: c3s },
];

export { default as venue } from './assets/images/placeholder-venue-1600.webp';
export { default as venueSmall } from './assets/images/placeholder-venue-800.webp';
