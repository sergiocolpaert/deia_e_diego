// Dados do evento que NÃO mudam com o idioma.
// Campos marcados com `null` estão pendentes com o casal (ver README → Pendências).
export const config = {
  couple: ['Andrea', 'Diego'],
  date: '2027-04-03',

  venue: {
    name: 'Espaço Barcelona',
    city: 'Niterói · RJ',
    // Link oficial do Google Maps — PENDENTE (usa busca pelo nome como fallback)
    mapsUrl: null,
  },

  // URL real do casar.com — PENDENTE
  rsvpUrl: null,
};

export const mapsHref = () =>
  config.venue.mapsUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${config.venue.name} Niterói RJ`)}`;
