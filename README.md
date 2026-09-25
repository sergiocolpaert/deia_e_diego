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
| Ornamentos (traço dos três pontos) | `src/ornaments.js` |
| Fotos | coloque em `src/assets/images/originals/`, rode `npm run images`, ajuste `src/gallery.js` |

## Idioma

O convite abre em espanhol se o link tiver `?lang=es`, se o convidado já escolheu ES antes, ou se o navegador estiver em espanhol; senão, em português. Para convidados de língua espanhola, envie o link com `?lang=es`.

## Fases

- [x] 1. Setup (Vite + vanilla JS, Git, tokens, fontes)
- [x] 2. Estrutura estática
- [x] 3. Estilo base e responsividade
- [x] 4. Textura leve + selo
- [ ] 5. Conteúdo real (fotos + textos aprovados)
- [x] 6. Animações de scroll (GSAP)
- [x] 7. Toggle de idioma
- [ ] 8. CTA casar.com (URL real)
- [ ] 9. QA
- [ ] 10. Deploy

## Brand book

A adaptação à identidade visual "Três países. Uma história." está planejada em [docs/planejamento-brandbook.md](docs/planejamento-brandbook.md) (fases B1–B8).

## Pendências com o casal

- [ ] Direção criativa confirmada (adotada: **A — carta**)
- [ ] Texto da carta (PT e ES)
- [x] Endereço completo do Espaço Barcelona (Estrada Leopoldo Fróes, 166 B)
- [ ] Horário de chegada
- [ ] Dress code
- [ ] URL real do casar.com → `config.rsvpUrl`
- [ ] Fotos escolhidas (3–6)
- [ ] Informações extras (hospedagem, cerimonialista…)
