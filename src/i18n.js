import pt from './content/pt.js';
import es from './content/es.js';

export const dictionaries = { pt, es };
export const LANGS = { pt: 'pt-BR', es: 'es' };

const get = (dict, path) => path.split('.').reduce((o, k) => o?.[k], dict);

/**
 * Aplica um dicionário ao DOM:
 *  - data-i18n="a.b"            → textContent
 *  - data-i18n-list="a.b"       → um <p> por item do array
 *  - data-i18n-attr="alt:a.b"   → atributos (vários separados por ";")
 */
export function applyLanguage(lang) {
  const dict = dictionaries[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = get(dict, el.dataset.i18n);
    if (typeof value === 'string') {
      el.textContent = value;
      el.classList.toggle('is-empty', value === '');
    }
  });

  document.querySelectorAll('[data-i18n-list]').forEach((el) => {
    const items = get(dict, el.dataset.i18nList) ?? [];
    el.replaceChildren(
      ...items.map((text) => Object.assign(document.createElement('p'), { textContent: text }))
    );
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, path] = pair.split(':').map((s) => s.trim());
      const value = get(dict, path);
      if (value != null) el.setAttribute(attr, value);
    });
  });

  document.documentElement.lang = LANGS[lang];
  document.title = dict.meta.title;
}

const STORAGE_KEY = 'convite-lang';

/**
 * Idioma inicial, em ordem de prioridade:
 *  1. ?lang=es na URL (link direto para convidados de língua espanhola)
 *  2. escolha anterior do convidado neste navegador
 *  3. idioma do navegador (es-* → espanhol)
 *  4. português
 */
export function detectLanguage() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (Object.hasOwn(dictionaries, fromUrl ?? '')) return fromUrl;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (Object.hasOwn(dictionaries, saved ?? '')) return saved;
  } catch {
    /* storage bloqueado (aba anônima etc.) */
  }

  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'pt';
}

export function rememberLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* sem persistência, sem problema */
  }

  // Mantém a URL compartilhável no idioma atual
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}
