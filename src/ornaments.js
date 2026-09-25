// Ornamentos da marca (brand book §06):
//   <span data-ornament="dots"></span>  → traço fino ondulado com três contas douradas
// A linha é SVG esticado na largura do container; as contas são elementos HTML
// posicionados em % sobre ela, para continuarem redondas em qualquer largura.
// Ficam em 1/6, 1/2 e 5/6 da largura, alinhando com uma grade de 3 colunas.
// O coração é CSS puro (ver .heart em components.css).
const SVG_NS = 'http://www.w3.org/2000/svg';
const W = 300;
const H = 40;
const WAVE = 'M2 24 C 40 10, 70 34, 110 24 S 190 8, 230 22 S 280 30, 298 18';
const STOPS = [1 / 6, 1 / 2, 5 / 6];

// Ponto do caminho com o x mais próximo do alvo (busca por amostragem)
function pointAtX(path, targetX) {
  const total = path.getTotalLength();
  let best = path.getPointAtLength(0);
  for (let l = 0; l <= total; l += 0.5) {
    const p = path.getPointAtLength(l);
    if (Math.abs(p.x - targetX) < Math.abs(best.x - targetX)) best = p;
  }
  return best;
}

function dots() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.classList.add('dots__svg');

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', WAVE);
  path.setAttribute('pathLength', '1'); // facilita desenhar o traço com stroke-dashoffset
  path.classList.add('dots__line');
  svg.append(path);

  const wrap = document.createElement('span');
  wrap.className = 'dots';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.append(svg);

  // getPointAtLength precisa do SVG no documento
  document.body.append(wrap);
  for (const stop of STOPS) {
    const { x, y } = pointAtX(path, W * stop);
    const bead = document.createElement('span');
    bead.className = 'dots__bead';
    bead.style.left = `${(x / W) * 100}%`;
    bead.style.top = `${(y / H) * 100}%`;
    wrap.append(bead);
  }
  wrap.remove();
  return wrap;
}

export function renderOrnaments() {
  document.querySelectorAll('[data-ornament="dots"]').forEach((host) => host.replaceChildren(dots()));
}
