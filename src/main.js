import './styles/tokens.css';
import './styles/base.css';

import { config, mapsHref } from './config.js';
import { gallery, venue, venueSmall } from './gallery.js';
import { applyLanguage } from './i18n.js';

function renderGallery() {
  const grid = document.querySelector('[data-gallery]');
  grid.replaceChildren(
    ...gallery.map((photo, i) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery__item';
      const img = document.createElement('img');
      img.src = photo.src;
      img.srcset = `${photo.srcSmall} 800w, ${photo.src} 1600w`;
      img.sizes = '(min-width: 48rem) 33vw, 100vw';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.i18nAttr = `alt:gallery.alt.${i}`;
      figure.append(img);
      return figure;
    })
  );
}

function wireLinks() {
  const venueImg = document.querySelector('[data-venue]');
  venueImg.src = venue;
  venueImg.srcset = `${venueSmall} 800w, ${venue} 1600w`;
  venueImg.sizes = '(min-width: 48rem) 60vw, 100vw';

  document.querySelector('[data-maps]').href = mapsHref();

  const rsvp = document.querySelector('[data-rsvp]');
  if (config.rsvpUrl) {
    rsvp.href = config.rsvpUrl;
  } else {
    rsvp.setAttribute('aria-disabled', 'true');
    document.querySelector('[data-rsvp-pending]').hidden = false;
  }
}

renderGallery();
wireLinks();
applyLanguage('pt');
