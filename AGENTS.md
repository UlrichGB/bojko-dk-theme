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

### Andre valg, der ikke skal genåbnes

Se `README.md` for hvad sitet selv skal levere, og
`assets/css/07-arkiv.css` for hvorfor der ikke er en søgeflade.
Mørkt tema er bevidst ubygget; `theme.toml` lover det ikke.

## Sharp edges

- **Kommentarstil:** hver fil har ét kort hoved på to-tre linjer og ellers
  ingen kommentarer (commit `21c9002`). Skriv ikke inline-kommentarer tilbage
  ind; tal, der skal begrundes, hører til her eller i `README.md`.
- **`assets/css/00-skrifter.css` er en skabelon**, ikke ren CSS. Den køres
  gennem `resources.ExecuteAsTemplate` i `_partials/stil.html` med
  `_partials/skrifter.html` som kontekst. `resources.Get` alene på den fil
  giver `{{ ... }}` ud i stylesheettet.
- **Rækkefølgen i `_partials/stil.html` er hele kaskaden.** Ingen `@layer`,
  ingen `!important`. En ny CSS-fil skal skrives ind på listen.
- **`_markup/render-heading.html` sætter en `#`-ankerlænke i hver overskrift.**
  Alt, der læser `.Content` som tekst (JSON-LD `articleBody`, feedets
  `content:encoded`), skal gå gennem `_partials/uden-anker.html` først.
- **Byg altid mod et rigtigt site.** Temaet har ingen `exampleSite/`:
  `HUGO_MODULE_REPLACEMENTS="github.com/UlrichGB/bojko-dk-theme -> <sti>" hugo`
  fra `bojko-dk`.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
