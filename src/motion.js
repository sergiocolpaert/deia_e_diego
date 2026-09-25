// Animações de scroll (GSAP) — só fade/slide entre seções, nada de lógica de tempo.
// Marcação no HTML:
//   data-reveal           → sobe e aparece ao entrar na tela
//   data-reveal="intro"   → entrada do hero ao carregar a página
//   data-reveal="stamp"   → selo "carimbando"
//   data-reveal="route"   → traço dos três pontos se desenha, contas acendem, nomes surgem
//   data-reveal="deco"    → aquarela surge em fade lento (as do hero, na abertura)
// Com prefers-reduced-motion a classe .motion não é aplicada e nada aqui roda.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out';

// Traço dos três pontos: a linha se desenha e as contas acendem em sequência
function drawDots(host) {
  const line = host.querySelector('.dots__line');
  const beads = host.querySelectorAll('.dots__bead');
  return gsap
    .timeline()
    .fromTo(line, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
    .from(beads, { scale: 0, duration: 0.5, ease: 'back.out(3)', stagger: 0.45 }, 0.25);
}

function intro() {
  const tl = gsap.timeline({ delay: 0.15 });
  tl.to('[data-reveal="intro"]', {
    autoAlpha: 1,
    y: 0,
    startAt: { y: 24 },
    duration: 1.6,
    ease: EASE,
    stagger: 0.12,
  });
  const dots = document.querySelector('.hero__dots');
  if (dots) tl.add(drawDots(dots), 0.5);

  const decos = gsap.utils.toArray('.hero [data-reveal="deco"]');
  decos.forEach((el) => (el.dataset.revealed = ''));
  tl.to(decos, { autoAlpha: 1, scale: 1, startAt: { scale: 0.94 }, duration: 2.4, ease: 'power2.out', stagger: 0.2 }, 0);
}

function decos() {
  gsap.utils.toArray('[data-reveal="deco"]').forEach((el) => {
    if (el.closest('.hero')) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      onEnter: () => reveal([el], { autoAlpha: 1, duration: 2, ease: 'power1.out' }),
    });
  });

  // Revoada da seção "Três países" atravessa devagar conforme a rolagem
  gsap.fromTo(
    '.countries__birds',
    { x: -24, y: 12 },
    {
      x: 32,
      y: -14,
      ease: 'none',
      scrollTrigger: { trigger: '.countries', start: 'top bottom', end: 'bottom top', scrub: true },
    }
  );
}

const FADE_UP = { autoAlpha: 1, y: 0, startAt: { y: 40 }, duration: 1.4, ease: EASE, stagger: 0.15 };
const STAMP = { autoAlpha: 1, scale: 1, startAt: { scale: 1.6 }, duration: 0.7, ease: 'back.out(2.2)' };

// Revela cada elemento uma única vez, venha o gatilho de onde vier.
function reveal(targets, vars) {
  const pending = targets.filter((el) => !('revealed' in el.dataset));
  pending.forEach((el) => (el.dataset.revealed = ''));
  if (pending.length) gsap.to(pending, vars);
}

function reveals() {
  // Irmãos que entram juntos (fotos, blocos de informação) saem em sequência
  ScrollTrigger.batch('[data-reveal=""]', {
    start: 'top 88%',
    onEnter: (batch) => reveal(batch, FADE_UP),
  });
}

function stamps() {
  gsap.utils.toArray('[data-reveal="stamp"]').forEach((seal) => {
    ScrollTrigger.create({
      trigger: seal,
      start: 'top 92%',
      onEnter: () => reveal([seal], STAMP),
    });
  });
}

function routes() {
  gsap.utils.toArray('[data-reveal="route"]').forEach((route) => {
    ScrollTrigger.create({
      trigger: route,
      start: 'top 85%',
      onEnter: () => {
        if ('revealed' in route.dataset) return;
        route.dataset.revealed = '';
        gsap
          .timeline()
          .set(route, { autoAlpha: 1 })
          .add(drawDots(route))
          .from(route.querySelectorAll('li'), { autoAlpha: 0, y: 12, duration: 0.9, ease: EASE, stagger: 0.45 }, 0.35);
      },
    });
  });
}

// Página aberta já rolada (reload, link com #âncora): o que ficou acima da tela
// aparece sem animação — senão ficaria invisível ao rolar de volta.
function revealPassed() {
  const passed = gsap.utils
    .toArray('[data-reveal]:not([data-revealed])')
    .filter((el) => el.getBoundingClientRect().bottom < 0);
  passed.forEach((el) => (el.dataset.revealed = ''));
  gsap.set(passed, { autoAlpha: 1, y: 0, scale: 1 });
}

export function initMotion() {
  if (!document.documentElement.classList.contains('motion')) return;
  window.__motionReady = true;

  intro();
  reveals();
  stamps();
  routes();
  decos();
  ScrollTrigger.addEventListener('refresh', revealPassed);

  // Fontes web mudam a altura das seções: recalcula os gatilhos quando carregarem
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export const refreshMotion = () => ScrollTrigger.refresh();

// Troca de conteúdo com um fade curto (instantâneo com reduced motion)
export function crossfade(targets, swap) {
  if (!document.documentElement.classList.contains('motion')) {
    swap();
    return;
  }
  gsap
    .timeline()
    .to(targets, { opacity: 0, duration: 0.2, ease: 'power1.in' })
    .add(swap)
    .to(targets, { opacity: 1, duration: 0.35, ease: 'power1.out', clearProps: 'opacity' });
}

// Acesso pelo console durante o desenvolvimento
if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger });
