import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/texture.css';
import './styles/watercolor.css';

import { config, mapsHref } from './config.js';
import { gallery } from './gallery.js';
import { applyLanguage, detectLanguage, rememberLanguage } from './i18n.js';
import { crossfade, initMotion, refreshMotion } from './motion.js';
import { renderOrnaments } from './ornaments.js';

function renderGallery() {
  const grid = document.querySelector('[data-gallery]');
  grid.replaceChildren(
    ...gallery.map((photo, i) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery__item';
      figure.dataset.reveal = '';
      const frame = document.createElement('div');
      frame.className = 'gallery__frame';
      const img = document.createElement('img');
      img.src = photo.src;
      img.srcset = `${photo.srcSmall} 800w, ${photo.src} 1600w`;
      img.width = 1600;
      img.height = 2400;
      img.sizes = '(min-width: 48rem) 33vw, 100vw';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.i18nAttr = `alt:gallery.alt.${i}`;
      frame.append(img);
      figure.append(frame);
      return figure;
    })
  );
}

function wireLinks() {
  document.querySelector('[data-maps]').href = mapsHref();

  const rsvp = document.querySelector('[data-rsvp]');
  if (config.rsvpUrl) {
    rsvp.href = config.rsvpUrl;
  } else {
    rsvp.setAttribute('aria-disabled', 'true');
    document.querySelector('[data-rsvp-pending]').hidden = false;
  }
}

function setLanguage(lang) {
  applyLanguage(lang);
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}

function wireLanguageSwitch() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (btn.getAttribute('aria-pressed') === 'true') return;
      rememberLanguage(lang);
      crossfade('main, .site-footer', () => {
        setLanguage(lang);
        refreshMotion(); // textos mudam de altura
      });
    });
  });
}

renderOrnaments();
renderGallery();
wireLinks();
setLanguage(detectLanguage());
wireLanguageSwitch();
initMotion();
