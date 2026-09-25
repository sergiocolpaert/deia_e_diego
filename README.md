# Convite — Andrea & Diego · 03.04.2027

Convite digital bilíngue (PT/ES) no formato "uma carta". Página estática; RSVP, lista e logística ficam no casar.com.

## Rodar

```bash
npm install
npm run dev      # servidor local
npm run build    # gera dist/ (é isso que vai para a hospedagem)
npm run images   # converte fotos de src/assets/images/originals em WebP (requer cwebp)
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Textos PT / ES | `src/content/pt.js`, `src/content/es.js` |
| Data, local, links (casar.com, mapa) | `src/config.js` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Fotos | coloque em `src/assets/images/originals/`, rode `npm run images`, ajuste `src/gallery.js` |

## Fases

- [x] 1. Setup (Vite + vanilla JS, Git, tokens, fontes)
- [x] 2. Estrutura estática
- [ ] 3. Estilo base e responsividade
- [ ] 4. Textura leve + selo
- [ ] 5. Conteúdo real (fotos + textos aprovados)
- [ ] 6. Animações de scroll (GSAP)
- [ ] 7. Toggle de idioma
- [ ] 8. CTA casar.com (URL real)
- [ ] 9. QA
- [ ] 10. Deploy

## Pendências com o casal

- [ ] Direção criativa confirmada (adotada: **A — carta**)
- [ ] Texto da carta (PT e ES)
- [ ] Endereço completo do Espaço Barcelona → `src/content/*.js` + `config.venue.mapsUrl`
- [ ] Horário de chegada
- [ ] Dress code
- [ ] URL real do casar.com → `config.rsvpUrl`
- [ ] Fotos escolhidas (3–6)
- [ ] Informações extras (hospedagem, cerimonialista…)
