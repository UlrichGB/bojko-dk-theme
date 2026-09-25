# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

The public description of the theme is `README.md`. This file holds only what a
future session needs in order not to redo settled work.

## Settled decisions

### Topbaren bliver, som den er (2026-09-17)

Kvalitetsrevisionen af 2026-09-16 (`bojko-dk-theme` vs. `hugo-PaperMod`) målte
topbarens etiketter til **2,54:1** — `.nav-item` i 82 % hvid `#F4DCC8` på
`--color-accent` `#E9631A` — og **3,09:1** for hover/aktuel i ren `#F6F6EE`.
Begge falder for WCAG AA's 4,5:1 for normal tekst. Revisionen foreslog to veje:
en mørkere bjælke (`--color-accent-600` `#C74F0E` giver 4,6:1) eller en mørk
etiket.

**Ulrich har set begge og valgt ingen af dem.** Bjælken står på `#E9631A` med
lyse etiketter. Det er et bevidst designvalg, ikke en overset fejl.

Derfor: gør ikke bjælken mørkere, gør ikke etiketterne mørkere, og rejs ikke
punktet igen. Al anden kontrast i temaet er bragt op over 4,5:1 — den eneste
tilbageværende AA-fejl er denne ene, og den er besluttet.

`--color-neutral-600` (`#7C7C6D`, 3,90:1 på arket) er af samme grund ikke
længere i brug som tekstfarve nogen steder; dæmpet tekst bruger
`--color-neutral-700` (`#5F5F52`, 5,96:1). Tokenet bliver stående i
`01-variabler.css` til ikke-tekstbrug.

### Temaet kender ikke sitets mapper (2026-09-21)

Temaet hardkodede sektionsnavnet `artikler` fem steder. Da `bojko-dk` omdøbte
sektionen til `blog`, byggede sitet uden en eneste fejl og mistede tavst
forsidens fire teasere, 404-sidens "Nyeste indlæg" og "Hele arkivet" samt hele
arkivvælgeren. Navnene ligger nu i konfigurationen — se tabellen i `README.md`
og `_partials/skrivesektion.html`.

**Prøven, når du finder en streng mere:** ville et ANDET site gå i stykker
eller blive tvunget til at hedde det samme? Ellers står den, hvor den står.
Efterprøvet mod hele `layouts/` 2026-09-21, og disse faldt med vilje IKKE ud:

- `tags` (`.GetTerms "tags"`, `site.GetPage "/tags"`) er Hugos EGEN standard-
  taksonomi. Et site, der intet sætter, får den. Og fladen omkring den er
  temaets dansk — "Emner", "Alle emner".
- `series` i `_partials/hoved-data.html` vælger kun en ordlyd i en udledt
  `<meta description>`. Et site uden den taksonomi rammer aldrig grenen.
- `static/favicon.ico` m.fl. i `baseof.html` antager Hugos standard-`staticDir`.
  Hugo giver ingen skabelonadgang til den indstilling, så den kan ikke læses.
- `site.Language.Lang "da"` i `llms.txt` spørger om sitets FAKTISKE sprog.
- CSS-klasser, partial-navne, menunavnene `main`/`foot` og `layout: profil` er
  temaets eget ordforråd, ikke sitets struktur.

`noter` er af samme grund heller ikke en parameter. Temaet ejer den type: den
har sine egne skabeloner i `layouts/noter/`, og Hugo slår dem op på `.Type`.
Et site får notesbogen ved at hedde `noter` eller sætte `type: noter` —
præcis som `layout: profil` og `layout: side`. Derfor må `home.html` gerne
spørge `eq $p.Section "noter"` om, hvad der er en note.

**Rækkefølgen i `skrivesektion` betyder noget.** Den første sektion er
ARKIVET: det er den, "Hele arkivet" og "År" peger på. Noterne er ikke et
arkiv, og en liste, der begynder med dem, sender de tre knapper det forkerte
sted hen.
### E-postadressen kodes med entiteter, ikke JavaScript (2026-09-21)

`_partials/epost.html` skriver adressen ud tegn for tegn som talentiteter, og
`_shortcodes/epost.html` er indgangen fra indhold. Valget er truffet:
privatlivspolitikken lover ét script og beskriver præcis, hvad det gør, og den
sætning er sitets mest efterprøvelige. En JavaScript-samlet adresse ville koste
den for ingenting — skrabere har kørt JavaScript i årevis. CSS-omvending er
også fravalgt: den ødelægger kopi og skærmlæser.

Lav den derfor ikke om til et script. Den eneste rigtige test er den byggede
HTML, ikke skabelonen:

    grep -rE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' public/

`_partials/del.html` beholder sin `mailto:?subject=` — den bærer ingen adresse.

### Andre valg, der ikke skal genåbnes

Se `README.md` for hvad sitet selv skal levere, og
`assets/css/07-arkiv.css` for hvorfor der ikke er en søgeflade.
Mørkt tema er bevidst ubygget; `theme.toml` lover det ikke.

## Sharp edges

- **Kommentarstil:** hver fil har ét kort hoved på to-tre linjer og ellers
  ingen kommentarer (commit `21c9002`). Skriv ikke inline-kommentarer tilbage
  ind; tal, der skal begrundes, hører til her eller i `README.md`.
- **Alt, der `plainify`r `.Content` eller `.Summary`, pakker entiteterne ud
  igen** og lægger adressen skrabeklar i kilden. Hver sådan udgang går derfor
  gennem `_partials/uden-epost.html` (meta, JSON-LD, feed, llms.txt,
  forsidens uddrag). Gør temaet forfatterens tekst til HTML uden for
  `.Content` — manchetten — er det `_partials/epost-i-html.html` i stedet.
  En ny udgang med `plainify` skal skrives ind ét af de to steder.
- **`assets/css/00-skrifter.css` er en skabelon**, ikke ren CSS. Den køres
  gennem `resources.ExecuteAsTemplate` i `_partials/stil.html` med
  `_partials/skrifter.html` som kontekst. `resources.Get` alene på den fil
  giver `{{ ... }}` ud i stylesheettet.
- **Rækkefølgen i `_partials/stil.html` er hele kaskaden.** Ingen `@layer`,
  ingen `!important`. En ny CSS-fil skal skrives ind på listen.
- **`_markup/render-heading.html` sætter en `#`-ankerlænke i hver overskrift.**
  Alt, der læser `.Content` som tekst (JSON-LD `articleBody`, feedets
  `content:encoded`), skal gå gennem `_partials/uden-anker.html` først.
- **En tidslinjes hændelser er page resources, ikke sider** (`_partials/tidslinje.html`).
  Kun det, der udtrykkeligt løber `.Resources.Match "*.md"` igennem, ser dem:
  i dag siden og læsetiden i `meta.html`. Feed, JSON-LD, llms.txt og
  `.Lastmod` kender kun `index.md`. En billedsti i en hændelse slås op i
  bundlet, ikke i hændelsen (`_markup/render-image.html`).
- **Byg altid mod et rigtigt site.** Temaet har ingen `exampleSite/`:
  `HUGO_MODULE_REPLACEMENTS="github.com/UlrichGB/bojko-dk-theme -> <sti>" hugo`
  fra `bojko-dk`.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
