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
