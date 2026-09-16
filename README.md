# bojko-dk-theme

Hugo-temaet til [bojko.dk](https://bojko.dk).

Et tema til ét site. Det er ikke bygget til at passe til alle sites, og det er
derfor, det ikke har fyrre konfigurationsflag.

## Krav

- Hugo **extended**, minimum `0.146.0`. Den almindelige udgave kan ikke skalere
  billeder, og omslaget kræver det.

## Brug

Temaet hentes som et Hugo Module:

```toml
# config/_default/module.toml
[module]
  [[module.imports]]
    path = "github.com/UlrichGB/bojko-dk-theme"
```

Fire indstillinger er nødvendige, og de fejler lydløst, hvis de mangler:

```toml
# config/_default/markup.toml
[goldmark.renderer]
  unsafe = true
[highlight]
  noClasses           = false
  lineNos             = true
  lineNumbersInTable  = false
```

Der ligger ingen `exampleSite/` i repoet. Et tema er ikke et site, og indholdet
bor i sitets eget repo.

## Skrifterne

De tre familier i `static/fonts/` — Merriweather, Source Sans 3 og Comfortaa —
er SIL Open Font License 1.1 og **ikke** dækket af `LICENSE`. Licensteksterne
ligger ved siden af filerne og skal følge med, hvis skrifterne følger med.

## Licens

MIT — se [`LICENSE`](LICENSE). Skrifterne har deres egen licens, se ovenfor.
