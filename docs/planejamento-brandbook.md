# Planejamento — Adaptação do site ao Brand Book "Três países. Uma história."

Set 25, 2026 · referências em `docs/brandbook/`

O site v1 (fases 1–4, 6 e 7) foi construído sobre a identidade da v4 (navy + terracota, Cormorant/Great Vibes/Jost, monograma A&D). O brand book enviado pela cliente define uma **identidade nova e completa**. Este documento analisa o material e planeja a adaptação sem descartar a base técnica (estrutura, i18n, animações, deploy).

---

## 1. Resumo

- **Muda quase toda a camada visual:** paleta, tipografia, monograma, ornamentos e textura (papel → aquarela).
- **A base técnica fica:** estrutura de seções, arquivos de conteúdo PT/ES, animações GSAP, troca de idioma e Git.
- **O conceito fica mais forte:** "Três países. Uma história." (Colômbia · Brasil · Equador) dá à carta um fio condutor e pede uma seção nova.
- ~~**Uma pendência bloqueia:** o monograma do brand book é **A & E**.~~ **Resolvido (25/09):** o monograma é **A & D**. Mantemos o monograma atual, recolorido em ouro.

---

## 2. Análise do brand book

### 2.1 Conceito
- Mote: **"Três países. Uma história."** A história do casal liga Colômbia, Brasil e Equador.
- Atributos: leveza, natureza, verdade, afeto. Tom romântico, elegante, atemporal.
- Linguagem visual: aquarela em tons suaves, folhagens, um traço fino ligando três pontos dourados (a jornada entre os três países) e um coração pequeno como ornamento.

### 2.2 Paleta

| Cor | HEX (rótulo) | Amostra medida na imagem | Contraste s/ off-white | Uso no site |
| --- | --- | --- | --- | --- |
| Terracota | #D27A5A (RGB 210 122 90)* | ≈ #D06A44 | 2.9 : 1 | Manchas, destaques grandes, faixa de CTA |
| Areia | #E7D6B8 | ≈ #ECD8BF | 1.3 : 1 | Fundos secundários, blocos |
| Verde oliva | #8FA285 | ≈ #9BA085 | 2.5 : 1 | Folhagens, ilustração |
| Ouro seco | #C8A15A | ≈ #CB9B5B | 2.2 : 1 | Pontos, coração, monograma, filetes |
| Off white | #F7F3EE | ≈ #FAF7F0 | — | Fundo principal |

\* O HEX impresso está ilegível e não bate com o RGB; a amostra do círculo sai mais saturada.

**Proporção sugerida:** 60% terracota · 25% areia · 10% verde · 5% (ouro). Nas próprias aplicações (convite, menu, cartões), porém, o que domina é o **fundo off-white/areia**, com a terracota concentrada nas manchas de aquarela. No site vamos seguir o que as aplicações mostram, não a barra literal.

**Ponto crítico de acessibilidade:** nenhuma cor da marca tem contraste suficiente para texto corrido sobre o off-white (o mínimo AA é 4.5 : 1). O brand book também **não define uma cor de texto**. Proposta de variantes funcionais, derivadas da própria paleta:

| Token | Valor | Contraste | Para quê |
| --- | --- | --- | --- |
| Tinta (texto) | #4A3A30 (marrom quente) | 9.8 : 1 | Corpo de texto, títulos |
| Terracota profunda | #A8522F | 4.9 : 1 | Links, botões, eyebrows, fundo da faixa de RSVP |
| Ouro profundo | #8A6A2F | 4.5 : 1 | Legendas e rótulos pequenos em dourado |
| Oliva profundo | #5E6B52 | 5.1 : 1 | Textos pequenos em verde, se houver |

### 2.3 Tipografia

| Papel | Fonte | Substitui (v1) |
| --- | --- | --- |
| Títulos e destaques | **Cinzel** Regular (só versais) | Cormorant Garamond |
| Subtítulos | **Montserrat** Medium | Jost |
| Textos | **Montserrat** Regular | Cormorant Garamond |
| Detalhes / frases | **Allura** Regular | Great Vibes |

Todas estão no Google Fonts (licença livre), então a troca é direta. Atenção: a carta passa de serifada (Cormorant) para Montserrat, que deixa o texto mais "limpo" e menos "carta manuscrita". A Allura compensa nas frases de abertura e na assinatura.

### 2.4 Monograma
- Versões: **principal** (A & E + ramo de oliva + ponto dourado), **reduzida** (A E sobre o traço de três pontos), **círculo**, **negativa** (sobre terracota) e **dourada**.
- Regras: área de proteção, tamanho mínimo de 1,5 cm e usos incorretos (não recolorir, não trocar o ramo, não sobrepor folhagem às letras).
- Letras em serifa clássica (estilo Cinzel) na cor ouro/bronze.
- ✅ O brand book mostra **A & E**, mas o casal confirmou **A & D**. Mantemos o monograma atual (letras A e D ligadas por um floreio), em ouro.

### 2.5 Elementos gráficos e ilustrações
- **Manchas de aquarela** nas quatro cores.
- **Traço dos três pontos:** a assinatura gráfica da marca.
- **Folhagens** soltas, **coração** dourado como ornamento sob os títulos.
- **Ilustrações do Rio em aquarela:** Cristo Redentor, Pão de Açúcar, Lagoa. O kit extra traz ainda flores, palmeiras, pássaros e um Pão de Açúcar ao pôr do sol.
- **Padrão aquarelado:** composições de canto e de fundo, com a nota "usar com moderação para não poluir visualmente".

### 2.6 Aplicações que informam o site
- **Convite impresso (verso):** "Com a bênção de nossos pais, convidamos para o nosso casamento · 03 de abril de 2027 · sábado, às 16h30 · Espaço Barcelona, Niterói – RJ · Três países. Uma história." É praticamente o texto das seções Hero e Informações, e **confirma o horário 16h30**.
- **Envelope com lacre de cera terracota:** valida o selo que já existe no site, agora com o monograma novo.
- **Cartão de confirmação: "Contamos com você!"** Vira o título da seção de RSVP.
- **Tags e adesivos** com "Três países. Uma história." reforçam o mote como tagline.
- Caixas, gravata, prato e papel de seda não se aplicam ao site. Detalhe: a caixa dos pais usa **azul-marinho**, única aparição de navy na marca.

### 2.7 Inconsistências no material
O brand book tem sinais claros de geração por IA. Por isso não dá para tirar dele arquivos finais, só a direção.
- Textos corrompidos: "IDENTIDABE", "AOUATELA", "POR UU SOL", "Fundo Bramo", "Transpareme".
- Códigos de cor inconsistentes (HEX × RGB da terracota) e barra de proporção com a cor errada no segmento de 5%.
- Numeração de páginas quebrada ("33" em vez de 03).
- Frente do convite diz **"Rio de Janeiro – RJ"**, o verso diz **"Niterói – RJ"**.
- As imagens são mockups em baixa resolução. **Precisamos dos arquivos-fonte** (PNG transparente, SVG) de monograma, aquarelas e ilustrações.

---

## 3. Impacto no site atual

| Elemento | Hoje (v1) | Com o brand book | Ação |
| --- | --- | --- | --- |
| Paleta | Navy + terracota, fundo creme | Terracota, areia, oliva, ouro, off-white | Reescrever `tokens.css` com as cores da marca + variantes de contraste |
| Tipografia | Cormorant / Great Vibes / Jost | Cinzel / Allura / Montserrat | Trocar fontes e a escala tipográfica (Cinzel pede tamanhos menores e mais espaçamento entre letras) |
| Hero | Nomes em script grande | Monograma + tagline + data + aquarela nos cantos | Novo hero: monograma principal, "Três países. Uma história.", data, local |
| Carta | Cormorant itálico, papel com dobra | Montserrat + Allura nas frases | Manter a carta; saudação e assinatura em Allura; aquarela sutil no canto |
| Nova seção | — | Mote dos três países | **"Três países"**: Colômbia · Brasil · Equador ligados pelo traço de três pontos (conteúdo com o casal) |
| Galeria | Molduras de foto impressa | Sem diretriz específica | Manter molduras, fundo off-white, folhagens pontuais |
| Informações | Filetes navy/cinza | Coração + traço de pontos como divisores | Trocar divisores; incluir **16h30** |
| Como chegar | Foto do local (placeholder) | Ilustração do Pão de Açúcar | Usar o **Pão de Açúcar em aquarela**: é a vista do Espaço Barcelona, em Niterói, para o Rio |
| RSVP | Faixa navy, botão em gradiente | Versão negativa (terracota) + "Contamos com você!" | Faixa em terracota profunda, texto off-white, botão off-white |
| Selo | Cera terracota + A&D | Lacre terracota no envelope | Manter o selo com o monograma A & D, na terracota da marca |
| Textura | Grão de papel + vinheta | Papel texturizado + aquarela | Manter o grão bem sutil; aquarelas nos cantos das seções, com moderação |
| Favicon | Selo sem letras | Monograma reduzido | Monograma reduzido ou selo com as iniciais |
| Animações | Fade/slide, selo carimbando | — | Acrescentar o **traço dos três pontos se desenhando** no scroll; aquarelas surgindo em fade lento |

Continua valendo a regra do plano v1 de usar botânicos e ilustrações como imagem estática, não gerados via JS. O brand book reforça isso.

---

## 4. Decisões necessárias

| # | Decisão | Recomendação |
| --- | --- | --- |
| D1 | Monograma **A & E** ou **A & D**? | ✅ **A & D**: mantém o monograma atual (PNG da v4) |
| D2 | Cor do texto (a marca não define) | Marrom quente **#4A3A30**, harmoniza com a paleta. Navy fica só se a cliente quiser manter o vínculo com a v4 |
| D3 | Qual terracota é a oficial (#D27A5A × amostra) | Pedir o HEX correto. Até lá, #D27A5A em superfícies e #A8522F em texto e botões |
| D4 | Estrutura do site | Manter a carta e **acrescentar a seção "Três países"** (combina as opções A e B do plano v1) |
| D5 | Local no convite: "Rio de Janeiro" ou "Niterói" | Niterói, onde fica o local. Avisar a cliente para corrigir também o impresso |

---

## 5. Arquivos a pedir à cliente

1. **Monograma** em SVG ou PNG transparente (≥ 2000 px): versões principal, reduzida, círculo, negativa e dourada.
2. **Aquarelas** (manchas e composições de canto) em PNG transparente de alta resolução.
3. **Ilustrações**: Pão de Açúcar (com e sem pôr do sol), Cristo Redentor, Lagoa.
4. **Folhagens e flores** soltas, em PNG transparente.
5. **Traço dos três pontos** e coração, em SVG se houver. Se não houver, redesenhamos em vetor.
6. **Códigos de cor oficiais** confirmados (principalmente a terracota).
7. **Conteúdo da seção "Três países"**: quem é de onde, e se existe uma frase curta para cada país.

Sem os arquivos-fonte, a alternativa é recortar do mockup, que tem baixa resolução e fundo não transparente. Isso não serve para produção.

---

## 6. Plano de implementação (fases B)

As fases B1, B2 e B5 (parcial) não dependem da cliente e podem começar já.

| Fase | Entrega | Depende de |
| --- | --- | --- |
| **B1. Tokens de marca** | Nova paleta + variantes de contraste, Cinzel/Montserrat/Allura, escala tipográfica revisada | D2, D3 (dá para começar com as recomendações) |
| **B2. Ornamentos em SVG** | Coração e traço dos três pontos desenhados em vetor, como componentes reutilizáveis (divisores, hero, rodapé) | — |
| **B3. Monograma, selo e favicon** | Monograma no hero e no rodapé; selo com o monograma novo; favicon | D1 + arquivo do monograma |
| **B4. Aquarelas** | Composições de canto por seção (máximo uma por seção), WebP com transparência, lazy-load | Arquivos de aquarela |
| **B5. Reestruturação de conteúdo** | Hero com tagline; carta revisada; seção "Três países"; 16h30; RSVP "Contamos com você!" (PT/ES) | Estrutura: já. Textos finais: casal |
| **B6. Ilustrações** | Pão de Açúcar em "Como chegar"; Cristo e Lagoa pontuais, se couber | Arquivos de ilustração |
| **B7. Animações da marca** | Traço dos três pontos se desenhando no scroll; pontos acendendo em sequência; aquarelas em fade lento | B2, B4 |
| **B8. QA** | Contraste AA, peso das aquarelas (meta: < 1,5 MB na primeira carga), mobile, revisão do casal | Todas |

### Status (25/09)

- [x] **B1:** tokens da marca, fontes Cinzel/Montserrat/Allura, variantes de contraste
- [x] **B2:** coração (máscara CSS) e traço dos três pontos (`src/ornaments.js`)
- [x] **B3 (parcial):** monograma A & D em ouro no hero; selo e favicon na terracota da marca
- [x] **B4:** aquarelas da marca com fundo removido (`npm run brand-assets`) no hero, carta, galeria, informações e rodapé
- [x] **B5 (estrutura):** hero com o mote, seção "Três países", 16h30, RSVP "Contamos com você!", tagline no rodapé
- [x] **B6:** Pão de Açúcar em "Como chegar" (substitui a foto placeholder); revoada na seção "Três países"
- [x] **B7:** traço dos três pontos se desenha; aquarelas surgem em fade lento; revoada em parallax
- [ ] B8: QA

### Aquarelas: onde cada uma entrou

| Elemento | Onde |
| --- | --- |
| Buquê de rosas + mancha suave terracota | Hero, canto superior esquerdo |
| Peônia + raminho de flores rosa + mancha suave verde | Hero, canto inferior direito |
| Raminho de botões | Canto do papel da carta |
| Coração | Despedida da carta |
| Pássaros | Acima do traço em "Três países" |
| Faixa terracota-oliva | Atrás do título "Nós dois" |
| Raminho | Divisor entre os blocos de Informações |
| Casa com vista para o Pão de Açúcar e o Cristo | "Como chegar" |
| Palmeiras + mancha terracota-oliva | Rodapé |
| **Reserva** (processados, não usados) | Pão de Açúcar (duas versões), Cristo Redentor, palmeiras na ilha, ramo de oliveira, raminho de flores, manchas e faixas antigas, raminho vertical, traço de pontos |

**Parallax** (`data-parallax` no HTML, velocidade relativa): aquarelas do hero sobem em ritmos diferentes ao rolar; o conteúdo do hero desce devagar e esmaece; as fotos da galeria deslizam dentro da moldura; carta, galeria, "Como chegar" e rodapé têm aquarelas em profundidade. Tudo desligado com "reduzir movimento".

Na sequência, entram as fases 8 (URL do casar.com), 9 (QA final) e 10 (deploy) do plano v1.

---

## 7. Pendências atualizadas com a cliente

- [x] Monograma: A & D (mantido o atual)
- [ ] Arquivos-fonte: monograma, aquarelas, ilustrações, folhagens
- [ ] HEX oficial da terracota
- [ ] Conteúdo da seção "Três países" (quem é de onde)
- [ ] Confirmar 16h30 como horário da cerimônia e se há horário de chegada diferente
- [ ] "Rio de Janeiro" × "Niterói" no convite impresso
- [ ] Texto da carta (PT/ES)
- [ ] Dress code
- [ ] URL do casar.com
- [ ] Fotos da galeria (3–6, originais)
- [x] Endereço: Estrada Leopoldo Fróes, 166 B – São Francisco, Niterói – RJ
