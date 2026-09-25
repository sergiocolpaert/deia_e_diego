// Animações de scroll (GSAP) — só fade/slide entre seções, nada de lógica de tempo.
// Marcação no HTML:
//   data-reveal           → sobe e aparece ao entrar na tela
//   data-reveal="intro"   → entrada do hero ao carregar a página
//   data-reveal="stamp"   → selo "carimbando"
// Com prefers-reduced-motion a classe .motion não é aplicada e nada aqui roda.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out';

function intro() {
  gsap.to('[data-reveal="intro"]', {
    autoAlpha: 1,
    y: 0,
    startAt: { y: 24 },
    duration: 1.6,
    ease: EASE,
    stagger: 0.12,
    delay: 0.15,
  });
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
  ScrollTrigger.addEventListener('refresh', revealPassed);

  // Fontes web mudam a altura das seções: recalcula os gatilhos quando carregarem
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export const refreshMotion = () => ScrollTrigger.refresh();

// Acesso pelo console durante o desenvolvimento
if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger });
