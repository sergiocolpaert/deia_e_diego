// Dados do evento que NÃO mudam com o idioma.
// Campos marcados com `null` estão pendentes com o casal (ver README → Pendências).
export const config = {
  couple: ['Andrea', 'Diego'],
  date: '2027-04-03',

  venue: {
    name: 'Espaço Barcelona',
    city: 'Niterói · RJ',
    address: 'Estrada Leopoldo Fróes, 166 B - São Francisco, Niterói - RJ',
    // Link oficial do Google Maps (opcional) — sem ele, o botão busca pelo endereço
    mapsUrl: null,
  },

  // URL real do casar.com — PENDENTE
  rsvpUrl: null,
};

export const mapsHref = () =>
  config.venue.mapsUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${config.venue.name}, ${config.venue.address}`)}`;
