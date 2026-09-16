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

To indstillinger mere, hvis du vil have `robots.txt` og `llms.txt`. Begge
skabeloner ligger i temaet; de to opslag er dem, Hugo kun læser fra sitet:

```toml
# hugo.toml
enableRobotsTXT = true

[outputs]
  home = ["html", "rss", "llms"]
```

Der ligger ingen `exampleSite/` i repoet. Et tema er ikke et site, og indholdet
bor i sitets eget repo.

## Hvad sitet selv skal levere

Temaet gætter ikke på disse. Mangler de, udelader det dem — det skriver ikke
et plausibelt gæt ud, som ville se ud som en beslutning.

| Hvad | Hvor | Uden den |
|---|---|---|
| `params.author` | konfiguration | ingen byline under rubrikken, ingen forfatter i JSON-LD og ingen `dc:creator` i feedet |
| `params.feedTitle` | konfiguration | feedet hedder det samme som sitet |
| `params.description` | konfiguration | sidste udvej for `<meta name="description">`. Temaet udleder selv en til mærkesider, arkiv og indlæg, så den er sjældent i brug |
| `params.licens` (`navn`, `url`) | konfiguration | kolofonen står uden licensled. Det er en gyldig kolofon |
| `params.ogBillede` | konfiguration + `static/` | sider uden omslagsbillede får intet `og:image`. Artikler bruger deres eget omslag |
| `favicon.svg`, `apple-touch-icon.png`, webmanifest | `static/` | ingen ikoner. Temaet kan ikke levere dem uden at gætte på et bomærke |

## Skrifterne

De tre familier i `static/fonts/` — Merriweather, Source Sans 3 og Comfortaa —
er SIL Open Font License 1.1 og **ikke** dækket af `LICENSE`. Licensteksterne
ligger ved siden af filerne og skal følge med, hvis skrifterne følger med.

## Licens

MIT — se [`LICENSE`](LICENSE). Skrifterne har deres egen licens, se ovenfor.
